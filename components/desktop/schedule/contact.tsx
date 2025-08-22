'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [demoMessage, setDemoMessage] = useState('');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle demo form submission logic here
    console.log({ fullName, companyName, workEmail, demoMessage });
  };

  return (
    <div className="flex justify-center p-8 max-w-4xl mx-auto font-inter">
      {/* Centered Demo Form */}
      <div className="w-full max-w-md">
        <div className="space-y-2 mb-36 text-center">
          <h2 className="text-[24px] font-normal text-teal-400">Cut the chase</h2>
          <p className="text-[24px] font-normal text-teal-400">and hop straight into a demo.</p>
        </div>
        
        <div className="mx-auto">
          {/* Demo Form */}
          <form onSubmit={handleDemoSubmit} className="space-y-8">
            {/* Full Name */}
            <div className="space-y-3">
              <label className="block text-white text-[20px] font-light">
                Full name:
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                className="w-full px-6 py-4 rounded-full bg-white/90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-3">
              <label className="block text-white text-[20px] font-light">
                Company Name:
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Blueberry Studios"
                className="w-full px-6 py-4 rounded-full bg-white/90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
              />
            </div>

            {/* Work Email */}
            <div className="space-y-3">
              <label className="block text-white text-[20px] font-light">
                Work Email:
              </label>
              <input
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="john@bbstudios.org"
                className="w-full px-6 py-4 rounded-full bg-white/90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
              />
            </div>

            {/* Message */}
            <div className="space-y-3">
              <label className="block text-white text-[20px] font-light">
                What can we do for you today?
              </label>
              <textarea
                value={demoMessage}
                onChange={(e) => setDemoMessage(e.target.value)}
                rows={6}
                placeholder="Hi,

I would like to request a walk-through and a demo of sorts to see how I could hire using Berri-Products?

Best,"
                className="w-full px-6 py-4 rounded-3xl bg-white/90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none text-lg leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#028374] text-white px-8 py-3 rounded-2xl font-medium hover:bg-[#4a847c] transition-colors text-[14px]"
              >
                Contact support
              </motion.button>
            </div>
          </form>

          {/* Support section */}
          <div className="text-center mt-8">
            <h3 className="text-black font-medium mb-4 text-[18px]">
              Looking for further support?
            </h3>
            <p className="text-black font-light text-[14px] leading-relaxed">
              Head over to our resources to find
              <br />
              <a 
                href="/resources" 
                className="font-bold underline text-black hover:text-[#00C7BEB2] transition-colors"
              >
                FAQs
              </a> or write to our support team <a 
                href="/resources" 
                className="font-bold underline text-black hover:text-[#00C7BEB2] transition-colors"
              >here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
