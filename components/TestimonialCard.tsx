interface TestimonialCardProps {
  title: string;
  description: string;
  buttonText: string;
  variant: 'blue' | 'gray';
  icon?: React.ReactNode;
}

export default function TestimonialCard({ 
  title, 
  description, 
  buttonText, 
  variant,
  icon 
}: TestimonialCardProps) {
  const baseClasses = "rounded-[32px] p-8 relative overflow-hidden";
  const variantClasses = variant === 'blue' 
    ? "bg-[#6FB5B2]" 
    : "bg-gray-800/30 border border-gray-600/30";
  
  const textColor = variant === 'blue' ? "text-black" : "text-white";
  const buttonClasses = variant === 'blue'
    ? "bg-black text-white hover:bg-gray-800"
    : "bg-white/10 text-white border border-white/20 hover:bg-white/20";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {/* Background decorative circle */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10"></div>
      
      {/* Icon */}
      {icon && (
        <div className="mb-6">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className={`text-2xl sm:text-3xl font-inter font-[500] ${textColor} mb-4`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`${textColor} font-inter ${variant === 'blue' ? 'opacity-90' : 'opacity-80'} mb-8 leading-relaxed`}>
        {description}
      </p>

      {/* Button */}
      <button className={`${buttonClasses} font-inter font-[500] px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2`}>
        {buttonText}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
} 