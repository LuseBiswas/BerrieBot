import CTASection from "@/components/product/CTASection";
import HeroSection from "@/components/solutions/HeroSection";
import DisplaySolution from "@/components/solutions/displaySolution";


export default function Product() {
  return (
    <>
      <HeroSection />

      <div className="mt-10 mb-[-180px]">
      <DisplaySolution
        theme="dark"
        position="left"
        heading="Recruitment Assistant:Your New Favourite Team Member"
        subheading="Hiring’s hard. Endless screening calls? Even harder. With Berri360, your recruitment team gets a super-assistant that works 24/7 (and doesn’t even need coffee)."
        bulletPoints={[
          "Schedules interviews, confirms call letters, and keeps your career site buzzing.",
          "Follows up with candidates, manages panel confirmations, and tracks offer acceptances.).",
          "Even post-hire, it keeps the engine running -engaging employees, sharing updates, and nudging for compliance checks."
        ]}
        outro="Companies using AI-powered recruitment have cut screening costs by up to 75%. You could be next."
        image="/image/screenshot_4.png"
      />
      <DisplaySolution
        theme="light"
        position="right"
        heading="Real-Time Proctoring: Eyes on Screen. Always On Guard"
        subheading="Secure online meetings or assessments shouldn’t feel like a gamble. BerriProctor is your AI-powered watchdog for all things video - interviews, tests or meetings - you name it."
        bulletPoints={[
          "Verifies participant identity using trusted databases.",
          "Flags red flags like impersonation, deepfakes, audio-lipsync issues (yes, really).",
          "Makes sure only the right people get in - and stay in."
        ]}
        outro="And when it’s all done, BerriProctor wraps it up with handy post-meeting workflows to keep things moving."
        image="/image/screenshot_4.png"
      />
      <DisplaySolution
        theme="dark"
        position="left"
        heading="Live Texting Assistant: Conversations That Convert"
        subheading="Say hello to BerriConnect, your always-on, never-boring, AI chat buddy. From answering customer questions to helping close deals - this is not your average chatbot."
        bulletPoints={[
          "Personalized conversations via SMS, WhatsApp, Insta, and more.",
          "Handles bookings, confirms calls, sends quotes, and even demos products.",
          "Available 24/7, so you never miss a lead (or a customer craving attention)."
        ]}
        outro="It's not just reactive—it’s proactive. BerriConnect knows when to follow up and how to make it feel human."
        image="/image/screenshot_4.png"
      />
      </div>

      <div className="">
        <CTASection/>
      </div> 
    </>
  );
} 