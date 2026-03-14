import React from 'react';
import { Tv } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function CableScreen() {
  return (
    <ComingSoonScreen
      title="Cable TV"
      description="Subscribe to your favourite cable TV packages from DStv, GOtv, StarTimes and more — all in one place."
      icon={Tv}
      timeline="Coming Soon"
      features={[
        { label: 'DStv, GOtv, StarTimes subscriptions' },
        { label: 'Smart card validation' },
        { label: 'Package comparison & upgrades' },
        { label: 'Renewal reminders' },
        { label: 'Instant activation' },
      ]}
    />
  );
}
