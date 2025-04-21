import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import ImageTile from "../components/ImageTile";


const menuItems = [
  { label: "Literatura teoretyczna", path: "/encyclopedia" },
  {
    label: "Quiz",
    subItems: [
      { label: "Hiragana", path: "/quiz/hiragana" },
      { label: "Katakana", path: "/quiz/katakana" },
    ],
  },
  {
    label: "Wpisz znak",
    subItems: [
      { label: "Hiragana", path: "/input/hiragana" },
      { label: "Katakana", path: "/input/katakana" },
    ],
  },
  { label: "Opinie", path: "/opinions" },
  { label: "Ustawienia", path: "/settings" },
];

export default function MainMenu() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="px-4">
      <Logo className="mb-8 pl-28 pt-14" />

      <div className="grid grid-cols-3 gap-6 items-start mt-4">
        <div className="flex justify-center ml-16">
          <ImageTile
            src="/img/pathleft.png"
            text="Każdy krok naprzód, choćby mały, przybliża Cię do marzenia."
            textPosition="top-10 px-4 text-center"
            className="audiowide text-[32px]"
          />
        </div>

        {/* Środkowa kolumna - menu */}
        <div className="flex flex-col items-center gap-4">
          {menuItems.map((item, index) => (
            <div key={item.label} className="w-full max-w-xs text-center">
              {item.subItems ? (
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="bg-white text-black px-6 py-3 rounded-2xl shadow-md w-full text-xl font-semibold hover:bg-gray-100 transition"
                >
                  {item.label}
                </button>
              ) : (
                <Link to={item.path}>
                  <div className="bg-white text-black px-6 py-3 rounded-2xl shadow-md w-full text-xl font-semibold hover:bg-gray-100 transition">
                    {item.label}
                  </div>
                </Link>
              )}

              <AnimatePresence>
                {item.subItems && openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-2"
                  >
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="block bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <ImageTile
            src="/img/pathright.png"
            text="小さな一歩でも、夢に近づくことができる"
            textPosition="top-10 left-4 text-center"
            className="jp text-4xl"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}