import React from 'react';
import logoDark from '@/assets/fanpact-logo.svg';
import logoWhite from '@/assets/fanpact-logo-white.svg';

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
      src={isWhite ? logoWhite : logoDark}
      alt="FanPact"
      height={height}
      style={{ height, width: 'auto', display: 'block' }}
      className={className}
    />
  );
}
