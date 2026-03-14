import React from 'react';
import { Settings } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function AccountSettingsScreen() {
  return (
    <ComingSoonScreen
      title="Account Settings"
      description="Full control over your account is on the way. Manage your profile, preferences, and more — all in one place."
      icon={Settings}
      timeline="Coming Soon"
      features={[
        { label: 'Edit profile information' },
        { label: 'Notification preferences' },
        { label: 'Manage payment methods' },
        { label: 'Account verification & KYC' },
        { label: 'Language & display settings' },
      ]}
    />
  );
}
