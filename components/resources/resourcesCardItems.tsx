import React from 'react';
import ResourceCard from './resourceCard';

const ResourcesCardItems: React.FC = () => {
  return (
    <div className="w-full bg-transparent py-16 px-8">
      {/* Description Section */}
      <div className="max-w-5xlxl mx-auto text-center mb-16">
        <p className="font-inter text-[20px] sm:text-2xl md:text-[32px] leading-[1.4] sm:leading-[1.5] font-light text-white max-w-5xl mx-auto">
          We've put together guides, case studies, templates, and tips to help you make 
          the most of your time, team, and tech.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-start gap-8">
          {/* Learn Card */}
          <ResourceCard
            image="/image/screenshot_2.png"
            title="Learn"
            description="You ask, We (and Berribot) Answers. Got questions? Browse through our Frequently Asked Questions."
            hoverButtonName="Learn More"
          />

          {/* Explore Card */}
          <ResourceCard
            image="/image/screenshot_2.png"
            title="Explore"
            description="Big ideas. Light read. Zero robot jargon. Welcome to the corner of the internet where brains meet bots—and both get smarter."
            hoverButtonName="Learn More"
          />

          {/* Case Studies Card */}
          <ResourceCard
            image="/image/screenshot_2.png"
            title="Case Studies"
            description="Real businesses. Real results. No fluff. See how teams are using Berribot to hire faster, cut admin work, and save a whole lot of sanity."
            hoverButtonName="Learn More"
          />
        </div>
      </div>
    </div>
  );
};

export default ResourcesCardItems;
