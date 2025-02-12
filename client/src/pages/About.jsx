import React from 'react';
import infoLogo from '../assets/info.png';
import { howItWorksSteps } from '../constents/aboutData';
import StepSection from '../components/AboutStepSection';

const About = () => {
    return (
      <div className="pt-28 mx-8 md:mx-16">
        {/* About Header */}
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white flex items-center gap-2 shadow-2px rounded-xl px-2">
            <img src={infoLogo} alt="Info" className="size-4" />
            <p className="text-sm font-medium">About</p>
          </div>
          <div className="w-1/2 text-center flex flex-col gap-4 my-5">
            <h1 className="text-3xl md:text-5xl font-bold">What YouCollab Does</h1>
            <p className="text-sm md:text-base font-medium text-gray-400">
              Empowering Seamless Video Collaboration Between YouTubers and Editors
            </p>
          </div>
        </div>
  
        {/* About Description */}
        <div className="bg-white flex flex-col md:flex-row items-center gap-5 rounded-xl shadow-2px px-8 md:px-16 py-10 my-5 md:my-10">
          <h3 className="text-lg font-semibold text-gray-500 text-center">
            YouCollab is a revolutionary SaaS platform designed to streamline every step of the video production process. It brings together YouTubers and professional video editors in one intuitive workspace, enabling a smooth, secure, and efficient workflow—from account creation to final video publication on YouTube.
          </h3>
        </div>
  
        {/* How It Works Section */}
        <div className="bg-white flex flex-col gap-5 rounded-xl shadow-2px px-8 md:px-16 py-10 my-5 md:my-10">
          <h1 className="font-bold text-2xl">How It Works</h1>
          {howItWorksSteps.map((step, idx) => (
            <StepSection key={idx} title={step.title} items={step.items} />
          ))}
        </div>
      </div>
    );
  };
  
  export default About;