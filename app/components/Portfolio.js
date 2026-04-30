

// app/components/Portfolio.js
"use client";

import { motion } from "framer-motion";
import { FiEye, FiCheck } from "react-icons/fi";
import { useOrder, designOptions } from "../context/OrderContext";

const Portfolio = () => {
  const { selectedStyle, setSelectedStyle } = useOrder();

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

  // Обработчик выбора стиля
  const handleSelectStyle = (styleId) => {
    setSelectedStyle(styleId === selectedStyle ? null : styleId);
  };

  return (
    <section id="portfolio" className="pt-6 pb-16 md:pt-8 md:pb-20 px-3 bg-slate-900">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Выберите стиль для вашего лендинга
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Три популярных направления дизайна. Каждый можно адаптировать под ваш бренд
          </p>
          
          {/* Индикатор выбранного стиля */}
          {selectedStyle && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-purple-400 text-sm mt-3"
            >
              ✓ Выбран стиль «{designOptions.find(d => d.id === selectedStyle)?.title}». 
              Будет указан в заявке автоматически
            </motion.p>
          )}
        </motion.div>

        {/* Карточки с вариантами */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {designOptions.map((design) => (
            <motion.div
              key={design.id}
              variants={cardVariants}
              className={`group relative bg-slate-800 rounded-xl overflow-visible border transition-all duration-300 cursor-pointer
                ${selectedStyle === design.id 
                  ? 'border-purple-500 shadow-lg shadow-purple-500/30 ring-1 ring-purple-500/50' 
                  : 'border-slate-700 hover:border-slate-600'
                }`}
              onClick={() => handleSelectStyle(design.id)}
            >
              {/* Градиентная полоска сверху */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${design.color}`}></div>
              
              {/* Изображение-заглушка */}
              <div className="relative h-40 sm:h-44 bg-slate-700   overflow-visible">
                <div className={`absolute inset-0 bg-gradient-to-br ${design.color} opacity-20`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/30">
                    {design.title[0]}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FiEye className="text-white text-2xl" />
                </div>
                {selectedStyle === design.id && (
                  <div className="absolute -top-6 right-10 bg-green-500 rounded-full p-1.5 shadow-lg">
                    <FiCheck className="text-black text-lg" />
                  </div>
                )}
              </div>

              {/* Контент карточки */}
              <div className="p-4">
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

                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-lg font-bold text-white">
                    {design.title}
                  </h3>
                  <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {design.price}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  {design.description}
                </p>

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

        {/* Призыв к действию */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-gray-400 text-sm mb-4">
            {selectedStyle 
              ? "Отлично! Теперь заполните форму ниже, и мы свяжемся с вами для обсуждения деталей..."
              : "Выберите подходящий стиль и заполните форму обратной связи"
            }
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-sm"
          >
            {selectedStyle ? "Заполнить заявку" : "Выбрать и продолжить"}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;