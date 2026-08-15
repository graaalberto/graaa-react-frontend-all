import React, { useEffect, useState } from 'react';
import { LogOut, Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  userRole?: string;
}

type ThemeMode = 'light' | 'dark' | 'auto';
const THEME_KEY = 'theme';

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userName, userRole }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    return stored ?? 'auto';
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const applyTheme = (mode: ThemeMode) => {
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'light') {
      root.classList.remove('dark');
    } else {
      // auto
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    // Apply theme on mount
    applyTheme(theme);

    // If auto, listen to system changes and update theme dynamically
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    // Use modern addEventListener if available, fallback to addListener
    if (mql) {
      if (mql.addEventListener) {
        mql.addEventListener('change', handler);
      } else if ((mql as any).addListener) {
        (mql as any).addListener(handler);
      }
    }

    return () => {
      if (mql) {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', handler);
        } else if ((mql as any).removeListener) {
          (mql as any).removeListener(handler);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  useEffect(() => {
    // Persist and apply whenever theme state changes
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }, [theme]);

  const cycleTheme = () => {
    const next: ThemeMode = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
    setTheme(next);
  };

  const renderThemeIcon = () => {
    if (theme === 'light') return <Sun size={18} />;
    if (theme === 'dark') return <Moon size={18} />;
    return <Monitor size={18} />;
  };

  const themeLabel = theme === 'light' ? 'Modo claro' : theme === 'dark' ? 'Modo escuro' : 'Automático';

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center font-bold text-primary">
            A
          </div>
          <h1 className="text-xl font-bold hidden sm:block">AuthHub</h1>
        </div>

        {/* Center navigation for authenticated users */}
        
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:opacity-80 transition-opacity"
            >
              Dashboard
            </button>
            <span className="text-sm opacity-75">
              {userName} • {userRole}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 px-4 py-2 rounded-md transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
          </nav>
        )}

        {/* Right-side controls: theme toggle (always visible) and mobile menu toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={cycleTheme}
            title={themeLabel}
            aria-label={`Alternar tema (atual: ${themeLabel})`}
            className="p-2 rounded-md hover:bg-primary/10 transition-colors flex items-center gap-2 border border-transparent hover:border-border"
          >
            <span className="sr-only">{themeLabel}</span>
            <div className="flex items-center gap-2">
              <span className="text-primary-foreground">{renderThemeIcon()}</span>
              <span className="hidden sm:inline text-sm opacity-80">{theme === 'auto' ? 'Auto' : theme === 'light' ? 'Claro' : 'Escuro'}</span>
            </div>
          </button>

          {isAuthenticated && (
            <>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
        </div>
      </div>

      {isAuthenticated && mobileMenuOpen && (
        <nav className="md:hidden bg-primary/95 border-t border-primary-foreground/20 px-4 py-4 space-y-3">
          <button
            onClick={() => {
              navigate('/dashboard');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left hover:opacity-80 transition-opacity py-2"
          >
            Dashboard
          </button>

          <div className="flex items-center justify-between">
            <div className="text-sm opacity-75 py-2">
              {userName} • {userRole}
            </div>
            {/* Mobile theme toggle inside menu for convenience */}
            <button
              onClick={() => {
                cycleTheme();
                // keep mobile menu open so user can see change; don't auto-close
              }}
              title={themeLabel}
              aria-label={`Alternar tema (atual: ${themeLabel})`}
              className="p-2 rounded-md hover:bg-primary/10 transition-colors flex items-center gap-2 border border-transparent hover:border-border"
            >
              <span className="text-primary-foreground">{renderThemeIcon()}</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-destructive hover:bg-destructive/90 px-4 py-2 rounded-md transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;