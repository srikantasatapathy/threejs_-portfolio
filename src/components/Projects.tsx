import React from 'react';
import Image from 'next/image'; // Import Image component

const Projects = () => {
  // Mock data - replace with your actual projects
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce site built with Next.js, MongoDB, and Stripe.',
      imageUrl: '/placeholder-project1.png', // Replace with actual image path in /public
      link: '#', // Replace with actual project link
    },
    {
      title: 'AI Image Recognition App',
      description: 'A Python-based application using OpenCV for real-time object detection.',
      imageUrl: '/placeholder-project2.png', // Replace with actual image path in /public
      link: '#', // Replace with actual project link
    },
    // Add more projects
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="border rounded-lg shadow-sm overflow-hidden dark:border-gray-700">
              {/* Use placeholder image or actual image */}
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 relative">
                 {/* Example using placeholder color, replace with Image component later */}
                 {/* <Image src={project.imageUrl} alt={project.title} layout="fill" objectFit="cover" /> */}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;