import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import ImageTile from "../components/ImageTile";

const menuItems = [
  { label: "Literatura teoretyczna", path: "/encyclopedia", colorClass: "btn-green" },
  {
    label: "Quiz",
    colorClass: "btn-blue",
    subItems: [
      { label: "Hiragana", path: "/quiz/hiragana", colorClass: "btn-bluegreen" },
      { label: "Katakana", path: "/quiz/katakana", colorClass: "btn-bluepink" },
    ],
  },
  {
    label: "Znak → romaji",
    colorClass: "btn-pink",
    subItems: [
      { label: "Hiragana", path: "/input/hiragana", colorClass: "btn-pinkgreen" },
      { label: "Katakana", path: "/input/katakana", colorClass: "btn-pinkblue" },
    ],
  },
  { label: "Opinie", path: "/opinions", colorClass: "btn-green" },
  { label: "Ustawienia", path: "/settings", colorClass: "btn-green" },
];

export default function MainMenu() {
  const [clickedItem, setClickedItem] = useState(null);
  const navigate = useNavigate();

  const handleClick = (label, path, colorClass) => {
    setClickedItem({ label, path, colorClass });

    // Opóźnienie przejścia – żeby animacja się zdążyła pokazać
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  return (
    <div className="relative px-4">
      <Logo className="mb-8 pl-28 pt-14" />

      <div className="grid grid-cols-3 gap-6 items-start mt-4 z-10 relative">
        <div className="flex justify-center ml-16">
          <ImageTile
            src="/img/pathleft.png"
            text="Każdy krok naprzód, choćby mały, przybliża Cię do marzenia."
            textPosition="top-10 px-4 text-center"
            className="audiowide text-[32px]"
          />
        </div>

        {/* Środkowa kolumna - menu */}
        <div className="flex flex-col items-center gap-12">
          {menuItems.map((item) => (
            <div key={item.label} className="w-3/4 text-center">
              {item.subItems ? (
                <button
                  className={`btn-m1 ${item.colorClass} audiowide py-4 w-full text-2xl`}
                >
                  {item.label}
                </button>
              ) : (
                <button
                  onClick={() => handleClick(item.label, item.path, item.colorClass)}
                  className={`btn-m1 ${item.colorClass} py-4 audiowide w-full text-2xl cursor-pointer`}
                >
                  {item.label}
                </button>
              )}

              {item.subItems && (
                <div className="flex flex-col items-center mt-6 space-y-6">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.label}
                      onClick={() => handleClick(sub.label, sub.path, sub.colorClass)}
                      className={`btn-m1 ${sub.colorClass} audiowide py-4 w-4/5 text-2xl cursor-pointer`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
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

      {/* ANIMACJA POWIĘKSZENIA */}
      <AnimatePresence>
        {clickedItem && (
          <motion.div
            key={clickedItem.label}
            className={`fixed inset-0 z-50 flex items-center border-6 justify-center ${clickedItem.colorClass} text-white`}
            initial={{ scale: 0.1, opacity: 0.5 }}
            animate={{ scale: 0.8, opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl audiowide">{clickedItem.label}</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
