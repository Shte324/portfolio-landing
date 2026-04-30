// app/legal/page.js
import LegalInfo from "../components/LegalInfo";

export const metadata = {
  title: "Справочная информация | GeeRooWeb",
  description: "Юридическая информация о владельце веб-студии GeeRooWeb",
};

export default function LegalPage() {
  return <LegalInfo />;
}