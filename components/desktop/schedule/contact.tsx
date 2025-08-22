'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [demoMessage, setDemoMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle demo form submission logic here
    console.log({ fullName, companyName, workEmail, demoMessage });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-8 max-w-7xl mx-auto font-inter">
      {/* Left Side - Form */}
      <div className="flex-1 space-y-8">
        <div className="space-y-2 mb-36">
          <h2 className="text-[24px] font-normal text-teal-400">Not in a rush?</h2>
          <p className="text-[24px] font-normal text-teal-400">Fill out the form</p>
        </div>

        <div className="flex lg:flex-row flex-col gap-12">
          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-8 flex-1">
            {/* Name Input */}
            <div className="space-y-3">
              <label htmlFor="name" className="block text-white text-[20px] font-light">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white/90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                placeholder="Deva"
              />
            </div>

            {/* Work Email Input */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-white text-[20px] font-light">
                Work Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white/90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                placeholder="Deva@rkant.com"
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-3">
              <label htmlFor="message" className="block text-white text-[20px] font-light">
                What can we do for you today?
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-6 py-4 rounded-3xl bg-white/90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none text-lg leading-relaxed"
                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              />
            </div>
          </form>

          {/* Grey Divider - positioned to align with form fields */}
          <div className="w-px bg-gray-500 hidden lg:block"></div>
          <div className="h-px bg-gray-500 lg:hidden"></div>
        </div>

        {/* Submit Button - outside the divider area */}
        <motion.button
          type="submit"
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-teal-500 hover:bg-teal-600 text-white font-normal py-4 px-8 rounded-2xl transition-all duration-200 text-[14px]"
        >
          Contact support
        </motion.button>
      </div>

      {/* Right Side - Demo Form */}
      <div className="flex-1">
        <div className="space-y-2 mb-36">
          <h2 className="text-[24px] font-normal text-teal-400">Cut the chase</h2>
          <p className="text-[24px] font-normal text-teal-400">and hop straight into a demo.</p>
        </div>
        
        <div className="max-w-md mx-auto">
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
