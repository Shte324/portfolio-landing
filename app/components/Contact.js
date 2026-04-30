// app/components/Contact.js
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useOrder } from "../context/OrderContext";

const Contact = () => {
  const { selectedStyle, designOptions, setSelectedStyle } = useOrder();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const [errors, setErrors] = useState({});

  const [offerAccepted, setOfferAccepted] = useState(false);
  const [personalDataAccepted, setPersonalDataAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const WEB3FORMS_ACCESS_KEY = "e2ee8902-a299-4354-bbe1-31f60aa47bca";

  const services = [
    { value: "", label: "Выберите услугу" },
    { value: "Лендинг", label: "Лендинг (от 15 000 ₽)" },
    { value: "Telegram Mini App", label: "Telegram Mini App (от 30 000 ₽)" },
    {
      value: "Чат-бот/автоматизация",
      label: "Чат-бот / автоматизация (от 20 000 ₽)",
    },
    { value: "Виджет/доработка", label: "Виджет / доработка (от 5 000 ₽)" },
    { value: "Другое", label: "Другое" },
  ];

  const selectedStyleName = selectedStyle
    ? designOptions.find((d) => d.id === selectedStyle)?.title
    : "Не выбран";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

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

    setFormData((prev) => ({ ...prev, phone: formatted }));
    validateField("phone", formatted);
  };

  const handleOfferChange = (e) => {
    setOfferAccepted(e.target.checked);
  };

  const handlePersonalDataChange = (e) => {
    setPersonalDataAccepted(e.target.checked);
  };

  const handleMarketingChange = (e) => {
    setMarketingAccepted(e.target.checked);
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.name) &&
      formData.phone.replace(/\D/g, "").length >= 10 &&
      formData.service !== "" &&
      !status.loading &&
      offerAccepted &&
      personalDataAccepted
    );
  };

  // Отправка формы через Web3Forms (ЧИСТАЯ ВЕРСИЯ)
   // Отправка формы через Web3Forms (МАКСИМАЛЬНО ПРОСТАЯ ВЕРСИЯ)
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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
      formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("service", formData.service);
      formDataToSend.append("style", selectedStyleName);
      formDataToSend.append("message", formData.message || "Не указано");
      formDataToSend.append("offer_accepted", offerAccepted ? "Да" : "Нет");
      formDataToSend.append("personal_data_accepted", personalDataAccepted ? "Да" : "Нет");
      formDataToSend.append("marketing_accepted", marketingAccepted ? "Да" : "Нет");
      formDataToSend.append("_subject", `Новая заявка на лендинг от ${formData.name}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      // ← САМЫЙ ПРОСТОЙ СПОСОБ: проверяем только статус
      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", phone: "", service: "", message: "" });
        setOfferAccepted(false);
        setPersonalDataAccepted(false);
        setMarketingAccepted(false);
        setSelectedStyle(null);

        setTimeout(() => {
          setStatus((prev) => ({ ...prev, success: false }));
        }, 5000);
      } else {
        throw new Error("Ошибка сервера");
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: "Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую.",
      });
    }
  };

  const contacts = [
    {
      icon: <FiMail />,
      text: "geerooland@gmail.com",
      href: "mailto:geerooland@gmail.com",
    },
    { icon: <FiPhone />, text: "+7 (996) 223-10-16", href: "tel:+79962231016" },
    { icon: <FiMapPin />, text: "Москва, Россия / Удалённо", href: null },
  ];

  return (
    <section id="contact" className="pt-6 pb-16 md:pt-8 md:pb-20 px-3 bg-slate-900">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Оставьте заявку, и вам ответят в течение 24 часов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
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
                      <span className="text-gray-300 text-sm md:text-base">
                        {contact.text}
                      </span>
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
                    Заявка успешно отправлена! Свяжемся с вами в ближайшее время.
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
                      ? "border-red-500 focus:ring-red-500/30"
                      : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/30"
                    }`}
                  placeholder="Ваше имя"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
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
                      ? "border-red-500 focus:ring-red-500/30"
                      : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/30"
                    }`}
                  placeholder="+7 (___) ___-__-__"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
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
                      ? "border-red-500 focus:ring-red-500/30"
                      : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/30"
                    }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5em",
                  }}
                >
                  {services.map((s) => (
                    <option key={s.value} value={s.value} className="bg-slate-800">
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
              </div>

              {/* Выбранный стиль */}
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
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]"
                    : "bg-slate-700 cursor-not-allowed opacity-60"
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

              {/* Чекбокс: Оферта + ПД */}
              <div className="flex items-start gap-2 mt-4 mb-4">
                <input
                  type="checkbox"
                  id="offer-accept"
                  name="offer-accept"
                  required
                  checked={offerAccepted}
                  onChange={handleOfferChange}
                  className="mt-1 w-5 h-5 accent-purple-500 cursor-pointer"
                />
                <label htmlFor="offer-accept" className="text-sm text-gray-300 cursor-pointer">
                  Я принимаю условия{" "}
                  <a href="/oferta" target="_blank" className="text-purple-400 hover:underline">
                    Публичной оферты
                  </a>{" "}
                  и даю{" "}
                  <a href="/privacy" target="_blank" className="text-purple-400 hover:underline">
                    согласие на обработку персональных данных
                  </a>
                </label>
              </div>

              {/* Чекбокс: Только ПД (второй) */}
              <div className="flex items-start gap-2 mt-4 mb-4">
                <input
                  type="checkbox"
                  id="personal-data-accept"
                  name="personal-data-accept"
                  required
                  checked={personalDataAccepted}
                  onChange={handlePersonalDataChange}
                  className="mt-1 w-4 h-4 accent-purple-500 cursor-pointer"
                />
                <label htmlFor="personal-data-accept" className="text-sm text-gray-300 cursor-pointer">
                  Я даю{" "}
                  <a href="/privacy" target="_blank" className="text-purple-400 hover:underline">
                    согласие на обработку персональных данных
                  </a>
                </label>
              </div>

              {/* Чекбокс: Маркетинг */}
              <div className="flex items-start gap-2 mt-4 mb-4">
                <input
                  type="checkbox"
                  id="marketing-accept"
                  name="marketing-accept"
                  required
                  checked={marketingAccepted}
                  onChange={handleMarketingChange}
                  className="mt-1 w-4 h-4 accent-purple-500 cursor-pointer"
                />
                <label htmlFor="marketing-accept" className="text-sm text-gray-300 cursor-pointer">
                  Я даю{" "}
                  <a href="/marketing" target="_blank" className="text-purple-400 hover:underline">
                    согласие на получение информационных рассылок
                  </a>
                </label>
              </div>

              {errors.privacy && (
                <p className="text-red-400 text-xs mt-1">{errors.privacy}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// // app/components/Contact.js
// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import {
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiSend,
//   FiCheckCircle,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { useOrder } from "../context/OrderContext";

// const Contact = () => {
//   const { selectedStyle, designOptions, setSelectedStyle } = useOrder(); // ← ИЗМЕНЕНО: добавлен setSelectedStyle в деструктуризацию

//   // Состояния формы
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     service: "",
//     message: "",
//   });

//   const [status, setStatus] = useState({
//     loading: false,
//     success: false,
//     error: null,
//   });

//   const [errors, setErrors] = useState({});

// //   const [privacyAccepted, setPrivacyAccepted] = useState(false);
//   // Три отдельных состояния
//   const [offerAccepted, setOfferAccepted] = useState(false); // для оферты
//   const [personalDataAccepted, setPersonalDataAccepted] = useState(false); // для ПДн
//   const [marketingAccepted, setMarketingAccepted] = useState(false); // для рассылки (опционально)

//   // ТВОЙ КЛЮЧ WEB3FORMS (можешь заменить на свой)
//   const WEB3FORMS_ACCESS_KEY = "e2ee8902-a299-4354-bbe1-31f60aa47bca";

//   // Услуги для выпадающего списка
//   const services = [
//     { value: "", label: "Выберите услугу" },
//     { value: "Лендинг", label: "Лендинг (от 15 000 ₽)" },
//     { value: "Telegram Mini App", label: "Telegram Mini App (от 30 000 ₽)" },
//     {
//       value: "Чат-бот/автоматизация",
//       label: "Чат-бот / автоматизация (от 20 000 ₽)",
//     },
//     { value: "Виджет/доработка", label: "Виджет / доработка (от 5 000 ₽)" },
//     { value: "Другое", label: "Другое" },
//   ];

//   // Получаем название выбранного стиля
//   const selectedStyleName = selectedStyle
//     ? designOptions.find((d) => d.id === selectedStyle)?.title
//     : "Не выбран";

//   // Валидация полей
//   const validateField = (name, value) => {
//     const newErrors = { ...errors };

//     switch (name) {
//       case "name":
//         if (!value.trim()) {
//           newErrors.name = "Введите имя";
//         } else if (value.trim().length < 2) {
//           newErrors.name = "Имя должно быть не короче 2 символов";
//         } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
//           newErrors.name = "Имя может содержать только буквы, пробел и дефис";
//         } else {
//           delete newErrors.name;
//         }
//         break;

//       case "phone":
//         if (!value.trim()) {
//           newErrors.phone = "Введите телефон";
//         } else {
//           const digits = value.replace(/\D/g, "");
//           if (digits.length < 10) {
//             newErrors.phone = "Введите корректный номер (минимум 10 цифр)";
//           } else {
//             delete newErrors.phone;
//           }
//         }
//         break;

//       case "service":
//         if (!value) {
//           newErrors.service = "Выберите услугу";
//         } else {
//           delete newErrors.service;
//         }
//         break;

//       default:
//         break;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Обработчик изменения полей
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   // Форматирование телефона при вводе
//   const handlePhoneInput = (e) => {
//     let value = e.target.value.replace(/\D/g, "");
//     let formatted = "";

//     if (value.length > 0) {
//       formatted = "+7 ";
//       if (value.length > 1) {
//         if (value[0] === "7" || value[0] === "8") {
//           value = value.slice(1);
//         }
//         if (value.length > 0) formatted += "(";
//         if (value.length >= 1) formatted += value.slice(0, 3);
//         if (value.length >= 4) formatted += ") " + value.slice(3, 6);
//         if (value.length >= 7) formatted += "-" + value.slice(6, 8);
//         if (value.length >= 9) formatted += "-" + value.slice(8, 10);
//       }
//     }

//     setFormData((prev) => ({ ...prev, phone: formatted }));
//     validateField("phone", formatted);
//   };

//   // Обработчик чекбокса согласия
//    const handleOfferChange = (e) => {
//     setOfferAccepted(e.target.checked);
//   };

//   const handlePersonalDataChange = (e) => {
//     setPersonalDataAccepted(e.target.checked);
//   };

//   const handleMarketingChange = (e) => {
//     setMarketingAccepted(e.target.checked);
//   };


//   // Проверка всей формы перед отправкой
//   const isFormValid = () => {
//     return (
//       formData.name.trim().length >= 2 &&
//       /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.name) &&
//       formData.phone.replace(/\D/g, "").length >= 10 &&
//       formData.service !== "" &&
//       !status.loading &&
//       offerAccepted  &&
//       personalDataAccepted
//       //   && marketingAccepted- delayed
//     );
//   };

//   // Отправка формы через Web3Forms
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();

// //     // Финальная валидация
// //     const nameValid = validateField("name", formData.name);
// //     const phoneValid = validateField("phone", formData.phone);
// //     const serviceValid = validateField("service", formData.service);

// //     if (!nameValid || !phoneValid || !serviceValid) {
// //       return;
// //     }

// //     setStatus({ loading: true, success: false, error: null });

// //     try {
// //       const formDataToSend = new FormData();
// //       formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
// //       formDataToSend.append("name", formData.name);
// //       formDataToSend.append("phone", formData.phone);
// //       formDataToSend.append("service", formData.service);
// //       formDataToSend.append("style", selectedStyleName);
// //       formDataToSend.append("message", formData.message || "Не указано");
// //       formDataToSend.append("offer_accepted", offerAccepted ? "да" : "нет");
// //       formDataToSend.append(
// //         "personal_data_accepted",
// //         personalDataAccepted ? "да" : "нет",
// //       );
// //       formDataToSend.append(
// //         "marketing_accepted",
// //         marketingAccepted ? "да" : "нет",
// //       );
// //       formDataToSend.append(
// //         "_subject",
// //         `Новая заявка на лендинг от ${formData.name}`,
// //       );

// //       const response = await fetch("https://api.web3forms.com/submit", {
// //         method: "POST",
// //         body: formDataToSend,
// //       });
      

// //       // ← ИЗМЕНЕНО: парсим ответ через text() с защитным try/catch
// //       const text = await response.text();
// //       let result;



// //       try {
// //         result = JSON.parse(text);
// //       } catch (parseError) {
// //         // Если сервер вернул не JSON, но статус OK — считаем успехом
// //         if (response.ok) {
// //           result = { success: true };
// //         } else {
// //           throw new Error("Сервер вернул некорректный ответ");
// //         }
// //       }

// //       // ← ИЗМЕНЕНО: если статус OK и success не false — считаем успехом
// //       if (response.ok && result.success !== false) {
// //         result.success = true;
// //       }

// //       if (result.success === true) {
// //         setStatus({ loading: false, success: true, error: null });
// //         setFormData({ name: "", phone: "", service: "", message: "" });
// //         setPersonalDataAccepted(false);
// //         setOfferAccepted(false);
// //         setMarketingAccepted(false);
// //         setSelectedStyle(null);

// //         setTimeout(() => {
// //           setStatus((prev) => ({ ...prev, success: false }));
// //         }, 5000);
// //       } else {
// //         throw new Error(result.message || "Ошибка отправки");
// //       }
// //     } catch (error) {
// //       setStatus({
// //         loading: false,
// //         success: false,
// //         error:
// //           "Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую.",
// //       });
// //     }
// //   };


// // Отправка формы через Web3Forms
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   console.log("1. Форма отправлена"); // ПРОВЕРКА 1

//   // Финальная валидация
//   const nameValid = validateField("name", formData.name);
//   const phoneValid = validateField("phone", formData.phone);
//   const serviceValid = validateField("service", formData.service);

//   if (!nameValid || !phoneValid || !serviceValid) {
//     console.log("2. Валидация не пройдена");
//     return;
//   }

//   console.log("3. Валидация пройдена, начинаем отправку");

//   setStatus({ loading: true, success: false, error: null });

//   try {
//     console.log("4. Создаем FormData");
//     const formDataToSend = new FormData();
//     formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("phone", formData.phone);
//     formDataToSend.append("service", formData.service);
//     formDataToSend.append("style", selectedStyleName);
//     formDataToSend.append("message", formData.message || "Не указано");
//     formDataToSend.append("offer_accepted", offerAccepted ? "Да" : "Нет");
//     formDataToSend.append("personal_data_accepted", personalDataAccepted ? "Да" : "Нет");
//     formDataToSend.append("marketing_accepted", marketingAccepted ? "Да" : "Нет");
//     formDataToSend.append(
//       "_subject",
//       `Новая заявка на лендинг от ${formData.name}`,
//     );

//     // console.log("5. Отправляем запрос на Web3Forms");
//     const response = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       body: formDataToSend,
//     });


// //============================
// // const API_KEY = "6kz7t473m4ez7agxfjpowpjdbb9d8gpx7tkkjfke";
// // const RECIPIENT_EMAIL = "geerooland@gmail.com";

// // // ВАЖНО: Узнайте ваш дата-центр (go1 или go2) в личном кабинете Unisender
// // // Зайдите в Настройки -> API и посмотрите URL
// // const API_URL = "https://go2.unisender.ru/ru/transactional/api/v1/send";  

// // const requestBody = {
// //     api_key: API_KEY,
// //     to: [{ email: RECIPIENT_EMAIL }],
// //     from_email: "info@unisender.com", // Технический адрес, пока можно так
// //     subject: `Новая заявка от ${formData.name}`,
// //     body: {
// //         html: `<p>Имя: ${formData.name}</p><p>Телефон: ${formData.phone}</p><p>Услуга: ${formData.service}</p><p>Сообщение: ${formData.message || 'Не указано'}</p>`,
// //         plaintext: `Имя: ${formData.name}\nТелефон: ${formData.phone}\nУслуга: ${formData.service}\nСообщение: ${formData.message || 'Не указано'}`
// //     }
// // };

// // const response = await fetch(API_URL, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },  // Важно: JSON, а не form-urlencoded
// //     body: JSON.stringify(requestBody)
// // });

// // const result = await response.json();

// // if (response.ok && result.status === 'success') {
// //     // Успех!
// // }

// console.log("5. Отправляем запрос на Web3Forms");
//     const response = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       body: formDataToSend,
//     });

//     console.log("6. Получен ответ, статус:", response.status);
//     const text = await response.text();
//     let result;
//     try {
//       result = JSON.parse(text);
//     } catch (parseError) {
//       if (response.ok) {
//         result = { success: true };
//       } else {
//         throw new Error("Сервер вернул некорректный ответ");
//       }
//     }

//     if (response.ok && result.success !== false) {
//       result.success = true;
//     }

//     if (result.success === true) {
//       console.log("7. Успех!");
//       setStatus({ loading: false, success: true, error: null });
//       setFormData({ name: "", phone: "", service: "", message: "" });
//       setOfferAccepted(false);
//       setPersonalDataAccepted(false);
//       setMarketingAccepted(false);
//       setSelectedStyle(null);

//       setTimeout(() => {
//         setStatus((prev) => ({ ...prev, success: false }));
//       }, 5000);
//     } else {
//       throw new Error(result.message || "Ошибка отправки");
//     }
    
//   } catch (error) {
//     console.error("8. Ошибка в catch:", error);
//     setStatus({
//       loading: false,
//       success: false,
//       error: "Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую.",
//     });
//   }
// };
// //============================



//     console.log("6. Получен ответ, статус:", response.status);
    
//     // ПРОСТАЯ ОБРАБОТКА - всегда считаем успехом, если статус 200
//     if (response.status === 200) {
//       console.log("7. Успех! Статус 200");
//       setStatus({ loading: false, success: true, error: null });
      
//       // Сброс формы
//       setFormData({ name: "", phone: "", service: "", message: "" });
//       setOfferAccepted(false);
//       setPersonalDataAccepted(false);
//       setMarketingAccepted(false);
//       setSelectedStyle(null);

//       setTimeout(() => {
//         setStatus((prev) => ({ ...prev, success: false }));
//       }, 5000);
//     } else {
//       console.log("7. Ошибка, статус не 200:", response.status);
//       throw new Error(`Ошибка сервера: ${response.status}`);
//     }
    
//   } catch (error) {
//     console.error("8. Ошибка в catch:", error);
//     setStatus({
//       loading: false,
//       success: false,
//       error: "Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую.",
//     });
//   }
// };



//   // Контактные данные (ЗАМЕНИ НА СВОИ)
//   const contacts = [
//     {
//       icon: <FiMail />,
//       text: "geerooland@gmail.com",
//       href: "mailto:geerooland@gmail.com",
//     },
//     { icon: <FiPhone />, text: "+7 (996) 223-10-16", href: "tel:+79962231016" },
//     { icon: <FiMapPin />, text: "Москва, Россия / Удалённо", href: null },
//   ];

//   return (
//     <section
//       id="contact"
//       className="pt-6 pb-16 md:pt-8 md:pb-20 px-3 bg-slate-900"
//     >
//       <div className="w-full max-w-6xl mx-auto">
//         {/* Заголовок секции */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12 md:mb-10"
//         >
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
//             Свяжитесь с нами
//           </h2>
//           <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
//             Оставьте заявку, и вам ответят в течение 24 часов
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
//           {/* Левая колонка: Контакты */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="bg-slate-800 rounded-xl p-6 md:p-8 h-full">
//               <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
//                 Контактная информация
//               </h3>

//               <div className="space-y-5 mb-8">
//                 {contacts.map((contact, idx) => (
//                   <div key={idx} className="flex items-center gap-4">
//                     <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-lg shrink-0">
//                       {contact.icon}
//                     </div>
//                     {contact.href ? (
//                       <a
//                         href={contact.href}
//                         className="text-gray-300 hover:text-white transition-colors text-sm md:text-base break-all"
//                       >
//                         {contact.text}
//                       </a>
//                     ) : (
//                       <span className="text-gray-300 text-sm md:text-base">
//                         {contact.text}
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-slate-700 pt-6">
//                 <h4 className="text-white font-semibold mb-3">Время ответа</h4>
//                 <p className="text-gray-400 text-sm">
//                   Обычно отвечаю в течение 2-3 часов в рабочее время
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Правая колонка: Форма */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <form
//               onSubmit={handleSubmit}
//               className="bg-slate-800 rounded-xl p-6 md:p-8"
//             >
//               {/* Сообщение об ошибке */}
//               {status.error && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
//                 >
//                   <FiAlertCircle className="text-red-500 text-xl shrink-0" />
//                   <span className="text-red-400 text-sm">{status.error}</span>
//                 </motion.div>
//               )}

//               {/* Поле: Имя */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-gray-300 text-sm mb-2"
//                 >
//                   Ваше имя *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all
//                     ${
//                       errors.name
//                         ? "border-red-500 focus:ring-red-500/30"
//                         : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/30"
//                     }`}
//                   placeholder="Ваше имя"
//                 />
//                 {errors.name && (
//                   <p className="text-red-400 text-xs mt-1">{errors.name}</p>
//                 )}
//               </div>

