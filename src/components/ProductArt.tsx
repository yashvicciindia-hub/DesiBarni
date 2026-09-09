import type { CSSProperties } from 'react';
import type { Product } from '@/data/products';

export function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div
      className={`product-art ${large ? 'product-art-large' : ''}`}
      style={{ '--product': product.color, '--accent': product.accent } as CSSProperties}
    >
      <span className="art-stamp">
        DESI
        <br />
        BARNI
      </span>
      <div className="art-lid" />
      <div className="art-jar">
        <div className="art-label">
          <small>REGIONAL TASTE</small>
          <strong>{product.shortName}</strong>
          <span>desi barni</span>
        </div>
        <i className="art-ingredient one" />
        <i className="art-ingredient two" />
        <i className="art-ingredient three" />
      </div>
      <span className="art-weight">{product.weight}</span>
    </div>
  );
}
