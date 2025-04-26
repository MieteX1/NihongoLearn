import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import Logo from "./Logo"

export default function KanaQuiz() {
  const { type } = useParams()
  const [remainingQuestions, setRemainingQuestions] = useState([])  // Lista pozostałych pytań
  const [totalQuestions, setTotalQuestions] = useState(0)  // Stała liczba pytań
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [options, setOptions] = useState([]) 
  const [allQuestions, setAllQuestions] = useState([])
  const [difficulty, setDifficulty] = useState(localStorage.getItem("difficulty") || "łatwy")
  const [extensionLevel, setExtensionLevel] = useState(localStorage.getItem("extensionLevel") || "podstawowy")
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [rotate, setRotate] = useState(false)




  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, type))
      const data = querySnapshot.docs.map(doc => doc.data())

      const levelLimit = {
        podstawowy: 0,
        średni: 1,
        pełny: 2,
      }[extensionLevel]

      const filteredData = data.filter(doc => {
        const extLevel = typeof doc.extensionLevel === "number" ? doc.extensionLevel : 0
        return extLevel <= levelLimit
      })

      const shuffled = filteredData.sort(() => 0.5 - Math.random())

      if (shuffled.length === 0) {
        setRemainingQuestions([])
        setCurrentQuestion({ kana: "Brak pytań", romaji: "" })
        return
      }
      setAllQuestions(filteredData)
      setRemainingQuestions(shuffled)
      setTotalQuestions(shuffled.length / 2)
      setCurrentQuestion(shuffled[0])
    }

    fetchData()
  }, [type, extensionLevel])

  useEffect(() => {
    if (currentQuestion && allQuestions.length > 0) {
      let numOptions
      if (difficulty === "łatwy") numOptions = 1
      else if (difficulty === "średni") numOptions = 2
      else if (difficulty === "trudny") numOptions = 3
  
      // Stworzenie unikalnej listy błędnych odpowiedzi
      const incorrectOptionsSet = new Set()
      const incorrectOptions = []
  
      const availableIncorrect = allQuestions.filter(q => q.romaji !== currentQuestion.romaji)
      
      while (incorrectOptions.length < numOptions && availableIncorrect.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableIncorrect.length)
        const candidate = availableIncorrect[randomIndex]
        
        if (!incorrectOptionsSet.has(candidate.romaji)) {
          incorrectOptions.push(candidate)
          incorrectOptionsSet.add(candidate.romaji)
        }
        
        availableIncorrect.splice(randomIndex, 1) // Usuń już rozpatrzony kandydat
      }
  
      const choices = [...incorrectOptions, currentQuestion].sort(() => 0.5 - Math.random())
  
      setOptions(choices)
    }
  }, [currentQuestion, allQuestions, difficulty])
  
  
  useEffect(() => {
    let timer
  
    if (!quizFinished) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }
  
    return () => clearInterval(timer)
  }, [quizFinished])
  
  useEffect(() => {
    if (currentQuestion) {
      setRotate(true)
      const timeout = setTimeout(() => setRotate(false), 1000) // czas trwania animacji
      return () => clearTimeout(timeout)
    }
  }, [currentQuestion])  

  const handleAnswer = (choice) => {
    const correct = currentQuestion.romaji
    const isCorrect = choice === correct
    setSelectedAnswer(choice)
  
    setAnsweredQuestions(prev => prev + 1)
    setCorrectAnswers(prev => prev + (isCorrect ? 1 : 0))
    setWrongAnswers(prev => prev + (!isCorrect ? 1 : 0))
  
    setTimeout(() => {
      setSelectedAnswer(null)
      const newRemaining = remainingQuestions.filter(q => q.romaji !== currentQuestion.romaji)
  
      if (newRemaining.length === 0) {
        setRemainingQuestions([])
        setCurrentQuestion({ kana: "", romaji: "" })
        setQuizFinished(true) // <-- oznacz, że quiz się skończył!
      } else {
        setRemainingQuestions(newRemaining)
        setCurrentQuestion(newRemaining[0])
      }
      
    }, 500)
  }
  

  const resetQuiz = () => {
    setCurrentQuestion(null)
    setRemainingQuestions([])
    setAllQuestions([])
    setOptions([])
    setAnsweredQuestions(0)
    setCorrectAnswers(0)
    setWrongAnswers(0)
    setSelectedAnswer(null)
    setSeconds(0)
    setQuizFinished(false)
    window.location.reload()
  }
  

  // Zapisz ustawienia w localStorage i odśwież stronę
  const handleDifficultyChange = (level) => {
    setDifficulty(level)
    localStorage.setItem("difficulty", level)
    resetQuiz()
    window.location.reload() // Odświeżenie strony po zmianie poziomu trudności
  }

  const handleExtensionLevelChange = (level) => {
    setExtensionLevel(level)
    localStorage.setItem("extensionLevel", level)
    resetQuiz()
    window.location.reload() // Odświeżenie strony po zmianie poziomu rozszerzenia
  }

  const getDifficultyClass = (level, selectedLevel) => {
    const base = "py-2 border audiowide w-38 text-2xl btn-m1"
    const isSelected = level === selectedLevel
  
    const levelStyles = {
      łatwy: isSelected
        ? "btn-blue shadow-[1px_1px_25px_10px_rgba(30,144,255,0.4)]"
        : "btn-blue",
      średni: isSelected
        ? "btn-green shadow-[1px_1px_25px_10px_rgba(0,255,133,0.4)]"
        : "btn-green",
      trudny: isSelected
        ? "btn-pink shadow-[1px_1px_25px_10px_rgba(255,0,153,0.4)]"
        : "btn-pink",
    }
  
    return `${base} ${levelStyles[level] || ""}`
  }

  const getExtensionClass = (level, selectedLevel) => {
    const base = "py-2 border audiowide w-38 text-base btn-m1"
    const isSelected = level === selectedLevel
  
    const levelStyles = {
      podstawowy: isSelected
        ? "btn-blue shadow-[1px_1px_25px_10px_rgba(30,144,255,0.4)]"
        : "btn-blue",
      średni: isSelected
        ? "btn-green shadow-[1px_1px_25px_10px_rgba(0,255,133,0.4)]"
        : "btn-green",
      pełny: isSelected
        ? "btn-pink shadow-[1px_1px_25px_10px_rgba(255,0,153,0.4)]"
        : "btn-pink",
    }
  
    return `${base} ${levelStyles[level] || ""}`
  }
  

  return (
    <div className="px-4">
      <Logo className="mb-8 pt-14 pl-28" />

      <div className="flex flex-row justify-center gap-8">
        {/* Quiz */}
        <div className="w-1/3"></div>
        <div className="w-1/3 text-center">
          <h3 className="text-3xl capitalize audiowide">{type}</h3>
          <p className="text-2xl audiowide mt-4">
            {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
          </p>
          <h2 className="text-3xl audiowide mt-4">Jaki to znak?</h2>
          <p className="text-2xl audiowide mt-4">{answeredQuestions}/{totalQuestions}</p>
          <div className="flex justify-center mt-6">
            <div
              className={`w-44 h-36 relative bg-center bg-no-repeat bg-contain text-4xl jp2 transition-transform duration-1000 ${rotate ? 'rotate-animation' : ''}`}
              style={{ backgroundImage: `url(/img/triangle2.png)` }}
            >
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2">
                {currentQuestion?.kana || "..."}
              </div>
            </div>
          </div>
          {remainingQuestions.length > 0 && (
            <div className={`flex flex-row justify-center gap-4 mt-6`}>
              {options.map((opt, idx) => {
                let backgroundClass = ""
                if (selectedAnswer) {
                  if (opt.romaji === currentQuestion.romaji) {
                    backgroundClass = " bg-[#00FF8580]"
                  } else if (opt.romaji === selectedAnswer) {
                    backgroundClass = " bg-[#FF000080]"
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.romaji)}
                    disabled={!!selectedAnswer}
                    className={`w-36 text-white text-3xl audiowide btn-blue2 btn-m1 py-2 transition-all duration-200 ${backgroundClass}`}
                  >
                    {opt.romaji}
                  </button>
                )
              })}
            </div>
          )}

          <div className="mt-12 flex justify-between audiowide text-xl">
            <div className="text-[#00FF85] float-left">
              {correctAnswers} poprawnych odpowiedzi
            </div>
            <div className="text-[#FF0000] float-right">
              {wrongAnswers} błędnych odpowiedzi
            </div>
          </div>


        </div>


        {/* Poziomy trudności i rozszerzenia */}
        <div className="text-center w-1/3">
          <h3 className="audiowide text-3xl mb-8">Poziom trudności</h3>
          <div className="flex flex-row justify-center gap-4 mb-10">
            {["łatwy", "średni", "trudny"].map((level) => (
              <button
                key={level}
                onClick={() => handleDifficultyChange(level)}
                className={getDifficultyClass(level, difficulty)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
            </div>
            <h3 className="audiowide text-3xl mb-8">Poziom rozszerzenia</h3>
              <div className="flex flex-row justify-center gap-4">
                {[
                  { value: "podstawowy", label: "Podstawowy" },
                  { value: "średni", label: "Ext. +1" },
                  { value: "pełny", label: "Ext. +2" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleExtensionLevelChange(value)}
                    className={getExtensionClass(value, extensionLevel)}
                  >
                    {label}
                  </button>
                ))}
              </div>

          <div className="mt-6">
            <button
              onClick={() => {
                localStorage.setItem("difficulty", difficulty)
                localStorage.setItem("extensionLevel", extensionLevel)
                resetQuiz()
                window.location.reload()
              }}
              className="py-3 audiowide w-72 text-3xl mt-28 btn-m1 btn-whitegreen"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
