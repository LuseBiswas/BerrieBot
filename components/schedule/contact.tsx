'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';

const Calendar = dynamic(() => import('react-calendar'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Value>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-6xl mx-auto">
      {/* Left Side - Form */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Not in a rush?</h2>
          <p className="text-xl text-white">Fill out the form</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          {/* Work Email Input */}
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
              Work Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              placeholder="Enter your work email"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
              What can we do for you today?
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
              placeholder="Tell us how we can help you..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Contact support
          </button>
        </form>
      </div>

      {/* Grey Divider */}
      <div className="w-px bg-gray-400 hidden lg:block"></div>
      <div className="h-px bg-gray-400 lg:hidden"></div>

      {/* Right Side - Calendar */}
      <div className="flex-1">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full border-none"
            tileClassName="hover:bg-teal-100 focus:bg-teal-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
