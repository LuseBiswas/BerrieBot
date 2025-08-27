"use client"
import CTASection from "@/components/desktop/product/CTASection";
import HeroSection from "@/components/desktop/solutions/HeroSection";
import DisplaySolution from "@/components/desktop/solutions/displaySolution";

export default function Product() {
  return (
    <>
      <HeroSection />

      <div className="mt-10 mb-[-180px]">
        <div id="recruitment-assistant">
          <DisplaySolution
            theme="dark"
            position="left"
            heading="Always-on proactive scheduling assistant that gets you conversations that convert"
            subheading="Never lose a candidate to scheduling delays or missed follow-ups. BerriConnect is your always-on outreach and scheduling assistant, ensuring every conversation happens on time and drives outcomes."
            bulletPoints={[
              "Automated Outreach & Reminders: Sends bulk calls, chats, and SMS nudges to keep candidates engaged and informed.",
              "Interactive Scheduling: Collects availability, confirms slots, and reschedules seamlessly across channels like WhatsApp, SMS, or email.",
              "Follow-Up & Status Tracking: Provides real-time updates on interview status and reminders to improve show rates.",
            ]}
            outro="With BerriConnect, recruiters reclaim hours lost to repetitive tasks, candidates feel valued with timely communication, and every conversation moves you closer to a hire."
            lordicons={[
              "https://cdn.lordicon.com/ucbznuay.json", // Box 1
              "https://cdn.lordicon.com/wsvtrygf.json", // Box 2
              "https://cdn.lordicon.com/odpyouay.json"  // Box 3
            ]}
          />
        </div>
        <div id="live-texting">
          <DisplaySolution
            theme="light"
            position="right"
            heading="Seamless AI recruiter to <br/> convert your best candidates"
            subheading="You very own 24/7 AI recruiter that runs structured, bias-free technical, behavioral, or coding interviews so you can move fast on top talent without overloading your panels."
            bulletPoints={[
              "End-to-End Interviewing: From greeting and question delivery to scoring and reporting, fully automated.",
              "Adaptive Assessments: Questions evolve in real-time to mimic a live interviewer and measure true capability.",
              "Integrated Coding & Scoring: In-platform code editor plus AI-based evaluation of both technical and soft skills.",
            ]}
            outro="Hiring becomes scalable, consistent, and candidate-friendly reducing time-to-hire by 50% and boosting conversion rates on your best talent."
            lordicons={[
             "https://cdn.lordicon.com/cfoaotmk.json", // Box 1
              "https://cdn.lordicon.com/nwwurnnq.json", // Box 2
              "https://cdn.lordicon.com/glzqezmf.json"  // Box 3
            ]}
          />
        </div>
        <div id="real-time-proctoring">
          <DisplaySolution
            theme="dark"
            position="left"
            heading="Real-Time Proctoring: Eyes on Screen. Always On Guard"
            subheading="Protect the integrity of every interview and assessment. BerriProctor ensures you’re always speaking to the right person by detecting fraud, impersonation, and suspicious behavior in real time."
            bulletPoints={[
              "Identity Verification: Facial recognition, voice matching, and biometric cues confirm the candidate is who they claim to be.",
              "Environment & Behavior Monitoring: Detects second screens, external help, lip-sync, or other anomalies during tests.",
              "Live Alerts & Reporting: Flags risks instantly and provides detailed logs for compliance and audit trails.",
            ]}
            outro="BerriProctor saves you from costly mis-hires, protects your brand reputation, and ensures every evaluation is fair, compliant, and trustworthy."
            lordicons={[
              "https://cdn.lordicon.com/gjopwtdp.json",
              "https://cdn.lordicon.com/kdibbosx.json", // Box 1 // Box 2
              "https://cdn.lordicon.com/lltgvngb.json"  // Box 3
            ]}
          />
        </div>
      </div>

      <div className="">
        <CTASection />
      </div>
    </>
  );
}
