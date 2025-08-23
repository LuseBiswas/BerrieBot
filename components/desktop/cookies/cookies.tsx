'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface CookiesComponentProps {
  state: 'initial' | 'expanded' | 'confirmation';
  onStateChange?: (state: 'initial' | 'expanded' | 'confirmation') => void;
}

const CookiesComponent = ({ state, onStateChange }: CookiesComponentProps) => {
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Close if dragged down more than 100px
    if (info.offset.y > 100) {
      onStateChange?.('confirmation');
    }
  };

  const cookiesContent = `
Effective as of June 1st, 2020

What’s Actually Happening?
As you browse around, we (and some friendly third-party services we work with) may use cookies and similar tech tools to collect useful stuff like:
- What pages you visit
- Where you clicked
- What device you're using (phone? fridge? we never judge)
- Your browser type and settings
- Your IP address (aka your digital zip code)
- And other technical bits that help us improve your experience

This data lands in server logs (a.k.a. our robot diary) so we can make Berribot.com better every day—less bugs, more "wow this is smooth."
We pinky promise not to use it for anything shady.

Want to Take Control?

Totally fair. You can:

- Adjust your browser settings to block or delete cookies
- Use private or incognito mode when browsing
- Or just shoot us a note at support@berribot.com if you have questions, concerns, or want to know what data we’ve got on you

We’re all about transparency, not trickery.`;

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
                <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="prose prose-gray max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                    {cookiesContent.trim()}
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

export default CookiesComponent;
