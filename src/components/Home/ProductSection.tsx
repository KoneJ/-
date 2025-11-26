'use client';

import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  const router = useRouter();

  const handleProductClick = (productId: number) => {
    router.push('/login');
  };

  const handleViewAll = () => {
    router.push('/login');
  };

  return (
    <section className="bg-white py-6">
      <div className="px-4">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={handleViewAll} className="text-sm text-gray-400 flex items-center gap-1">
            전체보기
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white text-left w-full active:opacity-70 transition-opacity"
            >
              {/* 상품 이미지 */}
              <div className="aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  {/* 실제 이미지로 대체 예정 */}
                  <div className="text-gray-300 text-xs text-center px-2">
                    상품 이미지
                  </div>
                </div>
              </div>

              {/* 상품 정보 */}
              <div className="px-1">
                <p className="text-sm text-gray-800 mb-2 line-clamp-2 h-10 leading-5">
                  {product.name}
                </p>
                
                {/* 가격 */}
                <div className="mb-1">
                  <span className="text-xl font-bold text-black">
                    {product.price > 0 ? `${product.price.toLocaleString()}원` : '00,000원'}
                  </span>
                </div>
                
                {/* 원가 & 할인율 */}
                {product.originalPrice > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                    {product.discount > 0 && (
                      <span className="text-red-500 font-semibold">
                        {product.discount}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

