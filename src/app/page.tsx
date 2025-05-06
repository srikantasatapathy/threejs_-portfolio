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

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center relative"> {/* Added relative positioning */}
      {/* Navigation would typically go here */}
      <Navbar /> {/* Add the Navbar component here */}

      {/* Hero Section */}
      {/* Added relative positioning and overflow-hidden */}
      <section id="hero" className="min-h-screen w-full flex items-center justify-center text-center px-4 relative overflow-hidden">
         {/* <HeroCanvas />  */}
         <HeroCanvas1 />
         <div className="z-10"> {/* Ensure text is above the canvas */}
           <h1 className="text-4xl md:text-6xl font-bold mb-4">Srikant Satapathy</h1>
           <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">MERN Full Stack Developer</p>
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