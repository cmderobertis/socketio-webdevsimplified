import React from "react"

const Lobby = ({ socket, isHost, roomId, players }) => {
  const handleClick = () => {
    socket.emit("start-round")
  }
  // get status of game
  // display players in lobby
  return (
    <div>
      <h2 className="display-2">Room {roomId}</h2>
      {isHost && <p>You're the host!</p>}
      <p>waiting for other players</p>
      <strong>Players in Lobby:</strong>
      <ul>
        {players &&
          players.map((player, idx) => {
            return <li key={idx}>{player.name}</li>
          })}
      </ul>
      {isHost && (
        <button className="btn" onClick={handleClick}>
          Start
        </button>
      )}
    </div>
  )
}

export default Lobby
