'use client';

import React, { useState, useEffect } from 'react';
import { trackDemoFormSubmission, trackDemoFormStart } from '@/utils/analytics';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [demoMessage, setDemoMessage] = useState('');
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  // Load lord-icon script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleFormStart = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackDemoFormStart('desktop');
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    trackDemoFormSubmission('desktop');

    // Simulate form processing delay
    setTimeout(() => {
      setShowSuccessScreen(true);
      // Clear form
      setFullName('');
      setCompanyName('');
      setWorkEmail('');
      setDemoMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  // Success Screen Component
  if (showSuccessScreen) {
    return (
      <div className="bg-white py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          {/* Thank you pill */}
          <div className="mb-8 flex justify-center">
            <div 
              className="bg-[#028374] text-white px-6 py-2 rounded-full font-medium flex items-center justify-center"
              style={{
                fontSize: '16px',
                fontFamily: 'Manrope, sans-serif'
              }}
            >
              Thank you
            </div>
          </div>

          {/* Animated Icon */}
          <div className="mb-8 flex justify-center">
            <div 
              dangerouslySetInnerHTML={{
                __html: `<lord-icon
                  src="https://cdn.lordicon.com/ohcuigqh.json"
                  trigger="loop"
                  style="width:250px;height:250px">
                </lord-icon>`
              }}
            />
          </div>

          {/* Main Heading */}
          <h2 
            className="text-black font-medium mb-6"
            style={{
              fontSize: '24px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.4'
            }}
          >
            Thanks for scheduling<br />a demo with us!
          </h2>

          {/* First Subheading */}
          <p 
            className="text-black font-light mb-4"
            style={{
              fontSize: '20px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.5'
            }}
          >
            We can&apos;t wait to show you how Berribot makes hiring faster, smarter, and more human.
          </p>

          {/* Second Subheading */}
          <p 
            className="text-black font-light"
            style={{
              fontSize: '20px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.5'
            }}
          >
            Our team will be in touch shortly with all the details you need to join your personalized session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* About you pill */}
        <div className="mb-8 flex justify-center">
          <div 
            className="bg-[#028374] text-white px-6 py-2 rounded-full font-medium flex items-center justify-center"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            About you
          </div>
        </div>

        {/* Form description */}
        <div className="text-center mb-12">
          <p 
            className="text-black font-medium"
            style={{
              fontSize: '20px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.4'
            }}
          >
            Fill out our form to let us know,
            <br />
            how we can help you today.
          </p>
        </div>
        
        <div className="mx-auto">
          {/* Demo Form */}
          <form onSubmit={handleDemoSubmit} className="space-y-8">
            {/* Full Name */}
            <div className="space-y-3">
              <label className="block text-black text-[18px] font-medium text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Full name:
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onFocus={handleFormStart}
                  placeholder="John Smith"
                  className="bg-gray-200 rounded-2xl px-4 py-4 text-gray-600 placeholder-gray-500 border-none outline-none"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    width: '285px',
                    height: '41px'
                  }}
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-3">
              <label className="block text-black text-[18px] font-medium text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Company Name:
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Blueberry Studios"
                  className="bg-gray-200 rounded-2xl px-4 py-4 text-gray-600 placeholder-gray-500 border-none outline-none"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    width: '285px',
                    height: '41px'
                  }}
                />
              </div>
            </div>

            {/* Work Email */}
            <div className="space-y-3">
              <label className="block text-black text-[18px] font-medium text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Work Email:
              </label>
              <div className="flex justify-center">
                <input
                  type="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="john@bbstudios.org"
                  className="bg-gray-200 rounded-2xl px-4 py-4 text-gray-600 placeholder-gray-500 border-none outline-none"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    width: '285px',
                    height: '41px'
                  }}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <label className="block text-black text-[18px] font-medium text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                What can we do for you today?
              </label>
              <div className="flex justify-center">
                <textarea
                  value={demoMessage}
                  onChange={(e) => setDemoMessage(e.target.value)}
                  placeholder="Hi,

I would like to request a walk-through and a demo of sorts to see how I could hire using Berri-Products?

Best,"
                  className="bg-gray-200 rounded-2xl px-4 py-4 text-gray-600 placeholder-gray-500 border-none outline-none resize-none"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    width: '287px',
                    height: '252px'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-2xl font-medium transition-colors ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#028374] hover:bg-[#4a847c]'
                } text-white`}
                style={{
                  fontSize: '16px',
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Contact support'}
              </button>
            </div>
          </form>

          {/* Support section */}
          <div className="text-center mt-12">
            <h3 
              className="text-black font-medium mb-4"
              style={{
                fontSize: '20px',
                fontFamily: 'Manrope, sans-serif'
              }}
            >
              Looking for further support?
            </h3>
            <p 
              className="text-black font-light"
              style={{
                fontSize: '16px',
                fontFamily: 'Manrope, sans-serif',
                lineHeight: '1.5'
              }}
            >
              Head over to our resources to find
              <br />
              <a 
                href="/resources" 
                className="font-bold underline text-black hover:text-[#00C7BEB2] transition-colors"
              >
                FAQs
              </a> or write to our support team <a 
                href="mailto:support@berribot.com" 
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
