'use client';

import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
      <div className="flex-1 text-center">
        <div className="space-y-2 mb-36">
          <h2 className="text-[24px] font-normal text-teal-400">Cut the chase</h2>
          <p className="text-[24px] font-normal text-teal-400">and hop straight into a demo.</p>
        </div>
        
        <div className="bg-[#EAEFEF] rounded-3xl p-8 shadow-lg" style={{ width: '497px', height: '592px' }}>
          {/* Header with profile and title */}
          <div className="flex items-center gap-4 mb-0">
            <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 flex-shrink-0"></div>
            <h3 className="text-[24px] font-inter font-extralight text-[#04BBA6]">Berri-Bot x Your team!</h3>
          </div>

          {/* Meeting details */}
          <div className="space-y-2 mb-2" style={{ paddingLeft: '66px' }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 border-2 border-teal-400 rounded-full flex items-center justify-center" style={{ marginLeft: '-2px' }}>
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              </div>
              <span className="text-teal-500 font-medium text-[14px]">30 mins</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 border-2 border-teal-400 rounded-md flex items-center justify-center" style={{ marginLeft: '-2px' }}>
                <div className="w-2 h-2 bg-teal-400 rounded-sm"></div>
              </div>
              <div>
                <div className="text-teal-500 font-medium text-[14px] ">Web conferencing details</div>
                <div className="text-teal-500 font-medium text-[14px]">provided upon confirmation</div>
              </div>
            </div>
          </div>

          {/* Calendar navigation */}
          <div className="ml-12 flex items-center gap-3 mb-1">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h4 className="text-[14px] font-medium text-teal-500">August 2025</h4>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Inner Calendar Container */}
          <div className="bg-white rounded-2xl p-4 mx-auto" style={{ width: '354px', height: '308px' }}>
            {/* Calendar grid */}
            <div className="mb-6">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center py-2 text-gray-600" style={{ fontSize: '12px' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar dates */}
              <div className="grid grid-cols-7 gap-1">
                {/* Previous month dates */}
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>30</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>31</div>
                
                {/* Current month dates */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                  const isSelected = date === 7;
                  const isHighlighted = [8, 9, 10, 14, 15, 16, 17, 22, 24].includes(date);
                  
                  return (
                    <button
                      key={date}
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-medium transition-colors
                        ${isSelected 
                          ? 'bg-teal-500 text-white' 
                          : isHighlighted 
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      style={{ fontSize: '12px' }}
                    >
                      {date}
                    </button>
                  );
                })}
                
                {/* Next month dates */}
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>1</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>2</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>3</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>4</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>5</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>6</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>7</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>8</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>9</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>10</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>11</div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-300" style={{ fontSize: '12px' }}>12</div>
              </div>
            </div>
          </div>

          {/* Time zone */}
          <div className="text-center mt-6 text-[11px]">
            <span className="text-teal-500 font-medium">Time Zone: </span>
            <span className="text-gray-600">UK, Ireland, Lisbon Time 11:00 AM</span>
            <button className="ml-2 text-gray-400 hover:text-gray-600">
              <svg className="w-2 h-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
