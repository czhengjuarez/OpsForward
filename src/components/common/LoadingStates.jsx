export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-[var(--of-border-line)] border-t-[var(--of-bg-brand)] rounded-full animate-spin`} />
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-[var(--of-bg-elevated)] rounded-xl overflow-hidden shadow-sm border border-[var(--of-border-line)] animate-pulse">
      <div className="aspect-video bg-[var(--of-bg-sunken)]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[var(--of-bg-sunken)] rounded w-3/4" />
        <div className="h-3 bg-[var(--of-bg-sunken)] rounded w-1/2" />
        <div className="h-3 bg-[var(--of-bg-sunken)] rounded w-full" />
        <div className="h-3 bg-[var(--of-bg-sunken)] rounded w-5/6" />
      </div>
    </div>
  )
}

export function LoadingGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

export function ErrorMessage({ error, retry }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--of-danger-100)] mb-4">
        <svg className="w-8 h-8 text-[var(--of-danger-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-[var(--of-fg-default)] mb-2">
        Something went wrong
      </h3>
      <p className="text-[var(--of-fg-muted)] mb-4">
        {error?.message || 'Failed to load data'}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--of-bg-brand)] text-white rounded-lg hover:bg-[var(--of-magenta-700)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--of-bg-recessed)] mb-4">
        <svg className="w-8 h-8 text-[var(--of-fg-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-[var(--of-fg-default)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--of-fg-muted)] mb-4">
        {description}
      </p>
      {action}
    </div>
  )
}
