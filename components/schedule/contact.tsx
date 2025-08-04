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
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-teal-500 hover:bg-teal-600 text-white font-normal py-4 px-8 rounded-2xl transition-all duration-200 text-[14px]"
        >
          Contact support
        </button>
      </div>

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
