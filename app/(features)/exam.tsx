import React from 'react';
import { GraduationCap } from 'lucide-react-native';
import ComingSoonScreen from '../../components/ComingSoonScreen';

export default function ExamScreen() {
  return (
    <ComingSoonScreen
      title="Exam Pins"
      description="Purchase WAEC, NECO, NABTEB and JAMB exam scratch cards and e-PINs instantly. No stress, no queues."
      icon={GraduationCap}
      timeline="Coming Soon"
      features={[
        { label: 'WAEC result checker PINs' },
        { label: 'NECO & NABTEB scratch cards' },
        { label: 'JAMB e-PINs & registration' },
        { label: 'Instant delivery to your phone' },
        { label: 'Bulk purchase for schools' },
      ]}
    />
  );
}