//               {/* Поле: Телефон */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="phone"
//                   className="block text-gray-300 text-sm mb-2"
//                 >
//                   Телефон *
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handlePhoneInput}
//                   className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all
//                     ${
//                       errors.phone
//                         ? "border-red-500 focus:ring-red-500/30"
//                         : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/30"
//                     }`}
//                   placeholder="+7 (___) ___-__-__"
//                 />
//                 {errors.phone && (
//                   <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
//                 )}
//               </div>

//               {/* Поле: Услуга */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="service"
//                   className="block text-gray-300 text-sm mb-2"
//                 >
//                   Услуга *
//                 </label>
//                 <select
//                   id="service"
//                   name="service"
//                   value={formData.service}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer
//                     ${
//                       errors.service
//                         ? "border-red-500 focus:ring-red-500/30"
//                         : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/30"
//                     }`}
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "right 0.75rem center",
//                     backgroundSize: "1.5em",
//                   }}
//                 >
//                   {services.map((s) => (
//                     <option
//                       key={s.value}
//                       value={s.value}
//                       className="bg-slate-800"
//                     >
//                       {s.label}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.service && (
//                   <p className="text-red-400 text-xs mt-1">{errors.service}</p>
//                 )}
//               </div>

//               {/* Выбранный стиль (информационное поле) */}
//               <div className="mb-4">
//                 <label className="block text-gray-300 text-sm mb-2">
//                   Выбранный стиль
//                 </label>
//                 <div className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-gray-400 text-sm">
//                   {selectedStyleName}
//                   {!selectedStyle &&
//                     " (не выбран — перейдите в раздел «Портфолио» выше)"}
//                 </div>
//               </div>

