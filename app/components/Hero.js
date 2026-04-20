// app/components/Hero.js
"use client"; // Важно! Говорит Next.js, что этот компонент работает на клиенте
// Это нужно для анимаций (framer-motion) и интерактивности

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";

const Hero = () => {
  // Данные для Hero (чтобы легко менять текст в одном месте)
  const heroData = {
    greeting: "Всем привет, я",
    name: "Григорий",
    role: "JavaScript разработчик",
    description:
      "Создаю быстрые лендинги, Telegram Mini Apps и виджеты для бизнеса",
    buttons: {
      primary: {
        text: "Связаться",
        link: "#contact", // Якорная ссылка (будет вести к секции контактов)
      },
      secondary: {
        text: "Мои работы",
        link: "#portfolio",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden 
    bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg py-10 md:py-0">
      {/* Декоративный фон - анимированные круги */}
      <div className="absolute inset-0 w-full h-full">
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full !!!!!!!!!mix-blend-multiply!!!!!!!!!!!!!  filter blur-3xl opacity-60 animate-blob"></div> */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full  filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full  filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full  filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 md:px-6 z-10 rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ">
          {/* Левая колонка: Текст */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Приветствие с анимацией появления */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-purple-400 text-lg md:text-xl mb-4 font-medium"
            >
              {heroData.greeting}
            </motion.p>

            {/* Имя */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            >
              {heroData.name}
            </motion.h1>

            {/* Роль */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6"
            >
              {heroData.role}
            </motion.h2>

            {/* Описание */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {heroData.description}
            </motion.p>

            {/* Кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Основная кнопка */}
              <Link
                href={heroData.buttons.primary.link}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 text-center"
              >
                {heroData.buttons.primary.text}
              </Link>

              {/* Вторичная кнопка */}
              <Link
                href={heroData.buttons.secondary.link}
                className="px-8 py-3 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 text-center"
              >
                {heroData.buttons.secondary.text}
              </Link>
            </motion.div>
          </motion.div>

          {/* Правая колонка: Визуал (аватар/изображение) */}
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
                  src="/avatar1.jpg"
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

      {/* Кнопка "Вниз" (скролл к следующей секции) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link
          href="#services" // Будет вести к секции услуг
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm mb-2">Узнать больше</span>
          <FiArrowDown className="text-2xl animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
