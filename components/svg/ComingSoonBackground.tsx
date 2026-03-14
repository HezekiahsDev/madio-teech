import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Ellipse, Defs, LinearGradient, Stop, G, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function ComingSoonBackground() {
  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Defs>
        {/* Soft purple-to-blue gradient for main blob */}
        <LinearGradient id="csBlobGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.12" />
          <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.06" />
        </LinearGradient>
        {/* Warm accent gradient */}
        <LinearGradient id="csBlobGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FBBF24" stopOpacity="0.08" />
          <Stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.06" />
        </LinearGradient>
        {/* Green-teal gradient for bottom */}
        <LinearGradient id="csBlobGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.1" />
          <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.04" />
        </LinearGradient>
        {/* Radial-style layered gradient */}
        <LinearGradient id="csGlowGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <Stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.15" />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </LinearGradient>
      </Defs>

      {/* Top glow effect behind the icon hero */}
      <Ellipse
        cx={width * 0.5}
        cy={height * 0.15}
        rx={width * 0.6}
        ry={height * 0.12}
        fill="url(#csGlowGrad)"
      />

      {/* Large flowing blob — top right */}
      <Path
        d={`M${width * 0.55},${-height * 0.06} C${width * 1.15},${height * 0.01} ${width * 1.25},${height * 0.22} ${width * 0.9},${height * 0.28} C${width * 0.55},${height * 0.34} ${width * 0.35},${height * 0.18} ${width * 0.55},${-height * 0.06}`}
        fill="url(#csBlobGrad1)"
      />

      {/* Mid-left organic shape */}
      <Path
        d={`M${-width * 0.12},${height * 0.35} C${width * 0.05},${height * 0.28} ${width * 0.25},${height * 0.32} ${width * 0.2},${height * 0.45} C${width * 0.15},${height * 0.58} ${-width * 0.08},${height * 0.52} ${-width * 0.12},${height * 0.35}`}
        fill="url(#csBlobGrad2)"
      />

      {/* Bottom-right flowing blob */}
      <Path
        d={`M${width * 0.6},${height * 0.72} C${width * 0.85},${height * 0.68} ${width * 1.15},${height * 0.78} ${width * 1.05},${height * 0.92} C${width * 0.95},${height * 1.06} ${width * 0.5},${height * 0.98} ${width * 0.4},${height * 0.88} C${width * 0.3},${height * 0.78} ${width * 0.35},${height * 0.76} ${width * 0.6},${height * 0.72}`}
        fill="url(#csBlobGrad3)"
      />

      {/* Decorative geometric elements */}
      {/* Floating circles — scattered for depth */}
      <Circle cx={width * 0.12} cy={height * 0.12} r={12} fill="#C4B5FD" opacity={0.15} />
      <Circle cx={width * 0.88} cy={height * 0.08} r={6} fill="#FBBF24" opacity={0.18} />
      <Circle cx={width * 0.75} cy={height * 0.38} r={8} fill="#6EE7B7" opacity={0.12} />
      <Circle cx={width * 0.08} cy={height * 0.6} r={5} fill="#FDA4AF" opacity={0.14} />
      <Circle cx={width * 0.92} cy={height * 0.62} r={10} fill="#7DD3FC" opacity={0.1} />
      <Circle cx={width * 0.35} cy={height * 0.82} r={7} fill="#C4B5FD" opacity={0.1} />
      <Circle cx={width * 0.65} cy={height * 0.05} r={4} fill="#6EE7B7" opacity={0.16} />

      {/* Thin decorative rings */}
      <Circle
        cx={width * 0.2}
        cy={height * 0.25}
        r={30}
        fill="none"
        stroke="#C4B5FD"
        strokeWidth={0.5}
        opacity={0.12}
      />
      <Circle
        cx={width * 0.8}
        cy={height * 0.55}
        r={45}
        fill="none"
        stroke="#7DD3FC"
        strokeWidth={0.5}
        opacity={0.08}
      />
      <Circle
        cx={width * 0.5}
        cy={height * 0.7}
        r={25}
        fill="none"
        stroke="#FBBF24"
        strokeWidth={0.5}
        opacity={0.1}
      />

      {/* Small diamond shapes */}
      <G opacity={0.1} transform={`translate(${width * 0.9}, ${height * 0.22}) rotate(45)`}>
        <Rect x={-4} y={-4} width={8} height={8} fill="#C4B5FD" rx={1} />
      </G>
      <G opacity={0.08} transform={`translate(${width * 0.1}, ${height * 0.45}) rotate(45)`}>
        <Rect x={-5} y={-5} width={10} height={10} fill="#FBBF24" rx={1} />
      </G>
      <G opacity={0.12} transform={`translate(${width * 0.55}, ${height * 0.92}) rotate(45)`}>
        <Rect x={-3} y={-3} width={6} height={6} fill="#6EE7B7" rx={1} />
      </G>

      {/* Subtle connecting lines — constellation feel */}
      <Path
        d={`M${width * 0.12},${height * 0.12} L${width * 0.2},${height * 0.25}`}
        stroke="#C4B5FD"
        strokeWidth={0.5}
        opacity={0.08}
      />
      <Path
        d={`M${width * 0.75},${height * 0.38} L${width * 0.8},${height * 0.55}`}
        stroke="#7DD3FC"
        strokeWidth={0.5}
        opacity={0.06}
      />
    </Svg>
  );
}
