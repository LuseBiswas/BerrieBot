"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is Berribot?",
    answer: "Berribot is an AI-powered recruitment and workforce automation platform. It uses digital agents to handle communication, screening, interviewing, and fraud detection—reducing manual workload, cutting costs, and improving candidate and employee experience."
  },
  {
    id: 2,
    question: "Can Berribot scale for large enterprises?",
    answer: "Yes. Berribot handles up to 10,000 calls or chats per minute across 36+ languages and 130+ countries, making it suitable for both SMBs and global enterprises."
  },
  {
    id: 3,
    question: "How does Berribot ensure interview integrity?",
    answer: "BerriProctor uses facial recognition, voice biometrics, liveness checks, and anomaly detection (e.g., second screens, lip-sync coaching) to prevent impersonation and fraud during interviews."
  },
  {
    id: 4,
    question: "Can Berribot conduct interviews without human intervention?",
    answer: "Yes. BerriMastermind delivers fully automated interviews, including adaptive questioning, coding assessments, and AI-driven scoring—available 24/7 to eliminate scheduling delays."
  },
  {
    id: 5,
    question: "Is Berribot compliant with data privacy regulations?",
    answer: "Yes. Berribot is GDPR, DPDP (India 2023), CCPA/CPRA, and EEOC compliant. It uses end-to-end encryption, audit trails, and human-in-the-loop review for edge cases. We are also Soc2Type2 and ISO27K compliant."
  },
  {
    id: 6,
    question: "What ROI can companies expect?",
    answer: "Clients like Cognizant and Wipro have reported:\n\n• 50% faster time-to-hire\n• 75% cost savings on interviews\n• $3M+ in annual productivity savings."
  },
  {
    id: 7,
    question: "What integrations does Berribot support?",
    answer: "Berribot integrates with major ATS and HR platforms (Workday, SAP SuccessFactors, Oracle), as well as communication channels like WhatsApp, Teams, Messenger, and SMS."
  },
  {
    id: 8,
    question: "Who will I be talking to during my Berribot interview?",
    answer: "You may be interacting with an AI recruiter or interviewer bot. These are digital agents that ask structured questions, record answers, and share them with human recruiters for final evaluation."
  },
  {
    id: 9,
    question: "How does Berribot save recruiter time?",
    answer: "Over 60% of recruiter time is typically spent on repetitive tasks. Berribot automates scheduling, reminders, follow-ups, and screening, freeing recruiters for higher-value work."
  },
  {
    id: 10,
    question: "What metrics can recruiters track?",
    answer: "Recruiters get dashboards showing candidate show rates, fraud alerts, scoring, and recruiter time saved. Clients have seen 75% cost savings and 50% faster time-to-hire."
  },
  {
    id: 11,
    question: "How does Berribot help businesses?",
    answer: "Berribot offers a complete AI based recruitment solution from candidate search, to automated connect, to skill interviews with proctoring. Berribot reduces hiring costs by up to 85%, cuts time-to-hire by 50%, prevents fraud, and improves candidate engagement. It frees recruiters from repetitive tasks so they can focus on decision-making and building relationships."
  },
  {
    id: 12,
    question: "How does Berribot improve candidate communication?",
    answer: "BerriConnect automates outreach, reminders, and status updates via voice, SMS, WhatsApp, and chat. This ensures candidates stay informed, increasing show-up rates and reducing ghosting. Berribot ensures that all communications are warm and friendly."
  },
  {
    id: 13,
    question: "Does Berribot use client data to train models?",
    answer: "No. Berribot defaults to no cross-company data training. Each client's data remains private and auditable"
  },
  {
    id: 14,
    question: "How is Berribot priced?",
    answer: "Berribot offers usage-based pricing. Plans are tiered for SMBs, mid-market, and enterprise, with add-ons for fraud detection, advanced analytics, and ATS integrations."
  },
  {
    id: 15,
    question: "Does Berribot support multiple languages?",
    answer: "Yes. Berribot supports 36+ languages and operates in 130+ countries."
  },
  {
    id: 16,
    question: "Will the AI know if I am the right fit?",
    answer: "Berribot uses skill-based assessments, coding challenges, and contextual matching against the job description. Human recruiters still review final recommendations."
  },
  {
    id: 17,
    question: "How do I know the interview is fair?",
    answer: "All candidates receive the same standardized questions. Scoring is automated and bias-free, helping ensure fairness in evaluation. We constantly train our models to make sure they are bias-free and fair."
  },
  {
    id: 18,
    question: "Can I complete the interview at my own time?",
    answer: "Yes. BerriMastermind supports 24/7 asynchronous interviews, so you can log in and complete them when convenient."
  },
  {
    id: 19,
    question: "What if I face technical issues?",
    answer: "Berribot interviews are designed to auto-resume if a call drops or a session is interrupted. You will also receive reminders and links to continue."
  },
  {
    id: 20,
    question: "Will my data be safe?",
    answer: "Yes. Your personal information and interview recordings are encrypted and stored securely, fully compliant with data privacy laws like GDPR and India's DPDP Act."
  },
  {
    id: 21,
    question: "Can I customize interview questions?",
    answer: "Yes. Recruiters can upload job descriptions and skill requirements. BerriMastermind generates adaptive, benchmarked questions aligned with the role."
  },
  {
    id: 22,
    question: "Does Berribot integrate with our ATS?",
    answer: "Berribot integrates with systems like Workday, Oracle, and SAP SuccessFactors, and syncs candidate data back into your ATS automatically."
  },
  {
    id: 23,
    question: "How does Berribot prevent fraud in interviews?",
    answer: "BerriProctor uses voice and facial biometrics, liveness checks, and anomaly detection (like second screens or whispered coaching) to flag impersonation or suspicious behavior in real time."
  },
  {
    id: 24,
    question: "Is human oversight still needed?",
    answer: "Yes. Berribot is designed as a recruiter co-pilot — handling repetitive workflows while keeping final hiring decisions with your team."
  }
];

