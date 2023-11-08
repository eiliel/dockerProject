import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Artist from './views/Artist'
import Song from './views/Song'
import PlayMusic from './views/PlayMusic'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addArtist" element={<Artist />} />
          <Route path="/addSong" element={<Song />} />
          <Route path="/playMusic" element={<PlayMusic />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
