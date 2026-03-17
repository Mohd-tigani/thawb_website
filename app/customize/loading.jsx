export default function CustomizeLoading() {
  return (
    <div className="container-fluid py-4">
      <div className="mb-4 px-3">
        <div className="skeleton-bar mb-2" style={{ width: '200px', height: '30px' }} />
        <div className="skeleton-bar" style={{ width: '280px', height: '14px' }} />
      </div>
      <div className="row g-0">
        {/* Preview skeleton */}
        <div className="col-lg-8">
          <div className="skeleton-shimmer" style={{ height: '60vh', minHeight: '350px' }} />
        </div>
        {/* Controls skeleton */}
        <div className="col-lg-4 p-4">
          {[1, 2, 3, 4].map(i => (
            <div className="mb-4" key={i}>
              <div className="skeleton-bar mb-3" style={{ width: '120px', height: '16px' }} />
              <div className="d-flex gap-2">
                {[1, 2, 3].map(j => (
                  <div className="skeleton-bar" key={j} style={{ width: '80px', height: '36px' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
