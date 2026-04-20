"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiEye, FiCheck } from "react-icons/fi";
import { useState } from "react";

const Portfolio = () => {
  // Состояние для отслеживания выбранного варианта (для демонстрации)
  const [selectedStyle, setSelectedStyle] = useState(null);

  // Данные о вариантах дизайна
  const designs = [
    {
      id: "modern",
      title: "Современный",
      description: "Градиенты, анимации, тёмная тема. Идеально для IT и digital-услуг",
      image: "/design-modern.jpg", // заменишь на свои скриншоты
      features: ["Анимации Framer Motion", "Тёмная тема", "Градиентные акценты"],
      color: "from-purple-500 to-pink-500",
      tags: ["IT", "Digital", "Стартап"]
    },
    {
      id: "minimal",
      title: "Минимализм",
      description: "Чистый дизайн, много воздуха, акцент на контент. Подходит для экспертов и консультантов",
      image: "/design-minimal.jpg",
      features: ["Светлая тема", "Чёткая типографика", "Минимум декора"],
      color: "from-gray-500 to-slate-700",
      tags: ["Эксперт", "Консалтинг", "Услуги"]
    },
    {
      id: "business",
      title: "Бизнес",
      description: "Строгий стиль, синие тона, доверие и надёжность. Для B2B и корпоративных клиентов",
      image: "/design-business.jpg",
      features: ["Синяя гамма", "Геометричные формы", "Акцент на цифры"],
      color: "from-blue-600 to-indigo-700",
      tags: ["B2B", "Корпоративный", "Финансы"]
    }
  ];

  // Анимация для карточек
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="portfolio" className="py-16 md:py-20 px-3 bg-slate-900">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Выберите стиль для вашего лендинга
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Три популярных направления дизайна. Каждый можно адаптировать под ваш бренд — 
            цвета, шрифты, анимации
          </p>
        </motion.div>

        {/* Карточки с вариантами */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {designs.map((design) => (
            <motion.div
              key={design.id}
              variants={cardVariants}
              className={`group relative bg-slate-800 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer
                ${selectedStyle === design.id 
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                  : 'border-slate-700 hover:border-slate-600'
                }`}
              onClick={() => setSelectedStyle(design.id)}
            >
              {/* Градиентная полоска сверху */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${design.color}`}></div>
              
              {/* Изображение-заглушка (заменишь на свои скриншоты) */}
              <div className="relative h-40 sm:h-44 bg-slate-700 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${design.color} opacity-20`}></div>
                
                {/* Временная заглушка вместо картинки */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/30">
                    {design.title[0]}
                  </span>
                </div>
                
                {/* Иконка "посмотреть" при наведении */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FiEye className="text-white text-2xl" />
                </div>

                {/* Метка "выбрано" */}
                {selectedStyle === design.id && (
                  <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
                    <FiCheck className="text-white text-sm" />
                  </div>
                )}
              </div>

              {/* Контент карточки */}
              <div className="p-4">
                {/* Теги */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {design.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-slate-700 text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Заголовок */}
                <h3 className="text-lg font-bold text-white mb-1.5">
                  {design.title}
                </h3>
                
                {/* Описание */}
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  {design.description}
                </p>

                {/* Особенности */}
                <ul className="space-y-1">
                  {design.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${design.color} mt-1.5 shrink-0`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Пояснение */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-xs md:text-sm mt-8"
        >
          * Это демо-варианты. Финальный дизайн разрабатывается индивидуально с учётом вашего бренда
        </motion.p>
      </div>
    </section>
  );
};

export default Portfolio;