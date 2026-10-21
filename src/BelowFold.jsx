import { useEffect } from 'react';
import FloatingUI from './components/layout/FloatingUI';
import Footer from './components/layout/Footer';
import AIForImpact from './components/sections/AIForImpact';
import DonateBand from './components/sections/DonateBand';
import FocusStack from './components/sections/FocusStack';
import GetInvolved from './components/sections/GetInvolved';
import ImpactSoFar from './components/sections/ImpactSoFar';
import Labs from './components/sections/Labs';
import Mission2030 from './components/sections/Mission2030';
import Partners from './components/sections/Partners';
import Pathway from './components/sections/Pathway';
import Programmes from './components/sections/Programmes';
import Stories from './components/sections/Stories';
import WhyDifferent from './components/sections/WhyDifferent';
import WhyWeExist from './components/sections/WhyWeExist';
import { ScrollTrigger } from './lib/motion';
import { markSectionsReady } from './lib/ready';

// Everything after the hero ships as its own chunk and renders right after first paint.
export default function BelowFold() {
  useEffect(() => {
    ScrollTrigger.refresh();
    markSectionsReady();
  }, []);

  return (
    <>
      <Mission2030 />
      <WhyWeExist />
      <Pathway />
      <Programmes />
      <FocusStack />
      <Labs />
      <AIForImpact />
      <WhyDifferent />
      <ImpactSoFar />
      <Stories />
      <Partners />
      <GetInvolved />
      <DonateBand />
      <Footer />
      <FloatingUI />
    </>
  );
}
