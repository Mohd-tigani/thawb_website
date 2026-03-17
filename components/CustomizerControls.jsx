'use client';

export default function CustomizerControls({ config, setConfig }) {
  const handleUpdate = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 customizer-controls-inner" style={{ backgroundColor: '#fff', height: '100%', borderLeft: '1px solid #eee' }}>
      <h2 className="mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Design Studio</h2>
      
      {/* Style Selection */}
      <div className="mb-5">
        <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>1. Select Style</h5>
        <div className="d-flex flex-wrap gap-2">
          {['emirati', 'saudi', 'kuwaiti', 'omani'].map(style => (
            <button
              key={style}
              className={`btn btn-sm ${config.style === style ? 'btn-premium' : 'btn-outline-secondary rounded-0'}`}
              onClick={() => handleUpdate('style', style)}
              style={{ textTransform: 'capitalize' }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Fabric Selection */}
      <div className="mb-5">
        <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>2. Choose Fabric</h5>
        <div className="list-group list-group-flush border-top border-bottom">
          {[
            { id: 'standard-cotton', name: 'Standard Cotton Blend', price: '+0 AED' },
            { id: 'premium-cotton', name: 'Premium Egyptian Cotton', price: '+150 AED' },
            { id: 'japanese-crepe', name: 'Japanese Crepe', price: '+200 AED' },
            { id: 'winter-wool', name: 'Winter Wool Blend', price: '+250 AED' },
          ].map(fabric => (
            <button
              key={fabric.id}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 border-0 rounded-0 ${config.fabric === fabric.id ? 'bg-light fw-bold' : ''}`}
              onClick={() => handleUpdate('fabric', fabric.id)}
            >
              {fabric.name}
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>{fabric.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-5">
        <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>3. Select Color</h5>
        <div className="d-flex flex-wrap gap-3">
          {[
            { id: 'white', hex: '#ffffff' },
            { id: 'beige', hex: '#F5F5DC' },
            { id: 'black', hex: '#111111' },
            { id: 'navy', hex: '#000080' },
          ].map(color => (
            <button
              key={color.id}
              title={color.id}
              className={`btn rounded-circle shadow-sm p-0 position-relative`}
              onClick={() => handleUpdate('color', color.id)}
              style={{
                width: '40px', 
                height: '40px', 
                backgroundColor: color.hex,
                border: config.color === color.id ? '3px solid var(--accent-gold)' : '1px solid #ddd'
              }}
            >
              {config.color === color.id && (
                <span className="position-absolute top-50 start-50 translate-middle text-gold fw-bold">✓</span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-muted text-capitalize" style={{ fontSize: '0.85rem' }}>Selected: {config.color}</p>
      </div>

      {/* Cuff Selection */}
      <div className="mb-5">
        <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>4. Cuff Style</h5>
        <div className="d-flex flex-wrap gap-2">
          {['plain', 'shirt cuffs', 'french cuffs'].map(cuff => (
            <button
              key={cuff}
              className={`btn btn-sm ${config.cuffs === cuff ? 'btn-premium' : 'btn-outline-secondary rounded-0'}`}
              onClick={() => handleUpdate('cuffs', cuff)}
              style={{ textTransform: 'capitalize' }}
            >
              {cuff}
            </button>
          ))}
        </div>
      </div>

      {/* Button Selection */}
      <div className="mb-5">
        <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>5. Button Style</h5>
        <div className="d-flex flex-wrap gap-2">
          {['hidden', 'exposed', 'zipper'].map(btn => (
            <button
              key={btn}
              className={`btn btn-sm ${config.buttons === btn ? 'btn-premium' : 'btn-outline-secondary rounded-0'}`}
              onClick={() => handleUpdate('buttons', btn)}
              style={{ textTransform: 'capitalize' }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      
      {/* Measurements */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>6. Measurements</h5>
          <div className="btn-group btn-group-sm" role="group" aria-label="Unit toggle">
            <button
              type="button"
              className={`btn rounded-0 ${config.unit === 'cm' ? 'btn-premium' : 'btn-outline-secondary'}`}
              style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', letterSpacing: '0.5px' }}
              onClick={() => {
                if (config.unit === 'cm') return;
                setConfig(prev => ({
                  ...prev,
                  unit: 'cm',
                  bodyLength: prev.bodyLength ? Math.round(prev.bodyLength * 2.54) : '',
                  chestWidth: prev.chestWidth ? Math.round(prev.chestWidth * 2.54) : '',
                  sleeveLength: prev.sleeveLength ? Math.round(prev.sleeveLength * 2.54) : '',
                }));
              }}
            >
              CM
            </button>
            <button
              type="button"
              className={`btn rounded-0 ${config.unit === 'in' ? 'btn-premium' : 'btn-outline-secondary'}`}
              style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', letterSpacing: '0.5px' }}
              onClick={() => {
                if (config.unit === 'in') return;
                setConfig(prev => ({
                  ...prev,
                  unit: 'in',
                  bodyLength: prev.bodyLength ? Math.round(prev.bodyLength / 2.54 * 10) / 10 : '',
                  chestWidth: prev.chestWidth ? Math.round(prev.chestWidth / 2.54 * 10) / 10 : '',
                  sleeveLength: prev.sleeveLength ? Math.round(prev.sleeveLength / 2.54 * 10) / 10 : '',
                }));
              }}
            >
              IN
            </button>
          </div>
        </div>
        <div className="row g-2 mb-3">
          {[
            { key: 'bodyLength', label: 'Body Length', cmRange: [130, 170], inRange: [51, 67] },
            { key: 'chestWidth', label: 'Chest Width', cmRange: [50, 80], inRange: [20, 31] },
            { key: 'sleeveLength', label: 'Sleeve Length', cmRange: [55, 75], inRange: [22, 30] },
          ].map(field => {
            const [min, max] = config.unit === 'cm' ? field.cmRange : field.inRange;
            const step = config.unit === 'cm' ? 1 : 0.1;
            return (
              <div className="col-6 col-sm-4" key={field.key}>
                <label className="form-label text-muted" style={{ fontSize: '0.75rem' }}>{field.label}</label>
                <div className="input-group input-group-sm">
                  <input
                    type="number"
                    className="form-control border-dark rounded-0 shadow-none"
                    placeholder={`${min}–${max}`}
                    min={min}
                    max={max}
                    step={step}
                    value={config[field.key]}
                    onChange={(e) => handleUpdate(field.key, e.target.value ? Number(e.target.value) : '')}
                  />
                  <span className="input-group-text border-dark rounded-0 bg-white text-muted" style={{ fontSize: '0.75rem' }}>
                    {config.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mb-0"><a href="#" className="text-muted" style={{ fontSize: '0.8rem', textDecoration: 'underline' }} data-bs-toggle="modal" data-bs-target="#customizerSizeGuideModal">Need help? View our Size Guide</a></p>
      </div>

    </div>
  );
}
