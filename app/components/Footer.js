// app/components/Footer.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiMail, FiPhone, FiGithub, FiCode } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Навигация (якорные ссылки)
  const navLinks = [
    { name: "Главная", href: "#hero" },
    { name: "Услуги", href: "#services" },
    { name: "Портфолио", href: "#portfolio" },
    { name: "Контакты", href: "#contact" },
    { name: "Справочная информация", href: "/legal" },
  ];

  // Социальные ссылки (замени на свои)
  const socialLinks = [
    {
      icon: <FiGithub />,
      href: "https://github.com/Shte324",
      label: "GitHub",
    },
    { icon: <FiCode />, href: "https://t.me/@FrigExp", label: "Telegram" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="w-full max-w-6xl mx-auto px-3 py-8 md:py-10">
        {/* Основная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Колонка 1: О себе */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">GeeRooWeb</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Создание лендингов, одностраничных сайтов-визиток, виджетов.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Колонка 2: Навигация */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Колонка 3: Контакты */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Контакты</h3>

            <Link href="/legal" className="text-gray-400 hover:text-white  mb-4 block">
              Справочная информация
            </Link>
            
            <div className="space-y-3">
              <a
                href="mailto:geerooland@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                <FiMail className="shrink-0" />
                <span>geerooland@gmail.com</span>
              </a>
              <a
                href="tel:+79991234567"
                className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                <FiPhone className="shrink-0" />
                <span>+7 (996) 223-10-16</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Нижняя полоса с копирайтом */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-xs md:text-sm">
            © {currentYear} Разработка веб приложений. Все права защищены.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-300"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-300"
            >
              Условия использования
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
