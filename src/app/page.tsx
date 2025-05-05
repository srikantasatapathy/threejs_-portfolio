"use client"
import Image from "next/image";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import HeroCanvas from "@/components/HeroCanvas"; // Import the new canvas component
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection"; // Import the new wrapper
import HeroCanvas1 from "@/components/HeroCanvas1";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center relative">
      <Navbar />

      <section id="hero" className="min-h-screen w-full flex items-center justify-center text-center px-4 relative overflow-hidden">
         <HeroCanvas1 />
         <div className="z-10">
           <h1 className="text-4xl md:text-6xl font-bold mb-4">
             Srikant <span className="text-[#ff6d33]">Satapathy</span>
           </h1>
           <TypeAnimation
             sequence={[
               'MERN',
               1000,
               'MERN Full Stack Developer',
               2000,
               ' ',
               1000,
             ]}
             wrapper="p"
             speed={50}
             className="text-xl md:text-2xl text-gray-700 dark:text-gray-300"
             repeat={Infinity}
             cursor={true}
           />
         </div>
      </section>

      {/* Wrap sections with AnimatedSection */}
      {/* Pass w-full to the wrapper */}
      <AnimatedSection className="w-full">
        <About />
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <Skills />
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <Experience />
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <Projects />
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <Certificates />
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <Contact />
      </AnimatedSection>

      {/* Footer would typically go here */}
    </main>
  );
}