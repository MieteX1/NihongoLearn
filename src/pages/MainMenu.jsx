import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import ImageTile from "../components/ImageTile";


const menuItems = [
  { label: "Literatura teoretyczna", path: "/encyclopedia", colorClass: "btn-green"  },
  {
    label: "Quiz",
    colorClass: "btn-blue",
    subItems: [
      { label: "Hiragana", path: "/quiz/hiragana", colorClass: "btn-bluegreen", },
      { label: "Katakana", path: "/quiz/katakana", colorClass: "btn-bluepink",},
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
                <Link to={item.path}>
                  <div className={`btn-m1 ${item.colorClass} py-4 audiowide w-full text-2xl`}>
                    {item.label}
                  </div>
                </Link>
              )}

              {item.subItems && (
                <div className="flex flex-col items-center mt-6 space-y-6">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      className={`block btn-m1 ${sub.colorClass} audiowide py-4 w-4/5 text-2xl`}
                    >
                      {sub.label}
                    </Link>
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
    </div>
  );
}

/* Dodanie logowania bo osiągnięcia będą dodawać gwiazdki na MainMenu w nagłówku? plan na późny late
Quiz ma kilka poziomów trudności easy 2 opcje medium 3 opcje oraz hard 4 opcje. Przycisk który daje +1 extension czyli z kreskami i kółkami 
oraz przycisk który daje +2 extension wszystkie możliwe znaki.
Dodać popup mówiący że ta czynność zresetuje Ci aktualny quiz. Timer nad quizem.
Timer oraz ilość poprawnych i niepoprawnych poniżej 
tryb endless mode  */