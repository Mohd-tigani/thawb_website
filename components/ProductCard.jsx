import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ title, price, imageSrc, imageAlt, linkUrl }) {
  return (
    <div className="card product-card">
      <div className="product-img-wrapper">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          width={400}
          height={500}
          sizes="(max-width: 575.98px) 50vw, (max-width: 767.98px) 50vw, (max-width: 991.98px) 33vw, 25vw"
          className="product-img"
          loading="lazy"
          style={{ objectFit: 'cover' }}
        />
        <div className="add-to-cart-overlay">
          <Link href={linkUrl} className="btn btn-outline-premium w-100">
            View Product
          </Link>
        </div>
      </div>
      <Link href={linkUrl} className="product-title">
        {title}
      </Link>
      <p className="product-price">{price}</p>
    </div>
  );
}
