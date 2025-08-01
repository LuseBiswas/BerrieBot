export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 mt-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About BerriBot</h1>
        
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              BerriBot is revolutionizing the recruitment industry with cutting-edge AI technology. 
              We're making hiring faster, smarter, and fraud-free for companies worldwide.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose BerriBot?</h2>
            <ul className="text-gray-300 space-y-2">
              <li>• AI-powered candidate screening</li>
              <li>• Fraud detection and prevention</li>
              <li>• Streamlined interview process</li>
              <li>• Comprehensive analytics</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-300 leading-relaxed">
              Ready to transform your hiring process? Contact us today to see how BerriBot 
              can help you make your next 10,000 hires faster and smarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 