'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, X, Flashlight, RotateCcw, Keyboard, Search, Loader2 } from 'lucide-react';
import { foodAPI, FoodProduct } from '@/lib/food-api';

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound: (product: FoodProduct) => void;
}

export default function BarcodeScanner({ isOpen, onClose, onProductFound }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);

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
        videoRef.current.play();

        // Check if flash is available
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        setHasFlash(capabilities.torch === true);
      }

      // Start scanning for barcodes
      startBarcodeDetection();
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('No se pudo acceder a la cámara. Asegúrate de dar permisos de cámara.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsScanning(false);
    setFlashOn(false);
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

  const startBarcodeDetection = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === 4) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');

        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Here we would use a barcode detection library like ZXing
          // For now, we'll simulate detection by looking for manual input
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          detectBarcode(imageData);
        }
      }
    }, 500); // Check every 500ms
  };

  const detectBarcode = async (imageData: ImageData) => {
    // This is a placeholder for actual barcode detection
    // In a real implementation, you would use a library like @zxing/library
    // or integrate with a service that can detect barcodes from image data
    
    // For demonstration, we'll just continue scanning
    // Real implementation would call processBarcode(detectedCode) when a barcode is found
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
        setError('Producto no encontrado en la base de datos.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar el producto');
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Escanear Código de Barras
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
                      <div className="border-2 border-white w-64 h-32 relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-500"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-500"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-500"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-500"></div>
                        
                        {/* Scanning line */}
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div className="w-full h-0.5 bg-green-500 animate-bounce opacity-75"></div>
                        </div>
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

                    {isLoading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-4 flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Buscando producto...</span>
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
                <Badge variant="outline" className="text-xs">
                  Funciona mejor con buena iluminación
                </Badge>
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
