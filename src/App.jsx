import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import MainMenu from './pages/MainMenu'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/menu" element={<MainMenu />} />
    </Routes>
  )
}

export default App
