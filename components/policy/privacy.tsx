'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

const PrivacyPolicyComponent = () => {
  const [state, setState] = useState<'initial' | 'expanded' | 'confirmation'>('initial');

  const handleDragEnd = (event: any, info: PanInfo) => {
    // Close if dragged down more than 100px
    if (info.offset.y > 100) {
      setState('confirmation');
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
    <div className="relative py-16">
      <AnimatePresence mode="wait">
        {state === 'initial' && (
          // Initial Button State
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setState('expanded')}
              className="bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center text-gray-700 font-medium"
              style={{ width: '268px', height: '73px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Read Privacy Policy
            </motion.button>
          </motion.div>
        )}

        {state === 'expanded' && (
          // Bottom Sheet from Footer
          <motion.div
            key="bottomsheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              className="bg-white w-full h-[70vh] flex flex-col overflow-hidden shadow-2xl"
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

        {state === 'confirmation' && (
          // Confirmation State
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center space-y-8"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white text-center"
            >
              Did you definitely read it?
            </motion.h2>
            
            <div className="flex flex-col space-y-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setState('initial')}
                className="bg-white text-gray-800 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium min-w-[300px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Yes, take me back
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setState('expanded')}
                className="bg-gray-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-200 font-medium min-w-[300px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                No, now I'm worried that you'll quiz me, let me read that again!
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrivacyPolicyComponent;
