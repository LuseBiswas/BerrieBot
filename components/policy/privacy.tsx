'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface PrivacyPolicyComponentProps {
  state: 'initial' | 'expanded' | 'confirmation';
  onStateChange?: (state: 'initial' | 'expanded' | 'confirmation') => void;
}

const PrivacyPolicyComponent = ({ state, onStateChange }: PrivacyPolicyComponentProps) => {
  const handleDragEnd = (event: any, info: PanInfo) => {
    // Close if dragged down more than 100px
    if (info.offset.y > 100) {
      onStateChange?.('confirmation');
    }
  };

  const privacyContent = `
Effective as of June 1st, 2020

Introductory Considerations

On 25 May 2018, the new General Data Protection Regulation (GDPR – General Data Protection Regulation) came into force. The objective of the Regulation is to provide further protection to personal data, defined as "any information concerning an identified or identifiable natural person (so-called Data Subject)". This Privacy Policy provides users of this site with clear and detailed information on the processing of their data according to the General Data Protection Regulation and the Personal Data Protection Code. In particular, by consulting this document, the reader will have the possibility to confer the set of data collected, the methods of their use, and the rights at his disposal regarding the protection of sensitive data.

A reference to "Berribot," "we," or "us" is a reference to Berribot Pvt Limited or Berribot India Pvt Ltd and its relevant affiliates involved in the processing of your Personal Data as required for the provision of the requested Berribot services and/or products.

For any information or notification regarding privacy, please refer to the company email support@berribot.com.

Data collected through the website

If you as an end-user are using our Website, then you have directly engaged with Berribot.
• In such cases, we are acting as a data controller, and we as Berribot are collecting and processing your personal information.
• In such cases, we are responsible for data collection, processing and protection in accordance with data protection laws.

The information that we may collect are as follows:

1. Email ID
2. Name
3. Phone number
4. Country, state, city
5. Current employer, your role
6. Your IP address, and its derived geographic location
7. Your device info – type, device identifier
8. Your Website usage – Pages accessed, time spent
9. Other technical information

We may collect the above information in the following ways:
• When you fill out forms on our website
• When you subscribe to our newsletters
• When you contact us through our website
• When you use our chat features
• Through cookies and similar tracking technologies
• Through third-party analytics services

Your rights under GDPR:
• Right to access your personal data
• Right to rectify inaccurate data
• Right to erase your data
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Right to withdraw consent

Data retention:
We retain your personal data for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.

Contact us:
If you have any questions about this Privacy Policy or our data practices, please contact us at support@berribot.com.
`;

  return (
    <>
      {/* Content Sheet - appears below footer in document flow */}
      <AnimatePresence>
        {state === 'expanded' && (
          <motion.div
            key="contentsheet"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "-23vh", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full bg-white relative z-[100] -mb-[23vh]"
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              className="w-full h-[70vh] flex flex-col overflow-hidden shadow-2xl"
              style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
            >
              {/* Gray Capsule for Dragging */}
              <div className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Header */}
              <div className="px-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="prose prose-gray max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                    {privacyContent.trim()}
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrivacyPolicyComponent;
