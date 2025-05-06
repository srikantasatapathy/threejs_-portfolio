import React from 'react';

const Experience = () => {
  // Mock data - replace with your actual experience
  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      duration: 'Jan 2021 - Present',
      description: 'Developed and maintained web applications using the MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    },
    // Add more experiences if needed
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
        <div className="max-w-2xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm dark:border-gray-700">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-md font-medium text-gray-600 dark:text-gray-400">{exp.company} | {exp.duration}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;