import React from "react"
import Trivia from "../components/Trivia"
import RedLightGreenLight from "../components/RedLightGreenLight"
import TugOfWar from "../components/TugOfWar"

const Game = ({ socket, game }) => {
  return (
    <div>
      <h2>Playing a game</h2>
      <Trivia socket={socket} />
      {game === "RedLightGreenLight" && <RedLightGreenLight socket={socket} />}
      {game === "TugOfWar" && <TugOfWar socket={socket} />}
    </div>
  )
}

export default Game
