// app/components/LegalInfo.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const LegalInfo = () => {
  return (
    <section className="min-h-screen pt-24 px-4 bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Справочная информация
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 text-gray-300"
        >
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Владелец студии</h2>
            <p>ФИО: _________________________________</p>
            <p>ИНН: _________________________________</p>
            <p>Статус: Плательщик налога на профессиональный доход (самозанятый)</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Реквизиты для оплаты</h2>
            <p>Банк: _________________________________</p>
            <p>Номер счёта: _________________________________</p>
            <p>БИК: _________________________________</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Контакты для юридических вопросов</h2>
            <p>Email: _________________________________</p>
            <p>Телефон: _________________________________</p>
          </div>
        </motion.div>
        
        <Link 
          href="/" 
          className="inline-block mt-8 text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← На главную
        </Link>
      </div>
    </section>
  );
};

export default LegalInfo;