import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Ellipse, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

type BlobVariant = 'auth' | 'dashboard' | 'feature' | 'profile';

interface BlobBackgroundProps {
  variant?: BlobVariant;
}

const AuthBlobs = () => (
  <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox={`0 0 ${width} ${height}`}>
    <Defs>
      <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.15" />
        <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.08" />
      </LinearGradient>
      <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#FBBF24" stopOpacity="0.1" />
        <Stop offset="100%" stopColor="#F87171" stopOpacity="0.08" />
      </LinearGradient>
      <LinearGradient id="grad3" x1="100%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.12" />
        <Stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.06" />
      </LinearGradient>
    </Defs>
    {/* Top-right large blob */}
    <Path
      d={`M${width * 0.6},${-height * 0.05} C${width * 1.1},${height * 0.02} ${width * 1.2},${height * 0.25} ${width * 0.85},${height * 0.3} C${width * 0.5},${height * 0.35} ${width * 0.3},${height * 0.15} ${width * 0.6},${-height * 0.05}`}
      fill="url(#grad1)"
    />
    {/* Bottom-left blob */}
    <Path
      d={`M${-width * 0.15},${height * 0.65} C${-width * 0.05},${height * 0.5} ${width * 0.35},${height * 0.55} ${width * 0.3},${height * 0.7} C${width * 0.25},${height * 0.85} ${-width * 0.1},${height * 0.82} ${-width * 0.15},${height * 0.65}`}
      fill="url(#grad2)"
    />
    {/* Middle accent circle */}
    <Circle cx={width * 0.85} cy={height * 0.55} r={60} fill="#FDA4AF" opacity={0.08} />
    {/* Small floating circles */}
    <Circle cx={width * 0.15} cy={height * 0.2} r={20} fill="#C4B5FD" opacity={0.12} />
    <Circle cx={width * 0.75} cy={height * 0.75} r={15} fill="#7DD3FC" opacity={0.1} />
    <Circle cx={width * 0.9} cy={height * 0.15} r={8} fill="#FBBF24" opacity={0.15} />
    {/* Bottom-right gentle blob */}
    <Ellipse cx={width * 0.9} cy={height * 0.9} rx={120} ry={80} fill="url(#grad3)" />
  </Svg>
);

const DashboardBlobs = () => (
  <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox={`0 0 ${width} ${height}`}>
    <Defs>
      <LinearGradient id="dashGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.1" />
        <Stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.06" />
      </LinearGradient>
      <LinearGradient id="dashGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.08" />
        <Stop offset="100%" stopColor="#FBBF24" stopOpacity="0.05" />
      </LinearGradient>
    </Defs>
    {/* Top banner blob — behind the balance area */}
    <Path
      d={`M0,0 L${width},0 L${width},${height * 0.22} Q${width * 0.75},${height * 0.28} ${width * 0.5},${height * 0.24} Q${width * 0.25},${height * 0.2} 0,${height * 0.26} Z`}
      fill="url(#dashGrad1)"
    />
    {/* Subtle accent blob mid-screen */}
    <Ellipse cx={width * 0.1} cy={height * 0.45} rx={100} ry={70} fill="#C4B5FD" opacity={0.06} />
    <Ellipse cx={width * 0.95} cy={height * 0.5} rx={80} ry={60} fill="#FDA4AF" opacity={0.05} />
    {/* Small decorative dots */}
    <Circle cx={width * 0.2} cy={height * 0.08} r={6} fill="#FBBF24" opacity={0.15} />
    <Circle cx={width * 0.8} cy={height * 0.12} r={4} fill="#F87171" opacity={0.12} />
    <Circle cx={width * 0.6} cy={height * 0.06} r={5} fill="#6EE7B7" opacity={0.14} />
    {/* Bottom wave accent */}
    <Path
      d={`M0,${height * 0.85} Q${width * 0.3},${height * 0.82} ${width * 0.5},${height * 0.85} Q${width * 0.7},${height * 0.88} ${width},${height * 0.84} L${width},${height} L0,${height} Z`}
      fill="url(#dashGrad2)"
    />
  </Svg>
);

const FeatureBlobs = () => (
  <Svg width={width} height={height * 0.4} style={[StyleSheet.absoluteFill, { height: height * 0.4 }]} viewBox={`0 0 ${width} ${height * 0.4}`}>
    <Defs>
      <LinearGradient id="featGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.08" />
        <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.05" />
      </LinearGradient>
    </Defs>
    <Path
      d={`M${-width * 0.1},0 C${width * 0.2},${height * 0.08} ${width * 0.4},${-height * 0.02} ${width * 0.7},${height * 0.05} C${width * 1},${height * 0.12} ${width * 1.1},${height * 0.2} ${width * 0.85},${height * 0.25} C${width * 0.6},${height * 0.3} ${width * 0.3},${height * 0.22} ${-width * 0.1},${height * 0.28} Z`}
      fill="url(#featGrad)"
    />
    <Circle cx={width * 0.85} cy={height * 0.05} r={30} fill="#FBBF24" opacity={0.08} />
    <Circle cx={width * 0.15} cy={height * 0.12} r={18} fill="#6EE7B7" opacity={0.1} />
  </Svg>
);

const ProfileBlobs = () => (
  <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox={`0 0 ${width} ${height}`}>
    <Defs>
      <LinearGradient id="profGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.08" />
        <Stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.06" />
      </LinearGradient>
    </Defs>
    {/* Top-left soft blob */}
    <Ellipse cx={-20} cy={height * 0.08} rx={140} ry={100} fill="url(#profGrad1)" />
    {/* Right side accent */}
    <Ellipse cx={width + 20} cy={height * 0.35} rx={100} ry={130} fill="#7DD3FC" opacity={0.05} />
    {/* Scattered small circles */}
    <Circle cx={width * 0.7} cy={height * 0.06} r={5} fill="#FBBF24" opacity={0.12} />
    <Circle cx={width * 0.3} cy={height * 0.3} r={4} fill="#6EE7B7" opacity={0.1} />
    <Circle cx={width * 0.85} cy={height * 0.6} r={6} fill="#C4B5FD" opacity={0.1} />
    <Circle cx={width * 0.1} cy={height * 0.7} r={3} fill="#F87171" opacity={0.08} />
  </Svg>
);

export default function BlobBackground({ variant = 'auth' }: BlobBackgroundProps) {
  switch (variant) {
    case 'auth': return <AuthBlobs />;
    case 'dashboard': return <DashboardBlobs />;
    case 'feature': return <FeatureBlobs />;
    case 'profile': return <ProfileBlobs />;
    default: return <AuthBlobs />;
  }
}
