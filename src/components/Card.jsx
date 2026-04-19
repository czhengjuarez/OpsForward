import { clsx } from 'clsx'

const Card = ({ 
  children, 
  icon, 
  title, 
  description, 
  className = '',
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'bg-[var(--of-bg-elevated)]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[var(--of-border-line)]',
        'hover:shadow-2xl hover:border-[var(--of-border-brand)] transition-all duration-300',
        'hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="text-[var(--of-fg-brand)] mb-4 flex justify-center">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-[var(--of-fg-default)] mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-[var(--of-fg-muted)]">
          {description}
        </p>
      )}
      {!title && !description && children}
    </div>
  )
}

export default Card