//               {/* Поле: Сообщение */}
//               <div className="mb-6">
//                 <label
//                   htmlFor="message"
//                   className="block text-gray-300 text-sm mb-2"
//                 >
//                   Сообщение (необязательно)
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
//                   placeholder="Опишите ваш проект или задайте вопрос..."
//                 />
//               </div>

//               {/* Кнопка отправки */}
//               <button
//                 type="submit"
//                 disabled={!isFormValid() || status.loading}
//                 className={`w-full py-3 px-6 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300
//                   ${
//                     isFormValid() && !status.loading
//                       ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]"
//                       : "bg-slate-700 cursor-not-allowed opacity-60"
//                   }`}
//               >
//                 {status.loading ? (
//                   <>
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Отправка...
//                   </>
//                 ) : (
//                   <>
//                     <FiSend />
//                     Отправить заявку
//                   </>
//                 )}
//               </button>
//               {/* Сообщение об успешной отправке */}
//               {status.success && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
//                 >
//                   <FiCheckCircle className="text-green-500 text-xl shrink-0" />
//                   <span className="text-green-400 text-sm">
//                     Заявка успешно отправлена! Свяжемся с вами в ближайшее
//                     время.
//                   </span>
//                 </motion.div>
//               )}

//               <div className="flex items-start gap-2 mt-4 mb-4">
//                 <input
//                   type="checkbox"
//                   id="offer-accept"
//                   name="offer-accept"
//                   required
//                   checked={offerAccepted}
//                   onChange={handleOfferChange}
//                   className="mt-1 w-5 h-5 accent-purple-500 cursor-pointer"
//                 />
//                 <label
//                   htmlFor="offer-accept"
//                   className="text-sm text-gray-300 cursor-pointer"
//                 >
//                   Я принимаю условия{" "}
//                   <a
//                     href="/oferta"
//                     target="_blank"
//                     className="text-purple-400 hover:underline"
//                   >
//                     Публичной оферты
//                   </a>{" "}
//                   я даю согласие на{" "}
//                   <a
//                     href="/privacy"
//                     target="_blank"
//                     className="text-purple-400 hover:underline"
//                   >
//                     обработку персональных данных
//                   </a>
//                 </label>
//               </div>
//               <hr />
//               <div className="flex items-start gap-2 mt-4 mb-4">
//                 <input
//                   type="checkbox"
//                   id="personal-data-accept"
//                   name="personal-data-accept"
//                   required
//                    checked={personalDataAccepted}
//                   onChange={handlePersonalDataChange}
//                   className="mt-1 w-4 h-4 accent-purple-500 cursor-pointer"
//                 />
//                 <label
//                   htmlFor="personal-data-accept"
//                   className="text-sm text-gray-300 cursor-pointer"
//                 >
//                   я даю{" "}
//                   <a
//                     href="/privacy"
//                     target="_blank"
//                     className="text-purple-400 hover:underline"
//                   >
//                     согласие на обработку персональных данных
//                   </a>
//                 </label>
//               </div>
//               <hr />
//               <div className="flex items-start gap-2 mt-4 mb-4">
//                 <input
//                   type="checkbox"
//                   id="marketing-accept"
//                   name="marketing-accept"
//                   required
//                   checked={marketingAccepted}
//                   onChange={handleMarketingChange}
//                   className="mt-1 w-4 h-4 accent-purple-500 cursor-pointer"
//                 />
//                 <label
//                   htmlFor="marketing-accept"
//                   className="text-sm text-gray-300 cursor-pointer"
//                 >
//                   я даю{" "}
//                   <a
//                     href="/marketing" //  to do
//                     target="_blank"
//                     className="text-purple-400 hover:underline"
//                   >
//                     согласие на обработку персональных данных
//                   </a>
//                 </label>
//               </div>

//               {errors.privacy && (
//                 <p className="text-red-400 text-xs mt-1">{errors.privacy}</p>
//               )}
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
