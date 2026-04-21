// app/components/Contact.js
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useOrder } from "../context/OrderContext";

const Contact = () => {
  const { selectedStyle, designOptions } = useOrder();
  
  // Состояния формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: ""
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  
  const [errors, setErrors] = useState({});

  // ТВОЙ КЛЮЧ WEB3FORMS (можешь заменить на свой)
  const WEB3FORMS_ACCESS_KEY = "e2ee8902-a299-4354-bbe1-31f60aa47bca";

  // Услуги для выпадающего списка
  const services = [
    { value: "", label: "Выберите услугу" },
    { value: "Лендинг", label: "Лендинг (от 15 000 ₽)" },
    { value: "Telegram Mini App", label: "Telegram Mini App (от 30 000 ₽)" },
    { value: "Чат-бот/автоматизация", label: "Чат-бот / автоматизация (от 20 000 ₽)" },
    { value: "Виджет/доработка", label: "Виджет / доработка (от 5 000 ₽)" },
    { value: "Другое", label: "Другое" }
  ];

  // Получаем название выбранного стиля
  const selectedStyleName = selectedStyle 
    ? designOptions.find(d => d.id === selectedStyle)?.title 
    : "Не выбран";

  // Валидация полей
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Введите имя";
        } else if (value.trim().length < 2) {
          newErrors.name = "Имя должно быть не короче 2 символов";
        } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
          newErrors.name = "Имя может содержать только буквы, пробел и дефис";
        } else {
          delete newErrors.name;
        }
        break;
        
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Введите телефон";
        } else {
          const digits = value.replace(/\D/g, "");
          if (digits.length < 10) {
            newErrors.phone = "Введите корректный номер (минимум 10 цифр)";
          } else {
            delete newErrors.phone;
          }
        }
        break;
        
      case "service":
        if (!value) {
          newErrors.service = "Выберите услугу";
        } else {
          delete newErrors.service;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Форматирование телефона при вводе
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    let formatted = "";
    
    if (value.length > 0) {
      formatted = "+7 ";
      if (value.length > 1) {
        if (value[0] === "7" || value[0] === "8") {
          value = value.slice(1);
        }
        if (value.length > 0) formatted += "(";
        if (value.length >= 1) formatted += value.slice(0, 3);
        if (value.length >= 4) formatted += ") " + value.slice(3, 6);
        if (value.length >= 7) formatted += "-" + value.slice(6, 8);
        if (value.length >= 9) formatted += "-" + value.slice(8, 10);
      }
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
    validateField("phone", formatted);
  };

  // Проверка всей формы перед отправкой
  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.name) &&
      formData.phone.replace(/\D/g, "").length >= 10 &&
      formData.service !== "" &&
      !status.loading
    );
  };

  // Отправка формы через Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Финальная валидация
    const nameValid = validateField("name", formData.name);
    const phoneValid = validateField("phone", formData.phone);
    const serviceValid = validateField("service", formData.service);
    
    if (!nameValid || !phoneValid || !serviceValid) {
      return;
    }
    
    setStatus({ loading: true, success: false, error: null });
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('style', selectedStyleName);
      formDataToSend.append('message', formData.message || 'Не указано');
      formDataToSend.append('_subject', `Новая заявка с портфолио от ${formData.name}`);
      formDataToSend.append('_captcha', 'false');
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", phone: "", service: "", message: "" });
        
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        throw new Error(result.message || 'Ошибка отправки');
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setStatus({ 
        loading: false, 
        success: false, 
        error: "Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую." 
      });
    }
  };

  // Контактные данные (ЗАМЕНИ НА СВОИ)
  const contacts = [
    { icon: <FiMail />, text: "alex@portfolio.ru", href: "mailto:alex@portfolio.ru" },
    { icon: <FiPhone />, text: "+7 (999) 123-45-67", href: "tel:+79991234567" },
    { icon: <FiMapPin />, text: "Москва, Россия / Удалённо", href: null }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 px-3 bg-slate-900">
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
            Свяжитесь со мной
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Оставьте заявку, и я отвечу в течение 24 часов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Левая колонка: Контакты */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-slate-800 rounded-xl p-6 md:p-8 h-full">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                Контактная информация
              </h3>
              
              <div className="space-y-5 mb-8">
                {contacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-lg shrink-0">
                      {contact.icon}
                    </div>
                    {contact.href ? (
                      <a 
                        href={contact.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm md:text-base break-all"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-gray-300 text-sm md:text-base">{contact.text}</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-white font-semibold mb-3">Время ответа</h4>
                <p className="text-gray-400 text-sm">
                  Обычно отвечаю в течение 2-3 часов в рабочее время
                </p>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка: Форма */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-6 md:p-8">
              
              {/* Сообщение об успешной отправке */}
              {status.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
                >
                  <FiCheckCircle className="text-green-500 text-xl shrink-0" />
                  <span className="text-green-400 text-sm">
                    Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.
                  </span>
                </motion.div>
              )}
              
              {/* Сообщение об ошибке */}
              {status.error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
                >
                  <FiAlertCircle className="text-red-500 text-xl shrink-0" />
                  <span className="text-red-400 text-sm">{status.error}</span>
                </motion.div>
              )}

              {/* Поле: Имя */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 text-sm mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all
                    ${errors.name 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-slate-700 focus:border-purple-500 focus:ring-purple-500/30'
                    }`}
                  placeholder="Иван Иванов"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Поле: Телефон */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-300 text-sm mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneInput}
                  className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all
                    ${errors.phone 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-slate-700 focus:border-purple-500 focus:ring-purple-500/30'
                    }`}
                  placeholder="+7 (___) ___-__-__"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Поле: Услуга */}
              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-300 text-sm mb-2">
                  Услуга *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer
                    ${errors.service 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-slate-700 focus:border-purple-500 focus:ring-purple-500/30'
                    }`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em' }}
                >
                  {services.map(s => (
                    <option key={s.value} value={s.value} className="bg-slate-800">
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                )}
              </div>

              {/* Выбранный стиль (информационное поле) */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">
                  Выбранный стиль
                </label>
                <div className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-gray-400 text-sm">
                  {selectedStyleName}
                  {!selectedStyle && " (не выбран — перейдите в раздел «Портфолио» выше)"}
                </div>
              </div>

              {/* Поле: Сообщение */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 text-sm mb-2">
                  Сообщение (необязательно)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                  placeholder="Опишите ваш проект или задайте вопрос..."
                />
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={!isFormValid() || status.loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300
                  ${isFormValid() && !status.loading
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]'
                    : 'bg-slate-700 cursor-not-allowed opacity-60'
                  }`}
              >
                {status.loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Отправить заявку
                  </>
                )}
              </button>
              
              <p className="text-gray-500 text-xs text-center mt-4">
                * Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;