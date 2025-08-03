"use client";
import { useState } from "react";

import PrivacyPolicyComponent from "@/components/policy/privacy";
import HeroSection from "@/components/cookies/HeroSection";
import CookiesComponent from "@/components/cookies/cookies";

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
      <CookiesComponent state={privacyState} onStateChange={setPrivacyState} />
    </>
  );
} 