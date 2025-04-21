import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function HiraganaQuiz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [options, setOptions] = useState([])
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "hiragana"))
      const data = querySnapshot.docs.map(doc => doc.data())
      setQuestions(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      const currentChar = questions[current]
      const all = [...questions]
      const random = all
        .filter(q => q.romaji !== currentChar.romaji)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
      const choices = [...random, currentChar].sort(() => 0.5 - Math.random())
      setOptions(choices)
    }
  }, [questions, current])

  const handleAnswer = (choice) => {
    const correct = questions[current].romaji
    setFeedback(choice === correct ? "✅ Poprawnie!" : `❌ Niepoprawnie. Poprawna odpowiedź: ${correct}`)
    setTimeout(() => {
      setFeedback(null)
      setCurrent((prev) => (prev + 1) % questions.length)
    }, 1500)
  }

  if (questions.length === 0) return <p>Ładowanie danych...</p>

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Jaki to znak?</h2>
      <div className="text-6xl mb-6">{questions[current].kana}</div>
      <div className="grid grid-cols-3 gap-4">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.romaji)}
            className="bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600"
          >
            {opt.romaji}
          </button>
        ))}
      </div>
      {feedback && <p className="mt-4 font-semibold">{feedback}</p>}
    </div>
  )
}
