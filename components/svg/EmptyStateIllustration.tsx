import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, Defs, LinearGradient, Stop, G, Line } from 'react-native-svg';

interface EmptyStateIllustrationProps {
  size?: number;
}

export default function EmptyStateIllustration({ size = 160 }: EmptyStateIllustrationProps) {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 160 160">
        <Defs>
          <LinearGradient id="emptyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.1" />
          </LinearGradient>
          <LinearGradient id="docGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#F3F4F6" stopOpacity="1" />
            <Stop offset="100%" stopColor="#E5E7EB" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.8" />
          </LinearGradient>
        </Defs>

        {/* Background circles */}
        <Circle cx="80" cy="80" r="75" fill="url(#emptyGrad1)" />
        <Circle cx="80" cy="80" r="55" fill="#C4B5FD" opacity={0.04} />

        {/* Document/receipt stack */}
        {/* Back document */}
        <G transform="translate(40, 32) rotate(-5, 40, 50)">
          <Rect x="0" y="0" width="80" height="100" rx="8" fill="#E5E7EB" opacity={0.6} />
        </G>
        
        {/* Front document */}
        <G transform="translate(38, 28)">
          <Rect x="0" y="0" width="80" height="100" rx="8" fill="url(#docGrad)" />
          {/* Content lines */}
          <Rect x="14" y="18" width="52" height="4" rx="2" fill="#D1D5DB" />
          <Rect x="14" y="30" width="40" height="3" rx="1.5" fill="#E5E7EB" />
          <Rect x="14" y="40" width="46" height="3" rx="1.5" fill="#E5E7EB" />
          <Rect x="14" y="50" width="34" height="3" rx="1.5" fill="#E5E7EB" />
          {/* Dashed separator */}
          <Line x1="14" y1="64" x2="66" y2="64" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4,3" />
          {/* Amount placeholder */}
          <Rect x="36" y="74" width="28" height="6" rx="3" fill="#D1D5DB" />
        </G>

        {/* Magnifying glass */}
        <G transform="translate(100, 95)">
          <Circle cx="0" cy="0" r="16" fill="none" stroke="url(#searchGrad)" strokeWidth="3" />
          <Circle cx="0" cy="0" r="10" fill="#C4B5FD" opacity={0.1} />
          <Line x1="11" y1="11" x2="22" y2="22" stroke="url(#searchGrad)" strokeWidth="3.5" strokeLinecap="round" />
        </G>

        {/* Decorative floating elements */}
        <Circle cx="25" cy="50" r="3" fill="#FBBF24" opacity={0.5} />
        <Circle cx="140" cy="40" r="2.5" fill="#6EE7B7" opacity={0.5} />
        <Circle cx="20" cy="120" r="2" fill="#F87171" opacity={0.4} />
        <Circle cx="135" cy="130" r="3" fill="#7DD3FC" opacity={0.4} />
        
        {/* Small sparkle stars */}
        <G transform="translate(130, 60)">
          <Line x1="-4" y1="0" x2="4" y2="0" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
          <Line x1="0" y1="-4" x2="0" y2="4" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
        </G>
        <G transform="translate(30, 90)">
          <Line x1="-3" y1="0" x2="3" y2="0" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
          <Line x1="0" y1="-3" x2="0" y2="3" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
});
