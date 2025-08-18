'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(7);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Available time slots
  const timeSlots = ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
  };

  // Calendar navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    setSelectedDate(null); // Clear selection when navigating
  };

  // Get calendar data
  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of current month
    const firstDay = new Date(year, month, 1);
    
    // Start date (might be from previous month)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Generate all dates for the calendar grid
    const dates = [];
    const current = new Date(startDate);
    
    // Generate 42 dates (6 weeks)
    for (let i = 0; i < 42; i++) {
      dates.push({
        date: current.getDate(),
        month: current.getMonth(),
        year: current.getFullYear(),
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === new Date().toDateString()
      });
      current.setDate(current.getDate() + 1);
    }
    
    return {
      monthName: firstDay.toLocaleDateString('en-US', { month: 'long' }),
      year: year,
      dates: dates
    };
  };

  const calendarData = getCalendarData();

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

      {/* Right Side - Calendar and Time Selection */}
      <div className="flex-1 text-center">
        <div className="space-y-2 mb-36">
          <h2 className="text-[24px] font-normal text-teal-400">Cut the chase</h2>
          <p className="text-[24px] font-normal text-teal-400">and hop straight into a demo.</p>
        </div>
        
        <div className="flex gap-4 justify-center">
          {/* Calendar - Always Visible */}
          <div className="bg-[#EAEFEF] rounded-3xl p-8 shadow-lg" style={{ width: '497px', height: '592px' }}>
            {/* Header with profile and title */}
            <div className="flex items-center gap-4 mb-0">
              <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 flex-shrink-0"></div>
              <h3 className="text-[24px] font-inter font-extralight text-[#04BBA6]">Berri-Bot x Your team!</h3>
            </div>

            {/* Meeting details */}
            <div className="space-y-2 mb-2" style={{ paddingLeft: '66px' }}>
              <div className="flex items-center gap-3">
                <Image 
                  src="/image/icons/stopwatch.png" 
                  alt="Duration" 
                  width={16}
                  height={16}
                  className="w-4 h-4" 
                  style={{ marginLeft: '0px' }}
                />
                <span className="text-teal-500 font-medium text-[14px]">30 mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Image 
                  src="/image/icons/web.png" 
                  alt="Web conferencing" 
                  width={16}
                  height={16}
                  className="w-4 h-4" 
                  style={{ marginLeft: '0px' }}
                />
                <div>
                  <div className="text-teal-500 font-medium text-[14px]">Web conferencing details</div>
                  <div className="text-teal-500 font-medium text-[14px]">provided upon confirmation</div>
                </div>
              </div>
            </div>

            {/* Calendar navigation */}
            <div className="ml-12 flex items-center gap-3 mb-1">
              <motion.button 
                onClick={() => navigateMonth('prev')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.h4 
                key={`${calendarData.monthName}-${calendarData.year}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[14px] font-medium text-teal-500"
              >
                {calendarData.monthName} {calendarData.year}
              </motion.h4>
              <motion.button 
                onClick={() => navigateMonth('next')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
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
                  {calendarData.dates.map((dateObj, index) => {
                    const isSelected = selectedDate === dateObj.date && dateObj.isCurrentMonth;
                    const isHighlighted = dateObj.isCurrentMonth && [8, 9, 10, 14, 15, 16, 17, 22, 24].includes(dateObj.date);
                    
                    if (dateObj.isCurrentMonth) {
                      return (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setSelectedDate(dateObj.date);
                            setSelectedTime(null); // Reset selected time when date changes
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-8 h-8 flex items-center justify-center rounded-full font-medium transition-colors cursor-pointer
                            ${isSelected 
                              ? 'bg-teal-500 text-white' 
                              : isHighlighted 
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          style={{ fontSize: '12px' }}
                        >
                          {dateObj.date}
                        </motion.button>
                      );
                    } else {
                      return (
                        <div 
                          key={index}
                          className="w-8 h-8 flex items-center justify-center text-gray-300" 
                          style={{ fontSize: '12px' }}
                        >
                          {dateObj.date}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            {/* Time zone */}
            <div className="text-center mt-6 text-[11px]">
              <span className="text-teal-500 font-medium">Time Zone: </span>
              <span className="text-gray-600">UK, Ireland, Lisbon Time 11:00 AM</span>
              <button className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg className="w-2 h-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Time Selection Component - Appears when date is selected */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-[#EAEFEF] rounded-3xl p-4 shadow-lg relative" 
                style={{ width: '206px', height: '592px' }}
              >
                {/* Selected Date Display */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-center mb-6"
                >
                  <h3 className="text-[18px] font-medium text-teal-500">
                    {selectedDate} {calendarData.monthName} {calendarData.year}
                  </h3>
                </motion.div>

                {/* Time Slots */}
                <div className="space-y-3">
                  {timeSlots.map((time, index) => (
                    <motion.div 
                      key={time}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                      className="relative"
                    >
                      <motion.button
                        onClick={() => setSelectedTime(time)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 rounded-2xl font-medium text-sm transition-all cursor-pointer bg-white text-gray-800 hover:bg-gray-100"
                      >
                        {time}
                      </motion.button>
                      {/* Schedule Button extends outside to the right */}
                      <AnimatePresence>
                        {selectedTime === time && (
                          <motion.div 
                            initial={{ opacity: 0, x: -20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10"
                          >
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-full transition-all cursor-pointer text-sm whitespace-nowrap"
                            >
                              Schedule
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Contact;
