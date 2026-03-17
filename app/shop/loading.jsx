export default function ShopLoading() {
  return (
    <>
      {/* Header skeleton */}
      <div className="py-5 border-bottom" style={{ backgroundColor: 'var(--card-bg, #f8f6f3)' }}>
        <div className="container text-center py-4">
          <div className="skeleton-bar mx-auto mb-3" style={{ width: '220px', height: '32px' }} />
          <div className="skeleton-bar mx-auto" style={{ width: '320px', height: '16px' }} />
        </div>
      </div>

      <div className="container py-5 my-3">
        <div className="row g-5">
          {/* Sidebar skeleton */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="skeleton-bar" style={{ width: '100%', height: '320px' }} />
          </div>

          {/* Product grid skeleton */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <div className="skeleton-bar" style={{ width: '140px', height: '14px' }} />
              <div className="skeleton-bar" style={{ width: '120px', height: '14px' }} />
            </div>
            <div className="row g-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div className="col-md-4 col-sm-6" key={i}>
                  <div className="card border-0">
                    <div className="skeleton-shimmer" style={{ height: '320px', animationDelay: `${i * 0.1}s` }} />
                    <div className="p-3">
                      <div className="skeleton-bar mb-2" style={{ width: '70%', height: '14px' }} />
                      <div className="skeleton-bar" style={{ width: '35%', height: '14px' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
