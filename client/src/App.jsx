import React, { useState } from "react"
import { Routes, Route, NavLink, useNavigate } from "react-router-dom"
import Welcome from "./views/Welcome"
import Game from "./views/Game"
import Lobby from "./views/Lobby"
import Calamari from "./assets/calamari.png"

function App({ socket }) {
  const [hosting, setHosting] = useState(false)
  const [roomId, setRoomId] = useState("")
  const [players, setPlayers] = useState([
    {
      id: socket.id,
      name: "Player 001",
      score: 0,
    },
  ])
  const navigate = useNavigate()
  socket.on("to-lobby", (isHost, room) => {
    setHosting(isHost)
    setRoomId(room)
    navigate("/lobby")
  })
  socket.on("player-list", (players) => {
    console.log(players)
    setPlayers(players)
  })
  socket.on("redirect", (destination) => {
    window.location.href = destination
  })
  const [gameName, setGameName] = useState("")
  return (
    <div className="App">
      <img
        src={Calamari}
        alt="Calamari"
        style={{ position: "fixed", bottom: "0", left: "10px" }}
      />
      <img
        src={Calamari}
        alt="Calamari"
        style={{ position: "fixed", bottom: "0", right: "10px" }}
      />

      <NavLink to={"/"}>Welcome</NavLink>
      <NavLink to={"/lobby"}>Lobby</NavLink>
      <NavLink to={"/game"}>Game</NavLink>
      <Routes>
        <Route path="/" element={<Welcome socket={socket} />} />
        <Route
          path="/lobby"
          element={
            <Lobby
              players={players}
              roomId={roomId}
              isHost={hosting}
              socket={socket}
              game={gameName}
            />
          }
        />
        <Route
          path="/game"
          element={
            <Game
              players={players}
              roomId={roomId}
              isHost={hosting}
              game={gameName}
              socket={socket}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
