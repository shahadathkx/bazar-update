'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { signOut } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function UserMenu({ user }: { user: { name: string; image?: string | null } }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-haspopup="menu"
        className="h-9 px-3 sm:h-10 sm:px-[17px] rounded-[8px] hover:bg-base-200 flex items-center gap-2"
      >
        <div className="w-7 h-7 sm:w-9 sm:h-9 shrink-0 rounded-[10.5px] bg-primary text-primary-content flex items-center justify-center overflow-hidden">
          {user.image ? (
            <img /* eslint-disable-next-line @next/next/no-img-element */ src={user.image} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-medium text-sm sm:text-lg">{user.name.charAt(0)}</span>
          )}
        </div>
        <span className="hidden sm:inline text-[14px] font-medium">{user.name.split(' ')[0]}</span>
        <span className="text-[12px] opacity-60">▾</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-base-100 border border-base-300 rounded-[8px] shadow-sm py-1 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-base-content hover:bg-base-200"
            onClick={() => setDropdownOpen(false)}
          >
            আমার প্রোফাইল
          </Link>
          <button
            onClick={() => {
              handleSignOut();
              setDropdownOpen(false);
            }}
            className="w-full text-left block px-4 py-2 text-sm text-base-content hover:bg-base-200"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
