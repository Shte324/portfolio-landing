// app/components/Header.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Отслеживаем прокрутку для изменения фона
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Закрываем мобильное меню при клике на ссылку
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Пункты навигации
  const navItems = [
    { name: "Главная", href: "#hero" },
    { name: "Услуги", href: "#services" },
    { name: "Портфолио", href: "#portfolio" },
    { name: "Контакты", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Логотип */}
          <Link
            href="#hero"
            className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-80 transition-opacity"
          >
            GeeRooWeb
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              Обсудить проект
            </Link>
          </nav>

          {/* Кнопка мобильного меню */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700"
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        {/* Мобильное меню */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="flex flex-col gap-3 pt-4 pb-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-gray-300 hover:text-white text-base font-medium py-2 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={handleLinkClick}
              className="mt-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-center"
            >
              Обсудить проект
            </Link>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;