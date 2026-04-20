import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
