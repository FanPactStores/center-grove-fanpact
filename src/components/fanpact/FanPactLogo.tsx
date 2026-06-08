import React from 'react';

interface FanPactLogoProps {

  variant?: 'horizontal' | 'compact' | 'white' | 'white-compact';

  height?: number;

  className?: string;

}

export function FanPactLogo({ 

  variant = 'horizontal', 

  height = 36,

  className = ''

}: FanPactLogoProps) {

  if (variant === 'compact') {

    const w = height * 1.75;

    const ph = height;

    const pw = height * 0.85;

    return (

      <svg width={w} height={ph} viewBox={`0 0 ${w} ${ph}`} 

           className={className} aria-label="FanPact">

        <polygon 

          points={`0,${ph*0.22} ${pw},0 ${pw},${ph} 0,${ph*0.78}`} 

          fill="#13294B"/>

        <polygon 

          points={`0,${ph*0.22} ${pw*0.22},${ph*0.15} ${pw*0.22},${ph*0.85} 0,${ph*0.78}`} 

          fill="#BA7517"/>

        <text 

          x={pw*0.3} y={ph*0.66} 

          fontFamily="Georgia,serif" 

          fontSize={ph*0.38} 

          fontWeight="700" 

          fill="white">FP</text>

        <text 

          x={pw+8} y={ph*0.68} 

          fontFamily="Arial,sans-serif" 

          fontSize={ph*0.44} 

          fontWeight="800" 

          fill="#13294B" 

          letterSpacing="1.5">FANPACT</text>

      </svg>

    );

  }

  if (variant === 'white') {

    const w = height * 5.2;

    const ph = height;

    const pw = height * 1.1;

    return (

      <svg width={w} height={ph} viewBox={`0 0 ${w} ${ph}`} 

           className={className} aria-label="FanPact">

        <polygon 

          points={`0,${ph*0.22} ${pw},0 ${pw},${ph} 0,${ph*0.78}`} 

          fill="white"/>

        <polygon 

          points={`0,${ph*0.22} ${pw*0.22},${ph*0.15} ${pw*0.22},${ph*0.85} 0,${ph*0.78}`} 

          fill="#BA7517"/>

        <text 

          x={pw*0.3} y={ph*0.66} 

          fontFamily="Georgia,serif" 

          fontSize={ph*0.38} 

          fontWeight="700" 

          fill="#13294B">FP</text>

        <text 

          x={pw+10} y={ph*0.68} 

          fontFamily="Arial,sans-serif" 

          fontSize={ph*0.56} 

          fontWeight="800" 

          fill="white" 

          letterSpacing="2">FANPACT</text>

      </svg>

    );

  }

  if (variant === 'white-compact') {

    const w = height * 3.2;

    const ph = height;

    const pw = height * 0.78;

    return (

      <svg width={w} height={ph} viewBox={`0 0 ${w} ${ph}`} 

           className={className} aria-label="FanPact">

        <polygon 

          points={`0,${ph*0.22} ${pw},0 ${pw},${ph} 0,${ph*0.78}`} 

          fill="white"/>

        <polygon 

          points={`0,${ph*0.22} ${pw*0.22},${ph*0.15} ${pw*0.22},${ph*0.85} 0,${ph*0.78}`} 

          fill="#BA7517"/>

        <text 

          x={pw*0.28} y={ph*0.66} 

          fontFamily="Georgia,serif" 

          fontSize={ph*0.35} 

          fontWeight="700" 

          fill="#13294B">FP</text>

        <text 

          x={pw+6} y={ph*0.68} 

          fontFamily="Arial,sans-serif" 

          fontSize={ph*0.42} 

          fontWeight="800" 

          fill="white" 

          letterSpacing="1">FANPACT</text>

      </svg>

    );

  }

  const w = height * 5.2;

  const ph = height;

  const pw = height * 1.1;

  return (

    <svg width={w} height={ph} viewBox={`0 0 ${w} ${ph}`} 

         className={className} aria-label="FanPact">

      <polygon 

        points={`0,${ph*0.22} ${pw},0 ${pw},${ph} 0,${ph*0.78}`} 

        fill="#13294B"/>

      <polygon 

        points={`0,${ph*0.22} ${pw*0.22},${ph*0.15} ${pw*0.22},${ph*0.85} 0,${ph*0.78}`} 

        fill="#BA7517"/>

      <text 

        x={pw*0.3} y={ph*0.66} 

        fontFamily="Georgia,serif" 

        fontSize={ph*0.38} 

        fontWeight="700" 

        fill="white">FP</text>

      <text 

        x={pw+10} y={ph*0.68} 

        fontFamily="Arial,sans-serif" 

        fontSize={ph*0.56} 

        fontWeight="800" 

        fill="#13294B" 

        letterSpacing="2">FANPACT</text>

    </svg>

  );

}
