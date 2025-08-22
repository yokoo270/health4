'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Scan, 
  Loader2, 
  Package, 
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FoodProduct, foodAPI } from '@/lib/food-api';
import EnhancedBarcodeScanner from './enhanced-barcode-scanner';

interface FoodSearchProps {
  onProductSelect: (product: FoodProduct) => void;
  placeholder?: string;
  showScanner?: boolean;
}

export default function FoodSearch({ 
  onProductSelect, 
  placeholder = "Buscar alimentos...",
  showScanner = true
}: FoodSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);

  const searchProducts = useCallback(async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalCount(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await foodAPI.searchByText(searchQuery, page);
      setResults(searchResults.products);
      setTotalCount(searchResults.count);
      setCurrentPage(searchResults.page);
      setPageSize(searchResults.pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar productos');
      setResults([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchProducts(query, 1);
        setCurrentPage(1);
      } else {
        setResults([]);
        setTotalCount(0);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchProducts]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalCount / pageSize)) {
      searchProducts(query, newPage);
    }
  };

  const handleProductClick = (product: FoodProduct) => {
    onProductSelect(product);
  };

  const handleBarcodeFound = (product: FoodProduct) => {
    onProductSelect(product);
    setShowScannerModal(false);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10"
          />
        </div>

        {showScanner && (
          <Button
            variant="outline"
            onClick={() => setShowScannerModal(true)}
            className="px-3"
          >
            <Scan className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Skeleton className="w-16 h-16 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-3">
          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {totalCount.toLocaleString()} productos encontrados
            </span>
            {totalPages > 1 && (
              <span>
                Página {currentPage} de {totalPages}
              </span>
            )}
          </div>

          {/* Product List */}
          <div className="space-y-3">
            {results.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {product.image_front_url ? (
                        <img
                          src={product.image_front_url}
                          alt={product.product_name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {product.product_name}
                      </h3>
                      {product.brands && (
                        <p className="text-sm text-gray-600 truncate">
                          {product.brands}
                        </p>
                      )}

                      {/* Badges */}
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {product.nutrition_grade && (
                          <Badge 
                            className="text-xs font-bold text-white"
                            style={{ backgroundColor: foodAPI.getNutritionGradeColor(product.nutrition_grade) }}
                          >
                            Nutri-Score {product.nutrition_grade.toUpperCase()}
                          </Badge>
                        )}

                        {product.nova_group && (
                          <Badge variant="outline" className="text-xs">
                            NOVA {product.nova_group}
                          </Badge>
                        )}

                        {product.nutriments.energy_kcal !== undefined && (
                          <Badge variant="secondary" className="text-xs">
                            {product.nutriments.energy_kcal} kcal
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              <span className="text-sm text-gray-600 px-3">
                {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {!isLoading && query.trim() && results.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No se encontraron productos para "{query}"</p>
          <p className="text-sm">Intenta con otros términos de búsqueda</p>
        </div>
      )}

      {/* Empty State */}
      {!query.trim() && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Busca productos por nombre o marca</p>
          <p className="text-sm">O escanea un código de barras</p>
        </div>
      )}

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <EnhancedBarcodeScanner
          isOpen={showScannerModal}
          onClose={() => setShowScannerModal(false)}
          onProductFound={handleBarcodeFound}
        />
      )}
    </div>
  );
}