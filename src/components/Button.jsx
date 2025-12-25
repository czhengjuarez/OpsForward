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
    primary: 'bg-primary-700 hover:bg-primary-800 text-white shadow-lg shadow-primary-500/50',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white shadow-lg',
    outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/50',
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
