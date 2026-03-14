import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, Defs, LinearGradient, Stop, G, Line, Ellipse } from 'react-native-svg';

interface AuthIllustrationProps {
  size?: number;
}

export default function AuthIllustration({ size = 180 }: AuthIllustrationProps) {
  const s = size;
  const half = s / 2;

  return (
    <View style={styles.container}>
      <Svg width={s} height={s} viewBox="0 0 180 180">
        <Defs>
          <LinearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.9" />
          </LinearGradient>
          <LinearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#F0EAFF" stopOpacity="1" />
            <Stop offset="100%" stopColor="#E8F4FD" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FBBF24" stopOpacity="1" />
            <Stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#34D399" stopOpacity="0.9" />
          </LinearGradient>
        </Defs>

        {/* Background glow circle */}
        <Circle cx="90" cy="90" r="85" fill="#C4B5FD" opacity={0.06} />
        <Circle cx="90" cy="90" r="70" fill="#7DD3FC" opacity={0.04} />

        {/* Phone body */}
        <G transform="translate(55, 30)">
          <Rect x="0" y="0" width="70" height="120" rx="14" fill="url(#phoneGrad)" />
          {/* Screen */}
          <Rect x="6" y="14" width="58" height="86" rx="6" fill="url(#screenGrad)" />
          {/* Notch */}
          <Rect x="24" y="5" width="22" height="4" rx="2" fill="white" opacity={0.5} />
          {/* Screen content — wallet lines */}
          <Rect x="14" y="28" width="30" height="4" rx="2" fill="#C4B5FD" opacity={0.6} />
          <Rect x="14" y="38" width="42" height="3" rx="1.5" fill="#9CA3AF" opacity={0.3} />
          <Rect x="14" y="48" width="36" height="3" rx="1.5" fill="#9CA3AF" opacity={0.25} />
          {/* Screen action button */}
          <Rect x="14" y="62" width="42" height="16" rx="8" fill="#0A0A0A" opacity={0.8} />
          <Rect x="26" y="68" width="18" height="4" rx="2" fill="white" opacity={0.8} />
          {/* Home indicator */}
          <Rect x="22" y="106" width="26" height="3" rx="1.5" fill="white" opacity={0.3} />
        </G>

        {/* Floating coin — top right */}
        <G transform="translate(128, 22)">
          <Circle cx="0" cy="0" r="18" fill="url(#coinGrad)" />
          <Circle cx="0" cy="0" r="12" fill="none" stroke="#FBBF24" strokeWidth="1.5" opacity={0.4} />
          <Line x1="-3" y1="-6" x2="-3" y2="6" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity={0.8} />
          <Line x1="1" y1="-4" x2="1" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity={0.6} />
        </G>

        {/* Shield — bottom left */}
        <G transform="translate(28, 120)">
          <Path 
            d="M0,-18 C0,-18 12,-24 24,-18 L24,0 C24,14 12,22 12,22 C12,22 0,14 0,0 Z" 
            fill="url(#shieldGrad)" 
          />
          {/* Checkmark on shield */}
          <Path 
            d="M7,1 L11,5 L18,-4" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            opacity={0.9} 
          />
        </G>

        {/* Sparkle dots around */}
        <Circle cx="30" cy="40" r="3" fill="#FBBF24" opacity={0.5} />
        <Circle cx="150" cy="75" r="2.5" fill="#F87171" opacity={0.5} />
        <Circle cx="40" cy="160" r="2" fill="#7DD3FC" opacity={0.5} />
        <Circle cx="145" cy="150" r="3" fill="#6EE7B7" opacity={0.4} />
        <Circle cx="25" cy="80" r="2" fill="#C4B5FD" opacity={0.5} />
        <Circle cx="155" cy="110" r="2" fill="#FBBF24" opacity={0.4} />

        {/* Signal/connection arcs — top left */}
        <Path d="M22,55 Q15,48 22,41" fill="none" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" opacity={0.4} />
        <Path d="M18,58 Q8,48 18,38" fill="none" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" opacity={0.25} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 8,
  },
});
