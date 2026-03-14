import React from 'react';
import { Dices } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function BettingScreen() {
  return (
    <ComingSoonScreen
      title="Betting"
      description="Fund your favourite betting accounts instantly. Bet9ja, SportyBet, 1xBet and more — top up in seconds."
      icon={Dices}
      timeline="Coming Soon"
      features={[
        { label: 'Bet9ja wallet funding' },
        { label: 'SportyBet, 1xBet & BetKing' },
        { label: 'Instant account top-up' },
        { label: 'Multiple platforms supported' },
        { label: 'Transaction tracking' },
      ]}
    />
  );
}
