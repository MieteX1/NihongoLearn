import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import MainMenu from './pages/MainMenu'
import KanaQuiz from './components/KanaQuiz'



function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/menu" element={<MainMenu />} />
      <Route path="/quiz/:type" element={<KanaQuiz />} />
      
    </Routes>
  )
}

export default App
