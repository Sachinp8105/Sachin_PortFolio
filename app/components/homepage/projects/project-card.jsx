// @flow strict

import * as React from 'react';

function ProjectCard({ project }) {

  return (
    <div className="group relative w-full rounded-3xl p-[1px] bg-white/10 hover:bg-gradient-to-br hover:from-pink-500 hover:via-violet-600 hover:to-[#16f2b3] transition-all duration-700">
      
      {/* Inner Content Container */}
      <div className="relative bg-[#0d1224] rounded-[23px] overflow-hidden h-full">
        
        {/* Subtle Background Mesh */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(124,58,237,0.08),transparent_40%)]"></div>

        <div className="relative p-6 lg:p-12">
          {/* Top Info Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                {project.name}
              </h3>
              <p className="text-[#16f2b3] text-xs font-bold uppercase tracking-[0.3em]">
                {project.role}
              </p>
            </div>
            
            {/* Status Badge */}
            <div className="w-fit px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 font-medium">Production Ready</span>
            </div>
          </div>

          {/* Body Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <p className="text-slate-400 text-base lg:text-lg leading-relaxed group-hover:text-slate-200 transition-colors">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Column */}
            <div className="lg:col-span-4 lg:border-l lg:border-white/5 lg:pl-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Developed With</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {project.tools.map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 group/tag">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 group-hover/tag:bg-pink-500 transition-colors"></div>
                    <span className="text-sm font-semibold text-slate-300 group-hover/tag:text-white transition-colors">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Bar */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 to-violet-600 transition-all duration-700"></div>
      </div>
    </div>
  );
};

export default ProjectCard;