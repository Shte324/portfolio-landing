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
  title: "Григорий | JavaScript разработчик",
  description: "Создаю быстрые лендинги и виджеты для бизнеса. Разработка на Next.js и Node.js.",
  keywords: "javascript разработчик, next.js, react, фрилансер, лендинг, виджеты",
  authors: [{ name: "Григорий" }],
  openGraph: {
    title: "Григорий | JavaScript разработчик",
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
