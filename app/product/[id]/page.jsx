import ImageZoom from '../../../components/ImageZoom';
import AddToCartButton from '../../../components/AddToCartButton';
import Link from 'next/link';

const allProducts = {
  '1': { id: '1', name: 'Royal White Kandora', price: 250, description: 'Our signature Emirati style Kandora, crafted from pure, breathable cotton. Featuring a pristine white finish and subtle, elegant stitching along the neckline. Designed for all-day comfort without sacrificing formal appearance.', image: '/images/emirati_white.png' },
  '2': { id: '2', name: 'Desert Beige Thawb', price: 285, description: 'A classic Saudi Thawb in warm desert beige, tailored from a premium cotton blend. Features clean lines, a mandarin collar, and single-button closure for an effortlessly refined look.', image: '/images/saudi_beige.png' },
  '3': { id: '3', name: 'Midnight Black Dishdasha', price: 290, description: 'A striking Kuwaiti Dishdasha in deep midnight black. Cut from breathable fabric with french cuffs and a modern slim silhouette, perfect for evening occasions.', image: '/images/kuwaiti_black.png' },
  '4': { id: '4', name: 'Signature Omani Style', price: 310, description: 'Our distinctive Omani style garment in elegant beige. Features the traditional round neckline and relaxed fit, crafted from soft premium fabric for all-day comfort.', image: '/images/omani_beige.png' },
  '5': { id: '5', name: 'Classic Kuwaiti Detail', price: 275, description: 'A pristine white Kuwaiti Dishdasha with refined shirt cuffs and a clean zipper closure. Lightweight and breathable, ideal for daily wear with a sharp, modern finish.', image: '/images/kuwaiti_white.png' },
  '6': { id: '6', name: 'Formal Emirati Kandora', price: 350, description: 'An elevated Emirati Kandora in sophisticated beige. Crafted from premium fabric with meticulous attention to stitching and drape, designed for formal occasions and special events.', image: '/images/emirati_beige.png' },
};

const defaultProduct = { id: '1', name: 'Royal White Kandora', price: 250, description: 'Our signature Emirati style Kandora, crafted from pure, breathable cotton. Featuring a pristine white finish and subtle, elegant stitching along the neckline. Designed for all-day comfort without sacrificing formal appearance.', image: '/images/emirati_white.png' };

export default async function ProductDetails( { params } ) {
  const { id } = await params;
  const product = allProducts[id] || { ...defaultProduct, id };

  return (
    <div className="container py-5 mt-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/" className="text-muted text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link href="/shop" className="text-muted text-decoration-none">Shop</Link></li>
          <li className="breadcrumb-item active text-dark" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-5 mb-5">
        <div className="col-lg-7">
          <div className="position-relative w-100 bg-light" style={{ paddingBottom: '130%' }}>
            <ImageZoom src={product.image} alt={product.name} />
          </div>
        </div>
        
        <div className="col-lg-5">
          <div className="position-sticky product-info-sticky" style={{ top: '100px' }}>
            <h1 className="display-5 mb-2">{product.name}</h1>
            <p className="fs-4 text-muted mb-4">{product.price} AED</p>
            <p className="mb-4 text-secondary lh-lg">{product.description}</p>
            
            <form className="mb-5">
              <div className="row g-3 mb-4">
                <div className="col-6 col-sm-4">
                  <label className="form-label text-uppercase fw-bold" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>Body Length</label>
                  <select className="form-select border-dark rounded-0 py-2 shadow-none cursor-pointer" defaultValue="">
                    <option value="">Select</option>
                    <option value="137">137 cm</option>
                    <option value="142">142 cm</option>
                    <option value="147">147 cm</option>
                    <option value="152">152 cm</option>
                    <option value="157">157 cm</option>
                  </select>
                </div>
                <div className="col-6 col-sm-4">
                  <label className="form-label text-uppercase fw-bold" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>Chest Width</label>
                  <select className="form-select border-dark rounded-0 py-2 shadow-none cursor-pointer" defaultValue="">
                    <option value="">Select</option>
                    <option value="56">56 cm</option>
                    <option value="61">61 cm</option>
                    <option value="66">66 cm</option>
                    <option value="71">71 cm</option>
                  </select>
                </div>
                <div className="col-6 col-sm-4">
                  <label className="form-label text-uppercase fw-bold" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>Sleeve Length</label>
                  <select className="form-select border-dark rounded-0 py-2 shadow-none cursor-pointer" defaultValue="">
                    <option value="">Select</option>
                    <option value="58">58 cm</option>
                    <option value="61">61 cm</option>
                    <option value="64">64 cm</option>
                    <option value="67">67 cm</option>
                  </select>
                </div>
              </div>
              <p className="mb-3"><a href="#" className="text-muted" style={{ fontSize: '0.8rem', textDecoration: 'underline' }} data-bs-toggle="modal" data-bs-target="#sizeGuideModal">Need help? View our Size Guide</a></p>
              <AddToCartButton product={product} />
            </form>

          </div>
        </div>
      </div>

      {/* Size Guide Modal — must be outside position-sticky to layer above the backdrop */}
      <div className="modal fade" id="sizeGuideModal" tabIndex="-1" aria-labelledby="sizeGuideModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title text-uppercase fw-bold" id="sizeGuideModalLabel" style={{ letterSpacing: '1px', fontSize: '1rem' }}>Size Guide</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>All measurements are in centimeters (cm). For the best fit, measure over a well-fitting garment you already own.</p>
              <table className="table table-sm text-center" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr className="text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                    <th className="text-start">Size</th>
                    <th>Body Length</th>
                    <th>Chest Width</th>
                    <th>Sleeve</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr><td className="text-start fw-bold text-dark">S</td><td>137</td><td>56</td><td>58</td></tr>
                  <tr><td className="text-start fw-bold text-dark">M</td><td>142</td><td>61</td><td>61</td></tr>
                  <tr><td className="text-start fw-bold text-dark">L</td><td>147</td><td>66</td><td>64</td></tr>
                  <tr><td className="text-start fw-bold text-dark">XL</td><td>152</td><td>71</td><td>67</td></tr>
                </tbody>
              </table>
              <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.8rem' }}><strong>Body Length:</strong> From the base of the neck to the hem.<br /><strong>Chest Width:</strong> Across the chest, underarm to underarm.<br /><strong>Sleeve:</strong> From the shoulder seam to the wrist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
