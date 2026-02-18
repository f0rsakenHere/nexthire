import Faq from "@/components/faq/Faq";
import { FooterSection } from "@/components/home/FooterSection";

export default function FaqPage() {
  return (
    <div className=" min-h-screen items-center justify-center  bg-black text-white ">
      <Faq></Faq>
      <div>
        <FooterSection></FooterSection>
      </div>
    </div>
  );
}
