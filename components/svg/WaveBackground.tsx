import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface WaveBackgroundProps {
  height?: number;
  color1?: string;
  color2?: string;
}

export default function WaveBackground({ 
  height: svgHeight = 260, 
  color1 = '#C4B5FD', 
  color2 = '#7DD3FC' 
}: WaveBackgroundProps) {
  return (
    <Svg 
      width={width} 
      height={svgHeight} 
      style={[StyleSheet.absoluteFill, { height: svgHeight }]} 
      viewBox={`0 0 ${width} ${svgHeight}`}
    >
      <Defs>
        <LinearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color1} stopOpacity="0.12" />
          <Stop offset="100%" stopColor={color2} stopOpacity="0.06" />
        </LinearGradient>
        <LinearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.08" />
          <Stop offset="100%" stopColor="#FBBF24" stopOpacity="0.04" />
        </LinearGradient>
      </Defs>
      
      {/* Primary wave */}
      <Path
        d={`M0,0 L${width},0 L${width},${svgHeight * 0.6} 
          Q${width * 0.85},${svgHeight * 0.75} ${width * 0.7},${svgHeight * 0.65} 
          Q${width * 0.5},${svgHeight * 0.5} ${width * 0.3},${svgHeight * 0.7} 
          Q${width * 0.15},${svgHeight * 0.82} 0,${svgHeight * 0.7} Z`}
        fill="url(#waveGrad1)"
      />
      
      {/* Secondary softer wave — layered behind */}
      <Path
        d={`M0,${svgHeight * 0.1} 
          Q${width * 0.2},${svgHeight * 0.05} ${width * 0.4},${svgHeight * 0.15} 
          Q${width * 0.6},${svgHeight * 0.25} ${width * 0.8},${svgHeight * 0.12} 
          Q${width * 0.95},${svgHeight * 0.05} ${width},${svgHeight * 0.15} 
          L${width},${svgHeight * 0.85} 
          Q${width * 0.7},${svgHeight} ${width * 0.4},${svgHeight * 0.88} 
          Q${width * 0.15},${svgHeight * 0.75} 0,${svgHeight * 0.9} Z`}
        fill="url(#waveGrad2)"
      />
      
      {/* Playful floating dots */}
      <Circle cx={width * 0.15} cy={svgHeight * 0.25} r={4} fill="#FBBF24" opacity={0.2} />
      <Circle cx={width * 0.55} cy={svgHeight * 0.15} r={3} fill="#F87171" opacity={0.15} />
      <Circle cx={width * 0.82} cy={svgHeight * 0.35} r={5} fill="#C4B5FD" opacity={0.18} />
      <Circle cx={width * 0.4} cy={svgHeight * 0.4} r={3} fill="#6EE7B7" opacity={0.15} />
    </Svg>
  );
}
