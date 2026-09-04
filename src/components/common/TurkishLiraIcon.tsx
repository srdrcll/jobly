import React from 'react';

interface TurkishLiraIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export const TurkishLiraIcon: React.FC<TurkishLiraIconProps> = ({ 
  className = 'w-4 h-4',
  'aria-hidden': ariaHidden = true 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      {/* Turkish Lira (₺) official symbol */}
      <path d="M9 3v18" />
      <path d="M9 21c4.97 0 9-4.03 9-9s-4.03-9-9-9" />
      <path d="M5.5 10.5l7-2.5" />
      <path d="M5.5 14.5l7-2.5" />
    </svg>
  );
};
