import React from 'react';
import { HelpCircle } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function HelpSupportScreen() {
  return (
    <ComingSoonScreen
      title="Help & Support"
      description="Need assistance? Our support team is always here for you. Full in-app support is coming soon — in the meantime, reach out below."
      icon={HelpCircle}
      showContactInfo
      timeline="Coming Soon"
      features={[
        { label: 'Live chat with support agents' },
        { label: 'Searchable FAQ & knowledge base' },
        { label: 'Ticket system for issue tracking' },
        { label: 'Video tutorials & guides' },
        { label: 'Community forum access' },
      ]}
    />
  );
}
