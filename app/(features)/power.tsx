import React from 'react';
import { Zap } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function PowerScreen() {
  return (
    <ComingSoonScreen
      title="Power"
      description="Never be in the dark again. Pay for electricity tokens from all major distribution companies, instantly."
      icon={Zap}
      timeline="Coming Soon"
      features={[
        { label: 'Prepaid & postpaid electricity' },
        { label: 'All major DISCOs supported' },
        { label: 'Instant token delivery' },
        { label: 'Transaction receipts & history' },
        { label: 'Auto-recharge scheduling' },
      ]}
    />
  );
}
