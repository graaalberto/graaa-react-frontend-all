import React from 'react';
import { toast } from 'react-toastify';

interface SocialAuthButtonsProps {
  apiUrl?: string;
}

/**
 * Opens a popup window to start the OAuth flow on the backend.
 * The backend is expected to handle provider redirects/callbacks.
 */
const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ apiUrl = 'http://192.168.1.2:7000' }) => {
  const openOAuthPopup = (provider: 'google' | 'facebook' | 'microsoft') => {
    const oauthUrl = `${apiUrl}/api/auth/${provider}`;
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      oauthUrl,
      `oauth_${provider}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );

    if (!popup) {
      toast.error('Popup bloqueado. Permita popups ou abra o provedor manualmente.');
      // fallback: open in same tab if popup blocked
      window.location.href = oauthUrl;
      return;
    }

    // Optional: focus popup
    try {
      popup.focus();
    } catch {
      // ignore
    }
  };

  return (
    <div className="mt-6">
      <div className="text-center mb-4 text-sm text-muted-foreground">Ou entre / cadastre-se com</div>

      <div className="grid grid-cols-1 gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => openOAuthPopup('google')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-md border border-border bg-background hover:shadow-sm transition-shadow"
          aria-label="Continuar com Google"
        >
          {/* Google Logo */}
          <span className="w-5 h-5">
            <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M533.5 278.4c0-18.2-1.6-36-4.7-53.5H272v101.3h146.9c-6.3 34-25.7 62.9-54.8 82.1v68h88.5c51.8-47.8 82.9-118 82.9-197.9z" fill="#4285F4"/>
              <path d="M272 544.3c73.6 0 135.5-24.5 180.6-66.6l-88.5-68c-24.5 16.5-55.8 26.2-92.1 26.2-70.8 0-130.8-47.8-152.3-112.1H28.5v70.6C73.6 487.7 165 544.3 272 544.3z" fill="#34A853"/>
              <path d="M119.7 325.8c-5.5-16.5-8.7-34.1-8.7-52.1s3.2-35.6 8.7-52.1V151h-90.5C9 196.4 0 232.9 0 272s9 75.6 29.2 121.1l90.5-67.3z" fill="#FBBC05"/>
              <path d="M272 108.7c39.9 0 75.9 13.7 104.3 40.7l78.3-78.3C407.1 24.5 345.2 0 272 0 165 0 73.6 56.7 28.5 141.8l90.5 70.6C141.2 156.5 201.2 108.7 272 108.7z" fill="#EA4335"/>
            </svg>
          </span>
          <span className="text-sm text-foreground font-medium">Continuar com Google</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => openOAuthPopup('facebook')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-[#1877F2] text-white hover:brightness-95 transition-colors"
          aria-label="Continuar com Facebook"
        >
          {/* Facebook Logo */}
          <span className="w-5 h-5">
            <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.323v21.354C0 23.407.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.315h3.59l-.467 3.622h-3.123V24h6.116C23.405 24 24 23.407 24 22.677V1.323C24 .592 23.405 0 22.675 0z"/>
            </svg>
          </span>
          <span className="text-sm font-medium">Continuar com Facebook</span>
        </button>

        {/* Microsoft */}
        <button
          type="button"
          onClick={() => openOAuthPopup('microsoft')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-md border border-border bg-background hover:shadow-sm transition-shadow"
          aria-label="Continuar com Microsoft"
        >
          {/* Microsoft Logo (four colored squares) */}
          <span className="w-5 h-5 grid grid-cols-2 gap-0">
            <svg viewBox="0 0 24 24" className="w-full h-full col-span-2 row-span-2" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="8" height="8" fill="#F25022"/>
              <rect x="13" y="3" width="8" height="8" fill="#7FBA00"/>
              <rect x="3" y="13" width="8" height="8" fill="#00A4EF"/>
              <rect x="13" y="13" width="8" height="8" fill="#FFB900"/>
            </svg>
          </span>
          <span className="text-sm text-foreground font-medium">Continuar com Microsoft</span>
        </button>
      </div>
    </div>
  );
};

export default SocialAuthButtons;