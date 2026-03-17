'use client';
import ImageZoom from './ImageZoom';

export default function CustomizerPreview({ config }) {
  // Dynamically map the style and color to the generated filenames
  const imageName = `${config.style}_${config.color}.png`;
  let currentImage = `/images/${imageName}`;

  // Fallbacks for the two Navy images that failed to generate due to limits
  if (imageName === 'kuwaiti_navy.png' || imageName === 'omani_navy.png') {
    currentImage = `/images/${config.style}_black.png`;
  }

  return (
    <div className="position-relative w-100 bg-light customizer-preview-wrapper" style={{ height: '70vh', minHeight: '500px' }}>
      <div className="position-absolute inset-0 w-100 h-100" style={{ inset: 0 }}>
        <ImageZoom
          src={currentImage}
          alt={`Custom ${config.style} in ${config.color}`}
          contain
        />
      </div>

      {/* Layered Overlays (Proof of Concept) */}
      {config.color === 'white' ? (
        <>
          {config.buttons === 'zipper' && (
            <img src="/images/overlay_zipper.png" className={`customizer-overlay overlay-chest`} alt="Zipper detail" />
          )}
          {config.buttons === 'exposed' && (
            <img src="/images/overlay_buttons.png" className={`customizer-overlay overlay-chest`} alt="Button detail" />
          )}
          {config.cuffs === 'french cuffs' && (
            <img src="/images/overlay_cuff_french.png" className={`customizer-overlay overlay-wrist`} alt="French Cuff detail" />
          )}
          {config.cuffs === 'shirt cuffs' && (
            <img src="/images/overlay_cuff_buttoned.png" className={`customizer-overlay overlay-wrist`} alt="Buttoned Cuff detail" />
          )}
        </>
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ zIndex: 10, width: '80%', opacity: 0.6 }}>
          <span className="badge bg-dark bg-opacity-75 p-2 rounded-pill fw-normal" style={{ fontSize: '0.7rem' }}>
            Multi-layer demographic details (cuffs/buttons) disabled for dark colors in this demo.
          </span>
        </div>
      )}

      {/* Visual Indicator of active config */}
      <div className="position-absolute bottom-0 start-0 p-3 m-3 bg-white shadow-sm rounded">
        <p className="mb-0 fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
          Base Selection:
        </p>
        <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
          Style: <span className="text-dark text-capitalize">{config.style}</span><br />
          Color: <span className="text-dark text-capitalize">{config.color}</span>
        </p>
      </div>

      {/* Premium Detail Panel Overlays */}
      <div className="position-absolute top-0 end-0 p-4 d-flex flex-column gap-3 customizer-detail-panels" style={{ maxWidth: '250px', zIndex: 5 }}>
        
        {/* Fabric Detail Card */}
        <div className="bg-white p-3 shadow-sm rounded border border-light" style={{ transition: 'all 0.3s ease', opacity: 0.95 }}>
          <div className="text-uppercase text-muted fw-bold mb-1 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="var(--accent-gold)" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>
            Selected Fabric
          </div>
          <p className="mb-0 fw-bold text-dark text-capitalize" style={{ fontSize: '0.85rem' }}>{config.fabric.replace('-', ' ')}</p>
        </div>

        {/* Cuff Detail Card */}
        <div className="bg-white p-3 shadow-sm rounded border border-light" style={{ transition: 'all 0.3s ease', opacity: 0.95, transform: config.cuffs !== 'plain' ? 'translateX(0)' : 'translateX(0px)' }}>
          <div className="text-uppercase text-muted fw-bold mb-1 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="var(--accent-gold)" viewBox="0 0 16 16"><path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/><path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V12h4a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 4v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7H5z"/></svg>
            Cuff Style
          </div>
          <p className="mb-0 fw-bold text-dark text-capitalize" style={{ fontSize: '0.85rem' }}>{config.cuffs}</p>
        </div>

        {/* Button Detail Card */}
        <div className="bg-white p-3 shadow-sm rounded border border-light" style={{ transition: 'all 0.3s ease', opacity: 0.95, transform: config.buttons !== 'hidden' ? 'translateX(0)' : 'translateX(0px)' }}>
          <div className="text-uppercase text-muted fw-bold mb-1 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="var(--accent-gold)" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/><path d="M8 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
            Front Closure
          </div>
          <p className="mb-0 fw-bold text-dark text-capitalize" style={{ fontSize: '0.85rem' }}>{config.buttons}</p>
        </div>

      </div>

    </div>
  );
}