export default function FAQComponent() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const displayedFAQs = showAll ? faqData : faqData.slice(0, 10);

  return (
    <div className="w-full mb-12 ">
      <div className="w-full max-w-4xl mx-auto space-y-4 mt-10">
        {displayedFAQs.map((item) => (
          <div key={item.id} className="relative">
            {/* Question Container */}
            <motion.div
              className="bg-[#EAEFEF] rounded-2xl cursor-pointer relative z-10"
              initial={false}
              animate={{
                backgroundColor: expandedId === item.id ? "#EAEFEF" : "#EAEFEF"
              }}
              transition={{ duration: 0.3 }}
              onClick={() => toggleExpanded(item.id)}
              whileHover={{ 
                backgroundColor: expandedId === item.id ? "#EAEFEF" : "#d1d5db",
                scale: 1.01
              }}
            >
              <div className="p-6 flex justify-between items-center">
                <motion.h3
                  className="text-[24px] font-extralight font-inter flex-1 pr-4"
                  animate={{
                    color: expandedId === item.id ? "#3D3D3D94" : "#6b7280"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.question}
                </motion.h3>
                <motion.div
                  className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                  animate={{ 
                    rotate: expandedId === item.id ? 180 : 0,
                    color: expandedId === item.id ? "#3D3D3D94" : "#6b7280"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Answer Container - Behind but in document flow */}
            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -20 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.04, 0.62, 0.23, 0.98]
                  }}
                  className="overflow-hidden relative z-0 mt-[-25px]"
                >
                  <div className="flex justify-center pt-4">
                    <div className="w-4/5 bg-[#F4F4F4] rounded-2xl p-6 pt-8">
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="text-[#3D3D3D94] text-[24px] leading-relaxed font-inter font-extralight"
                      >
                        {item.answer.split('\n').map((line, index) => {
                          if (line.trim() === '') {
                            return <br key={index} />;
                          } else if (line.trim().startsWith('•')) {
                            return (
                              <div key={index} className="flex items-start mb-1">
                                <span className="mr-2 mt-1">•</span>
                                <span>{line.trim().substring(1).trim()}</span>
                              </div>
                            );
                          } else {
                            return (
                              <p key={index} className={index > 0 ? "mt-2" : ""}>
                                {line}
                              </p>
                            );
                          }
                        })}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        
        {/* Load More Button */}
        {!showAll && faqData.length > 10 && (
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={handleLoadMore}
              className="flex items-center justify-center w-16 h-16 bg-[#EAEFEF] rounded-full hover:bg-[#d1d5db] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-20">
        <h3 className="text-[#9CA3AF] text-[24px] font-extralight font-inter mb-4">
          Still curious?
        </h3>
        <p className="text-[#9CA3AF] text-[24px] font-extralight font-inter mb-8">
          Drop a message to <span className="font-normal">support@berribot.com</span>
        </p>
      </div>
    </div>
  );
}
