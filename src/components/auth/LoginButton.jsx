import { GoogleLogo } from '@phosphor-icons/react/dist/csr/GoogleLogo';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginButton({ variant = 'primary', size = 'md', className = '' }) {
  const { login } = useAuth();

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-[var(--of-bg-brand)] text-white hover:bg-[var(--of-magenta-700)]',
    outlined: 'bg-transparent border-2 border-[var(--of-border-line)] text-[var(--of-fg-default)] hover:bg-[var(--of-bg-recessed)]'
  };

  return (
    <button
      onClick={login}
      className={`inline-flex items-center gap-2 font-semibold rounded-lg transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <GoogleLogo size={20} weight="bold" />
      Sign in with Google
    </button>
  );
}
