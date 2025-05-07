import React from 'react';

const Certificates = () => {
  // Mock data - replace with your actual certificates
  const certificates = [
    {
      title: 'MERN Stack Certification',
      issuer: 'Online Course Platform',
      date: 'Dec 2020',
      link: '#', // Link to certificate if available
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'Coursera',
      date: 'Jun 2022',
      link: '#',
    },
    // Add more certificates
  ];

  return (
    <section id="certificates" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Certificates</h2>
        <div className="max-w-2xl mx-auto">
          {certificates.map((cert, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm dark:border-gray-700">
              <h3 className="text-lg font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer} - {cert.date}</p>
              {cert.link && cert.link !== '#' && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-[#ff6d33] hover:underline text-sm">
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;