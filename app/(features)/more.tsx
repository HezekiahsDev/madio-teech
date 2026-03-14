import React from 'react';
import { LayoutGrid } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function MoreServicesScreen() {
  return (
    <ComingSoonScreen
      title="More Services"
      description="We're constantly adding new services to make your life easier. Stay tuned for exciting new features coming your way."
      icon={LayoutGrid}
      showContactInfo
      timeline="Coming Soon"
      features={[
        { label: 'Insurance & health cover' },
        { label: 'Flight & travel bookings' },
        { label: 'Gift cards & vouchers' },
        { label: 'Government payments & NIN' },
        { label: 'Internet subscriptions' },
      ]}
    />
  );
}
