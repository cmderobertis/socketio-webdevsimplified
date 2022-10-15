import React, { useState } from "react"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Welcome from "./views/Welcome"
import Game from "./views/Game"
import Lobby from "./views/Lobby"

function App({ socket }) {
  const [gameName, setGameName] = useState("")
  return (
    <div className="App">
      <BrowserRouter>
        <NavLink to={"/"}>Welcome</NavLink>
        <NavLink to={"/lobby"}>Lobby</NavLink>
        <NavLink to={"/game"}>Game</NavLink>
        <Routes>
          <Route path="/" element={<Welcome socket={socket} />} />
          <Route
            path="/lobby"
            element={<Lobby socket={socket} game={gameName} />}
          />
          <Route
            path="/game"
            element={<Game game={gameName} socket={socket} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
