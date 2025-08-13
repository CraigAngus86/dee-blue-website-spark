import React from 'react';

interface PlayerBadgeProps {
  isYouthProduct?: boolean;
}

const PlayerBadge: React.FC<PlayerBadgeProps> = ({ isYouthProduct }) => {
  if (!isYouthProduct) return null;

  return (
    <div className="absolute top-4 right-4 z-10">
      <img
        src="https://res.cloudinary.com/dlkpaw2a0/image/upload/v1748701667/Copilot_20250531_182250_wkk0vu_e_background_removal_f_png_jurvz8.png"
        alt="Baynounah SC Youth Product"
        className="w-24 h-24 transform rotate-[15deg] transition-transform duration-300 hover:scale-110"
        style={{
          filter:
            'drop-shadow(0 0 3px rgb(var(--white))) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
        }}
      />
    </div>
  );
};

export default PlayerBadge;
