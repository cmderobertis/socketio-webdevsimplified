import React from "react"

const Lobby = ({ socket }) => {
  // get status of game
  // display players in lobby
  return (
    <div>
      <h2>Game Lobby</h2>
      <p>waiting for other players</p>
      <strong>Players in Lobby:</strong>
      <ul>
        <li>Player 1</li>
        <li>Player 2</li>
        <li>Player 456</li>
      </ul>
    </div>
  )
}

export default Lobby
