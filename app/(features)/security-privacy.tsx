import React from 'react';
import { Shield } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function SecurityPrivacyScreen() {
  return (
    <ComingSoonScreen
      title="Security & Privacy"
      description="Your safety is our top priority. Advanced security features are being built to keep your account and data fully protected."
      icon={Shield}
      showContactInfo
      timeline="Coming Soon"
      features={[
        { label: 'Two-factor authentication (2FA)' },
        { label: 'Login activity & session management' },
        { label: 'Device management & trusted devices' },
        { label: 'Data export & privacy controls' },
        { label: 'Transaction PIN management' },
      ]}
    />
  );
}
