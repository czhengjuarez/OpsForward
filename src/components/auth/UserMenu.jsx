import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../ui/Text';
import { User } from '@phosphor-icons/react/dist/csr/User';
import { SignOut } from '@phosphor-icons/react/dist/csr/SignOut';
import { Gear } from '@phosphor-icons/react/dist/csr/Gear';
import { useAuth } from '../../contexts/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--of-bg-recessed)] transition-colors"
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[var(--of-bg-brand)] flex items-center justify-center">
            <User size={20} weight="bold" className="text-white" />
          </div>
        )}
        <Text weight="medium" className="hidden md:block">{user.name}</Text>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[var(--of-bg-elevated)] rounded-lg shadow-xl border border-[var(--of-border-line)] py-2 z-50">
          <div className="px-4 py-2 border-b border-[var(--of-border-line)]">
            <Text weight="semibold">{user.name}</Text>
            <Text size="sm" color="secondary">{user.email}</Text>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--of-bg-recessed)] transition-colors text-[var(--of-fg-muted)]"
            onClick={() => setIsOpen(false)}
          >
            <User size={20} />
            <Text>Dashboard</Text>
          </Link>

          {user.role === 'admin' || user.role === 'super_admin' ? (
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--of-bg-recessed)] transition-colors text-[var(--of-fg-muted)]"
              onClick={() => setIsOpen(false)}
            >
              <Gear size={20} />
              <Text>Admin Panel</Text>
            </Link>
          ) : null}

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--of-bg-recessed)] transition-colors text-[var(--of-danger-500)]"
          >
            <SignOut size={20} />
            <Text className="text-[var(--of-danger-500)]">Sign Out</Text>
          </button>
        </div>
      )}
    </div>
  );
}
