import React from 'react';
import { Crown } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function UpgradeScreen() {
  return (
    <ComingSoonScreen
      title="Upgrade"
      description="Unlock premium features, lower fees, and exclusive access. Our upgrade system is being perfected to give you the best value."
      icon={Crown}
      showContactInfo
      timeline="Coming Soon"
      features={[
        { label: 'Custom pricing tiers for every need' },
        { label: 'Bulk discount access for resellers' },
        { label: 'Priority support & dedicated manager' },
        { label: 'API access for business integrations' },
        { label: 'Zero transaction fees at top tiers' },
      ]}
    />
  );
}
