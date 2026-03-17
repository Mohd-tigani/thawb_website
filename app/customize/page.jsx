'use client';

import { useState } from 'react';
import CustomizerPreview from '../../components/CustomizerPreview';
import CustomizerControls from '../../components/CustomizerControls';
import CustomizerSummary from '../../components/CustomizerSummary';

export default function CustomizeStudio() {
  
  // The central state powering the entire interactive studio
  const [dressConfig, setDressConfig] = useState({
    style: 'emirati',
    fabric: 'standard-cotton',
    color: 'white',
    buttons: 'hidden',
    cuffs: 'plain',
    bodyLength: '',
    chestWidth: '',
    sleeveLength: '',
    unit: 'cm'
  });

  return (
    <div className="container-fluid p-0 bg-white" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="row g-0 h-100">
        
        {/* Left Side: Visual Preview */}
        <div className="col-lg-8" style={{ minHeight: '60vh' }}>
          <div className="h-100 d-flex flex-column">
            <div className="p-4 border-bottom">
              <h1 className="mb-0" style={{ fontFamily: 'var(--font-heading)' }}>Design Your Own</h1>
              <p className="text-muted mb-0">Craft your signature look, tailored to perfection.</p>
            </div>
            <div className="flex-grow-1 bg-light">
               <CustomizerPreview config={dressConfig} />
            </div>
          </div>
        </div>

        {/* Right Side: Controls and Summary */}
        <div className="col-lg-4 shadow-sm" style={{ zIndex: 10 }}>
          <div className="d-flex flex-column h-100 customizer-controls-wrapper" style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            <div className="flex-grow-1">
              <CustomizerControls config={dressConfig} setConfig={setDressConfig} />
            </div>
            <div className="sticky-bottom">
              <CustomizerSummary config={dressConfig} />
            </div>
          </div>
        </div>

      </div>

      {/* Size Guide Modal — placed outside the main flex container for proper backdrop layering */}
      <div className="modal fade" id="customizerSizeGuideModal" tabIndex="-1" aria-labelledby="customizerSizeGuideModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title text-uppercase fw-bold" id="customizerSizeGuideModalLabel" style={{ letterSpacing: '1px', fontSize: '1rem' }}>Size Guide</h5>
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
