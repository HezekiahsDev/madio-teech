import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface DotPatternProps {
  areaHeight?: number;
  offsetY?: number;
}

const DOTS = [
  // Larger accent circles
  { cx: 0.08, cy: 0.1, r: 28, color: '#C4B5FD', opacity: 0.08 },
  { cx: 0.92, cy: 0.25, r: 24, color: '#7DD3FC', opacity: 0.07 },
  { cx: 0.75, cy: 0.65, r: 32, color: '#6EE7B7', opacity: 0.06 },
  { cx: 0.2, cy: 0.8, r: 22, color: '#FBBF24', opacity: 0.07 },
  
  // Medium circles
  { cx: 0.45, cy: 0.05, r: 14, color: '#FDA4AF', opacity: 0.1 },
  { cx: 0.65, cy: 0.15, r: 10, color: '#C4B5FD', opacity: 0.09 },
  { cx: 0.3, cy: 0.35, r: 12, color: '#F87171', opacity: 0.07 },
  { cx: 0.85, cy: 0.5, r: 16, color: '#FBBF24', opacity: 0.06 },
  { cx: 0.12, cy: 0.55, r: 10, color: '#7DD3FC', opacity: 0.08 },
  { cx: 0.55, cy: 0.75, r: 14, color: '#C4B5FD', opacity: 0.07 },
  
  // Small scattered dots
  { cx: 0.25, cy: 0.15, r: 4, color: '#6EE7B7', opacity: 0.15 },
  { cx: 0.7, cy: 0.08, r: 3, color: '#FBBF24', opacity: 0.18 },
  { cx: 0.9, cy: 0.4, r: 4, color: '#FDA4AF', opacity: 0.14 },
  { cx: 0.15, cy: 0.45, r: 3, color: '#C4B5FD', opacity: 0.16 },
  { cx: 0.5, cy: 0.3, r: 3, color: '#F87171', opacity: 0.12 },
  { cx: 0.4, cy: 0.55, r: 4, color: '#7DD3FC', opacity: 0.13 },
  { cx: 0.82, cy: 0.72, r: 3, color: '#6EE7B7', opacity: 0.15 },
  { cx: 0.35, cy: 0.9, r: 4, color: '#FBBF24', opacity: 0.12 },
  { cx: 0.6, cy: 0.92, r: 3, color: '#C4B5FD', opacity: 0.14 },
  { cx: 0.95, cy: 0.88, r: 5, color: '#FDA4AF', opacity: 0.1 },
  
  // Tiny sparkle dots 
  { cx: 0.18, cy: 0.22, r: 2, color: '#FBBF24', opacity: 0.2 },
  { cx: 0.78, cy: 0.32, r: 2, color: '#C4B5FD', opacity: 0.2 },
  { cx: 0.42, cy: 0.68, r: 2, color: '#6EE7B7', opacity: 0.2 },
  { cx: 0.62, cy: 0.48, r: 2, color: '#F87171', opacity: 0.18 },
  { cx: 0.1, cy: 0.72, r: 2, color: '#7DD3FC', opacity: 0.2 },
];

export default function DotPattern({ areaHeight, offsetY = 0 }: DotPatternProps) {
  const h = areaHeight || height;
  
  return (
    <Svg 
      width={width} 
      height={h} 
      style={[StyleSheet.absoluteFill, { top: offsetY }]} 
      viewBox={`0 0 ${width} ${h}`}
    >
      {DOTS.map((dot, i) => (
        <Circle
          key={i}
          cx={dot.cx * width}
          cy={dot.cy * h}
          r={dot.r}
          fill={dot.color}
          opacity={dot.opacity}
        />
      ))}
    </Svg>
  );
}
