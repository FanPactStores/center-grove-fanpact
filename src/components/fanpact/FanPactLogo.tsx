import React from 'react';
import logoUrl from '@/assets/fanpact-logo.svg';

interface FanPactLogoProps {
  variant?: 'horizontal' | 'compact' | 'white' | 'white-compact';
  height?: number;
  className?: string;
}

export function FanPactLogo({
  variant = 'horizontal',
  height = 36,
  className = '',
}: FanPactLogoProps) {
  const isWhite = variant === 'white' || variant === 'white-compact';
  return (
    <img
      src={logoUrl}
      alt="FanPact"
      height={height}
      style={{
        height,
        width: 'auto',
        display: 'block',
        filter: isWhite ? 'brightness(0) invert(1)' : undefined,
      }}
      className={className}
    />
  );
}
