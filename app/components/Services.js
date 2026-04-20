"use client";

import { motion } from "framer-motion";
import { 
  FiZap, 
  FiLayout, 
  FiMessageCircle, 
  FiSmartphone 
} from "react-icons/fi";

const Services = () => {
  // Данные услуг (легко редактировать)
  const services = [
    {
      icon: <FiZap className="text-3xl" />,
      title: "Быстрые лендинги",
      description: "Одностраничные сайты с анимацией, формой связи и картой. Оптимизация под мобильные и скорость 90+ PageSpeed.",
      price: "от 15 000 ₽",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiSmartphone className="text-3xl" />,
      title: "Telegram Mini Apps",
      description: "Приложения внутри Telegram: запись, каталог, корзина. Уведомления владельцу, админка в Google Sheets.",
      price: "от 30 000 ₽",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiMessageCircle className="text-3xl" />,
      title: "Чат-боты и автоматизация",
      description: "Боты для Max, VK, Telegram. Интеграция с CRM, рассылки, приём заказов без менеджера.",
      price: "от 20 000 ₽",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiLayout className="text-3xl" />,
      title: "Виджеты и доработки",
      description: "Калькуляторы, модальные окна, ленивая загрузка. Установка на существующие сайты и CMS.",
      price: "от 5 000 ₽",
      color: "from-orange-500 to-red-500"
    }
  ];

  // Настройки анимации контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // задержка между появлением карточек
      }
    }
  };

  // Настройки анимации одной карточки
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className="py-20 px-3 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Чем я могу быть полезен
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Специализируюсь на создании быстрых и удобных решений, которые помогают бизнесу 
            автоматизировать процессы и привлекать клиентов
          </p>
        </motion.div>

        {/* Сетка карточек услуг */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-slate-600"
            >
              {/* Градиентная полоска сверху при наведении */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Иконка */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} p-3 mb-5 text-white`}>
                {service.icon}
              </div>
              
              {/* Заголовок услуги */}
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              
              {/* Описание */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              
              {/* Цена и тег "под заказ" */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                <span className="text-white font-bold text-lg">
                  {service.price}
                </span>
                <span className="text-xs px-3 py-1 bg-slate-700 text-gray-300 rounded-full group-hover:bg-slate-600 transition-colors">
                  под заказ
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            * Точная стоимость зависит от сложности проекта и дополнительных пожеланий
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;