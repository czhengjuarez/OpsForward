import { clsx } from 'clsx'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  
  const variants = {
    primary: 'bg-[var(--of-bg-brand)] hover:bg-[var(--of-magenta-700)] text-white shadow-lg shadow-[var(--of-magenta-400)]/40',
    secondary: 'bg-[var(--of-bg-recessed)] hover:bg-[var(--of-bg-sunken)] text-[var(--of-fg-default)] shadow-lg',
    outline: 'border-2 border-[var(--of-border-brand)] text-[var(--of-fg-brand)] hover:bg-[var(--of-bg-brand-tint)]',
    danger: 'bg-[var(--of-danger-500)] hover:brightness-95 text-white shadow-lg shadow-[var(--of-danger-500)]/40',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
