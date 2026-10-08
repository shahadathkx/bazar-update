import { EmptyState } from '@/components/ui/EmptyState';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <Container className="py-12">
      <EmptyState 
        emoji="🔎" 
        title="পণ্যটি পাওয়া যায়নি" 
        description="আপনি যে পণ্যটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।" 
        ctaHref="/" 
        ctaLabel="হোম পেজে ফিরে যান" 
      />
    </Container>
  );
}
