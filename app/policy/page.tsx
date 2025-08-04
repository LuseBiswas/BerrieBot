"use client";
import { useState } from "react";
import HeroSection from "@/components/policy/HeroSection";
import PrivacyPolicyComponent from "@/components/policy/privacy";

export default function PolicyPage() {
  const [privacyState, setPrivacyState] = useState<'initial' | 'expanded' | 'confirmation'>('initial');

  const handleConfirmationChoice = (choice: 'back' | 'readAgain') => {
    if (choice === 'back') {
      setPrivacyState('initial');
    } else {
      setPrivacyState('expanded');
    }
  };

  const handleReadPrivacy = () => {
    setPrivacyState('expanded');
  };

  return (
    <>
      <HeroSection 
        showConfirmationText={privacyState === 'confirmation'} 
        onConfirmationChoice={handleConfirmationChoice}
        onReadPrivacy={handleReadPrivacy}
      />
      <PrivacyPolicyComponent state={privacyState} onStateChange={setPrivacyState} />
    </>
  );
} 