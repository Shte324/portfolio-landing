

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";

const Hero = () => {
  const heroData = {
    greeting: "Веб-студия",
    name: "GeeRooWeb",
    role: "Создаём лендинги и веб-приложения",
    description: "Разрабатываем быстрые сайты, Telegram Mini Apps и виджеты для малого бизнеса. Берём вашу идею и превращаем в работающий инструмент продаж",
    buttons: {
      primary: {
        text: "Обсудить проект",
        link: "#contact"
      },
      secondary: {
        text: "Наши работы",
        link: "#portfolio"
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br 
                                  from-slate-900 via-purple-900 to-slate-900 rounded-xl">
     
{/* Блок с изометрической орбитой */}
<div className="absolute inset-0 w-full h-full overflow-hidden">
  
  {/* Сами кружки на орбите */}
  <div className="absolute w-full h-full">
    
    {/* Кружок 1: Красный (лидер) */}
    <div 
      className="absolute w-72 h-72 bg-red-500 rounded-full filter blur-3xl opacity-60"
      style={{
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'orbit 12s linear infinite'
      }}
    />

    {/* Кружок 2: Синий (второй, отстает на треть периода) */}
    <div 
      className="absolute w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-20"
      style={{
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'orbit 12s linear infinite',
        animationDelay: '-4s' 
      }}
    />

    {/* Кружок 3: Розовый (третий, отстает на две трети) */}
    <div 
      className="absolute w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-20"
      style={{
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'orbit 12s linear infinite',
        animationDelay: '-8s'
      }}
    />

  </div>
</div>

      <div className="w-full max-w-7xl mx-auto px-3 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-purple-400 text-base md:text-xl mb-2 md:mb-4 font-medium"
            >
              {heroData.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4"
            >
              {heroData.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 md:mb-6"
            >
              {heroData.role}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-300 text-base md:text-xl mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <Link
                href={heroData.buttons.primary.link}
                className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 text-center text-sm md:text-base"
              >
                {heroData.buttons.primary.text}
              </Link>

              <Link
                href={heroData.buttons.secondary.link}
                className="px-6 md:px-8 py-2.5 md:py-3 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 text-center text-sm md:text-base"
              >
                {heroData.buttons.secondary.text}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
           <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Декоративная рамка */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
              <div className="absolute inset-1 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <Image
                  src="/sitesign.jpg"
                  alt="Фото профиля"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <Link
          href="#services"
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm mb-2">Что мы предлагаем</span>
          <FiArrowDown className="text-2xl animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
