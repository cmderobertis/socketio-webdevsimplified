import { io } from "socket.io-client"

export const socket = io("http://localhost:3001")
socket.on("connect", () => {
  console.log("Connected to server")
})
export let hostId

socket.on("join-confirmation", (id) => {
  hostId = id
})

// HOST-ONLY
let answerCount = 0
socket.on("host-confirmation", (roomId, host) => {
  console.log("Now hosting room: " + roomId)
  sessionStorage.setItem("roomId", roomId)
  sessionStorage.setItem("players", JSON.stringify([host]))
  sessionStorage.setItem("round", 0)
  sessionStorage.setItem("responses", {})
  sessionStorage.setItem("currentGame", "")
  sessionStorage.setItem("team1", 0)
  sessionStorage.setItem("team2", 0)
})
socket.on("player-joined", (player) => {
  console.log("someone joined the room: " + player.name)
  const players = JSON.parse(sessionStorage.getItem("players"))
  players.push(player)
  sessionStorage.setItem("players", JSON.stringify(players))
  socket.emit(
    "player-list-server",
    JSON.parse(sessionStorage.getItem("players"))
  )
})
socket.on("answer", (answer) => {
  console.log("answer received from: " + answer.id)
  if (!answer.team) {
    sessionStorage.setItem("responses", {
      ...sessionStorage.getItem("responses"),
      [answer.id]: answer.content,
    })
    // reply to user
    socket.to(answer.id).emit("response", answer.content)
  } else {
    switch (sessionStorage.getItem("currentGame")) {
      case "TugOfWar":
        sessionStorage.setItem(
          answer.team,
          sessionStorage.getItem(answer.team) + answer.content
        )
        answerCount++
        break
      default:
        console.error("Invalid game name...")
    }
  }
  if (answerCount >= sessionStorage.getItem("players").length) {
    handleRoundEnd(sessionStorage.getItem("currentGame"))
  }
})

function handleRoundEnd(currentGame) {
  switch (currentGame) {
    case "TugOfWar":
      let winningTeam
      let team1Score = sessionStorage.getItem("team1")
      let team2Score = sessionStorage.getItem("team2")
      if (team1Score > team2Score) {
        winningTeam = "team1"
      } else if (team1Score < team2Score) {
        winningTeam = "team2"
      } else {
        winningTeam = "tie"
      }
      console.log(winningTeam)
      break
    default:
      // solo games, trivia
      return
  }
}
