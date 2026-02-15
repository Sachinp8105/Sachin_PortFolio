// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";

function HeroSection() {
  const skills = [
    "Java", "C++", "SQL", "SQLite", "Redis", 
    "Microservices", "Hibernate", "Docker", "REST API", "JWT"
  ];

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-30"
      />

      <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12 gap-y-12 w-full">
        {/* Left Side: Professional Intro */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            This is {' '}
            <span className="text-pink-500">{personalData.name}</span>
            {` , I'm a Professional `}
            <span className="text-[#16f2b3]">{personalData.designation}</span>
            .
          </h1>

          <div className="my-10 flex items-center gap-5">
            <Link href={personalData.github} target='_blank' className="transition-all text-pink-500 hover:scale-125 duration-300">
              <BsGithub size={30} />
            </Link>
            <Link href={personalData.linkedIn} target='_blank' className="transition-all text-pink-500 hover:scale-125 duration-300">
              <BsLinkedin size={30} />
            </Link>
            {/* <Link href={personalData.leetcode} target='_blank' className="transition-all text-pink-500 hover:scale-125 duration-300">
              <SiLeetcode size={30} />
            </Link> */}
          </div>

          <div className="flex items-center gap-3">
            <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300">
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full text-white font-medium uppercase tracking-wider flex items-center gap-2 hover:bg-transparent transition-all">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link href={personalData.resume} target="_blank" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-white font-medium uppercase tracking-wider transition-all hover:shadow-lg">
              <span>Get Resume</span>
              <MdDownload size={16} />
            </Link>
          </div>
        </div>

        {/* Right Side: Simple Visual Card (Non-Coding Design) */}
        <div className="order-1 lg:order-2 relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-600/20 blur-[100px] rounded-full"></div>
          
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Top Section */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl rotate-3">
                {personalData.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{personalData.name}</h3>
                <p className="text-[#16f2b3] font-medium tracking-wide">Available for Hire</p>
              </div>
            </div>

            {/* Middle Section: Clean Skill Tags */}
            <div className="mb-8">
              <p className="text-xs uppercase text-slate-500 font-bold tracking-[0.2em] mb-4">Core Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 font-medium hover:bg-white/10 hover:border-pink-500/50 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Section: Traits */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {['Smart Work', 'Fast Learner', 'Problem Solver'].map((trait) => (
                <div key={trait} className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">{trait.split(' ')[0]}</p>
                  <p className="text-xs text-white font-semibold">{trait.split(' ')[1] || 'Expert'}</p>
                </div>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute top-0 right-0 p-4">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;