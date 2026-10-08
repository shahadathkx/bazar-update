import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-base-100 border-t border-base-300 w-full">
      <Container className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-x-6 text-[14px] leading-[20px] font-normal text-base-content">
        <p className="text-left">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="md:text-right">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </Container>
    </footer>
  );
}
