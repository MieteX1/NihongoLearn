import ActionButton from "../components/ActionButton";
import VideoTile from "../components/VideoTile";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Nagłówek */}
      <header className="pl-8 pr-22 mt-12">
        <div className="grid grid-cols-3 items-center">
          <Logo className="text-center" />
          <div className="hidden lg:block"></div>
          <div className="flex justify-end">
            <ActionButton to="/menu" text="Rozpocznij naukę" color="btn-pink" add="text-stroke fix-stroke" />
          </div>
        </div>
      </header>

      <div className="flex flex-row flex-1 w-full items-start">
        <div className="w-1/3 flex flex-col gap-4 p-4">
          <div className="audiowide text-4xl mt-5 text-[#1E90FF] text-center">
            Ucz się japońskiego <br /> jak w świecie przyszłości
          </div>
          <div className="text-center audiowide px-12">
            Zanurz się w interaktywnym, futurystycznym świecie nauki. Hiragana i katakana przestają być tajemnicą - teraz to Twoje narzędzie do odkrywania <span className="text-[#FF0099]">nowego życia</span>.
          </div>
          <div className="py-2 text-center"><ActionButton to="/menu" text="Zacznij swoją podróż już teraz" color="btn-blue py-4" /></div>
          <div className="flex-1 px-10 text-base audiowide text-center ">
            Wejdź na ścieżkę prowadzącą ku spełnieniu marzenia – pracy w Japonii, wizie “work & travel”, spotkaniu inspirujących ludzi, a może… tej jednej wyjątkowej osoby 🌸
          </div>
          <div className="flex justify-center items-center mt-3">
            <img src="../img/br.svg"/>
          </div>

          <div className="flex gap-2 flex-1">
            <div className="flex-1 flex flex-col text-center audiowide ml-6">
              <h3 className="text-[#FF0099] text-xl mb-2">Quizy z przyszłości</h3>
              <p className="text-base">
                Adaptacyjne testy, które uczą Cię dokładnie tego, czego potrzebujesz - w sposób, jaki najlepiej trafia do Twojego umysłu.
              </p>
            </div>
            <div className="flex-1 flex flex-col text-center audiowide mt-16 px-1">
              <h3 className="text-[#FF0099] text-xl mb-2">Nowoczesna nauka alfabetów</h3>
              <p className="text-base">
                Poznawaj hiraganę i katakanę jak systemy z innej galaktyki – z łatwością i w swoim tempie.
              </p>
            </div>
            <div className="flex-1 flex flex-col text-center audiowide mt-38 px-1">
              <h3 className="text-[#FF0099] text-xl mb-2">Encyklopedia wiedzy</h3>
              <p className="text-base">
                Błyskawiczny i intuicyjny dostęp do bazy wiedzy stworzonej, by prowadzić Cię krok po kroku ku swobodzie w japońskim.
              </p>
            </div>
          </div>

          <div className="text-center px-24 audiowide my-5">
            To nie jest zwykła aplikacja.<br/> To portal do Twojej nowej rzeczywistości. Gotowy, by przekroczyć bramę?
          </div>
        </div>

        <div className="w-2/3 flex flex-col">
          <div className="text-center mt-[-5px] jp text-5xl">にほんご</div>

          <div className="flex flex-row flex-1 items-center justify-center">
            <VideoTile src="../video/auto.mp4" text="みらいてき" className="mt-[-50px]" textPosition="top-10 left-1/7" index={0}/>
            <VideoTile src="../video/girl.mp4" text="あい" className="mt-[10px]" textPosition="top-10 left-2/5" index={1}/>
            <VideoTile src="../video/view.mp4" text="ぶんか" className="mt-[-50px]" textPosition="top-10 left-1/3" overlay index={2}/>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
