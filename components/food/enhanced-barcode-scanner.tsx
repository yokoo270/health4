'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, X, Flashlight, RotateCcw, Keyboard, Search, Loader2, CheckCircle } from 'lucide-react';
import { foodAPI, FoodProduct } from '@/lib/food-api';

interface EnhancedBarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound: (product: FoodProduct) => void;
}

export default function EnhancedBarcodeScanner({ isOpen, onClose, onProductFound }: EnhancedBarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [detectedCode, setDetectedCode] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scannerRef = useRef<any>(null);

  // Initialize ZXing scanner
  const initializeScanner = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { BrowserMultiFormatReader } = await import('@zxing/library');
      scannerRef.current = new BrowserMultiFormatReader();
      return true;
    } catch (error) {
      console.error('Error initializing ZXing scanner:', error);
      return false;
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Initialize scanner if not already done
      if (!scannerRef.current) {
        const initialized = await initializeScanner();
        if (!initialized) {
          throw new Error('No se pudo inicializar el scanner de códigos de barras');
        }
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Check if flash is available
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        setHasFlash(capabilities.torch === true);

        // Start ZXing scanning
        startZXingScanning();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('No se pudo acceder a la cámara. Asegúrate de dar permisos de cámara.');
      setIsScanning(false);
    }
  };

  const startZXingScanning = async () => {
    if (!scannerRef.current || !videoRef.current) return;

    try {
      const result = await scannerRef.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result: any, error: any) => {
          if (result) {
            const code = result.getText();
            setDetectedCode(code);
            processBarcode(code);
          }
          // Continue scanning for more codes
        }
      );
    } catch (error) {
      console.error('Error starting ZXing scanning:', error);
      // Fall back to manual detection
      startManualDetection();
    }
  };

  const startManualDetection = () => {
    const interval = setInterval(() => {
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === 4) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');

        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Try to detect with jsQR as fallback
          detectWithJsQR(context, canvas.width, canvas.height);
        }
      }
    }, 500);

    // Store interval for cleanup
    const cleanup = () => clearInterval(interval);
    return cleanup;
  };

  const detectWithJsQR = async (context: CanvasRenderingContext2D, width: number, height: number) => {
    try {
      const jsQR = await import('jsqr');
      const imageData = context.getImageData(0, 0, width, height);
      const code = jsQR.default(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        setDetectedCode(code.data);
        processBarcode(code.data);
      }
    } catch (error) {
      // jsQR not available or failed, continue scanning
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (scannerRef.current) {
      try {
        scannerRef.current.reset();
      } catch (error) {
        console.error('Error resetting scanner:', error);
      }
    }
    
    setIsScanning(false);
    setFlashOn(false);
    setDetectedCode(null);
  };

  const toggleFlash = async () => {
    if (!streamRef.current) return;

    try {
      const track = streamRef.current.getVideoTracks()[0];
      await track.applyConstraints({
        advanced: [{ torch: !flashOn }]
      });
      setFlashOn(!flashOn);
    } catch (err) {
      console.error('Error toggling flash:', err);
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setTimeout(() => {
      if (isOpen) startCamera();
    }, 100);
  };

  const processBarcode = async (barcode: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const product = await foodAPI.searchByBarcode(barcode);
      
      if (product) {
        onProductFound(product);
        stopCamera();
        onClose();
      } else {
        setError(`Producto no encontrado para el código: ${barcode}`);
        // Reset detected code to continue scanning
        setTimeout(() => {
          setDetectedCode(null);
          setError(null);
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar el producto');
      setTimeout(() => {
        setDetectedCode(null);
        setError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      await processBarcode(manualBarcode.trim());
    }
  };

  useEffect(() => {
    if (isOpen && !manualEntry) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isOpen, manualEntry, facingMode]);

  const handleClose = () => {
    stopCamera();
    setManualEntry(false);
    setManualBarcode('');
    setError(null);
    setDetectedCode(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Escáner de Código de Barras
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!manualEntry ? (
            <>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {isScanning ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    
                    {/* Scanning overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`border-2 w-64 h-32 relative transition-colors ${
                        detectedCode ? 'border-green-500' : 'border-white'
                      }`}>
                        <div className={`absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 ${
                          detectedCode ? 'border-green-500' : 'border-green-400'
                        }`}></div>
                        <div className={`absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 ${
                          detectedCode ? 'border-green-500' : 'border-green-400'
                        }`}></div>
                        <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 ${
                          detectedCode ? 'border-green-500' : 'border-green-400'
                        }`}></div>
                        <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 ${
                          detectedCode ? 'border-green-500' : 'border-green-400'
                        }`}></div>
                        
                        {/* Scanning line */}
                        {!detectedCode && (
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="w-full h-0.5 bg-green-500 animate-bounce opacity-75"></div>
                          </div>
                        )}

                        {/* Success indicator */}
                        {detectedCode && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-green-500 rounded-full p-2">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Camera controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                      {hasFlash && (
                        <Button
                          size="sm"
                          variant={flashOn ? "default" : "outline"}
                          onClick={toggleFlash}
                          className="bg-black/50 text-white border-white/30"
                        >
                          <Flashlight className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={switchCamera}
                        className="bg-black/50 text-white border-white/30"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Loading/Status overlay */}
                    {(isLoading || detectedCode) && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-4 flex items-center gap-2">
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Buscando producto...</span>
                            </>
                          ) : detectedCode ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Código detectado: {detectedCode}</span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Iniciando cámara...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Apunta la cámara hacia el código de barras del producto
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Funciona mejor con buena iluminación
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ZXing Scanner Integrado
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setManualEntry(true)}
                className="w-full"
              >
                <Keyboard className="w-4 h-4 mr-2" />
                Introducir código manualmente
              </Button>
            </>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <Label htmlFor="barcode">Código de barras</Label>
                <Input
                  id="barcode"
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  placeholder="Ej: 8410000000000"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={!manualBarcode.trim() || isLoading} className="flex-1">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Buscar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setManualEntry(false)}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleClose}>
              <X className="w-4 h-4 mr-2" />
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
