// app/context/OrderContext.js
"use client";

import { createContext, useContext, useState } from "react";

// Создаём контекст
const OrderContext = createContext();

// Данные о стилях (выносим отдельно, чтобы использовать везде)
export const designOptions = [
  {
    id: "modern",
    title: "Современный",
    description: "Градиенты, анимации, тёмная тема. Идеально для IT и digital-услуг",
    features: ["Анимации Framer Motion", "Тёмная тема", "Градиентные акценты"],
    color: "from-purple-500 to-pink-500",
    tags: ["IT", "Digital", "Стартап"],
    price: "от 20 000 ₽"
  },
  {
    id: "minimal",
    title: "Минимализм",
    description: "Чистый дизайн, много воздуха, акцент на контент. Подходит для экспертов и консультантов",
    features: ["Светлая тема", "Чёткая типографика", "Минимум декора"],
    color: "from-gray-500 to-slate-700",
    tags: ["Эксперт", "Консалтинг", "Услуги"],
    price: "от 15 000 ₽"
  },
  {
    id: "business",
    title: "Бизнес",
    description: "Строгий стиль, синие тона, доверие и надёжность. Для B2B и корпоративных клиентов",
    features: ["Синяя гамма", "Геометричные формы", "Акцент на цифры"],
    color: "from-blue-600 to-indigo-700",
    tags: ["B2B", "Корпоративный", "Финансы"],
    price: "от 25 000 ₽"
  }
];

// Провайдер контекста
export function OrderProvider({ children }) {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // для будущего использования

  return (
    <OrderContext.Provider value={{
      selectedStyle,
      setSelectedStyle,
      selectedService,
      setSelectedService,
      designOptions
    }}>
      {children}
    </OrderContext.Provider>
  );
}

// Хук для использования контекста
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
}