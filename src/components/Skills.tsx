import React from 'react';

const Skills = () => {
  // Mock data - replace with your actual skills
  const skills = [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
    'MongoDB', 'Mongoose', 'Python', 'AI/ML', 'OpenCV', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span key={index} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;