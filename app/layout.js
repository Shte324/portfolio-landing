import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "./context/OrderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 
export const metadata = {
  title: "GeeRooWeb | web-разработка ,разработка лендингов , сайтов-визиток, веб-приложений",
  description: "Разрабатываем быстрые лендинги, Telegram Mini Apps и виджеты для бизнеса. Работаем удалённо по всей России.",
  keywords: "разработка лендингов, создание сайтов-визиток, веб-разработка, виджеты",
  openGraph: {
    title: "GeeRooWeb | JavaScript разработка",
    description: "Создаю быстрые лендинги и виджеты",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <OrderProvider>   {/* ОБОРАЧИВАЕМ */}
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
