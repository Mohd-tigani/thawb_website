export default function Loading() {
  return (
    <div className="container py-5 my-5">
      {/* Hero skeleton */}
      <div className="skeleton-shimmer mb-5 rounded" style={{ height: '40vh' }} />

      {/* Section heading skeleton */}
      <div className="text-center mb-5">
        <div className="skeleton-bar mx-auto mb-2" style={{ width: '100px', height: '12px' }} />
        <div className="skeleton-bar mx-auto" style={{ width: '200px', height: '28px' }} />
      </div>

      {/* Product cards skeleton */}
      <div className="row g-4">
        {[1, 2, 3, 4].map(i => (
          <div className="col-md-3 col-sm-6" key={i}>
            <div className="card border-0">
              <div className="skeleton-shimmer" style={{ height: '280px', animationDelay: `${i * 0.15}s` }} />
              <div className="p-3">
                <div className="skeleton-bar mb-2" style={{ width: '75%', height: '14px' }} />
                <div className="skeleton-bar" style={{ width: '40%', height: '14px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
