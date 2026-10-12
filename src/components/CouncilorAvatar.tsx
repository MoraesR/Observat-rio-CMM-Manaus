import React, { useState } from 'react';
import { User } from 'lucide-react';

interface CouncilorAvatarProps {
  fotoUrl?: string;
  nomeParlamentar: string;
  partido: string;
  corPartido: string;
  numeroUrna: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const CouncilorAvatar: React.FC<CouncilorAvatarProps> = ({
  fotoUrl,
  nomeParlamentar,
  partido,
  corPartido,
  numeroUrna,
  size = 'md',
  showBadge = true,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Derive initials
  const initials = nomeParlamentar
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');

  // Sizing styles
  const sizeMap = {
    sm: { container: 'w-10 h-10', text: 'text-xs', badge: 'text-[9px] px-1 py-0.2' },
    md: { container: 'w-14 h-14', text: 'text-sm', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { container: 'w-20 h-20', text: 'text-base', badge: 'text-xs px-2 py-0.5' },
    xl: { container: 'w-28 h-28', text: 'text-xl', badge: 'text-xs px-2.5 py-0.5' }
  };

  const { container, text, badge } = sizeMap[size];

  const hasPhoto = Boolean(fotoUrl && fotoUrl.trim().length > 0 && !imageError);

  return (
    <div className={`relative shrink-0 ${container} ${className}`}>
      <div
        className={`w-full h-full rounded-xl overflow-hidden border border-slate-200 shadow-xs flex items-center justify-center relative bg-gradient-to-br from-slate-100 to-slate-200`}
        style={{
          boxShadow: `0 2px 8px -2px ${corPartido}33`
        }}
      >
        {hasPhoto ? (
          <>
            <img
              src={fotoUrl}
              alt={`Foto pública de cadastro de ${nomeParlamentar}`}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-top transition-opacity duration-200 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">
                <span className={`font-black ${text} text-slate-400 font-mono`}>
                  {initials}
                </span>
              </div>
            )}
          </>
        ) : (
          /* High-Fidelity Official Parliamentary Seal Avatar */
          <div
            className="w-full h-full flex flex-col items-center justify-center text-white p-1 text-center select-none"
            style={{
              backgroundColor: corPartido,
              backgroundImage: `linear-gradient(135deg, ${corPartido}dd, ${corPartido})`
            }}
          >
            <span className={`font-black tracking-tight ${text}`}>
              {initials}
            </span>
            {size !== 'sm' && (
              <span className="text-[9px] font-mono tracking-wider opacity-85 mt-0.5">
                {partido}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Floating party + ballot number badge */}
      {showBadge && (
        <div
          className={`absolute -bottom-1.5 -right-1 font-mono font-bold text-white rounded-md shadow-xs flex items-center gap-0.5 ${badge}`}
          style={{ backgroundColor: corPartido }}
        >
          <span>{partido}</span>
        </div>
      )}
    </div>
  );
};
