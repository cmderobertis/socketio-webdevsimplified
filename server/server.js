const { instrument } = require("@socket.io/admin-ui")
const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
  },
})

function pickName() {
  const randNames = [
    "Player 456",
    "Player 218",
    "Player 101",
    "Player 212",
    "Player 067",
    "Player 199",
    "Motion-Sensing Girl",
    "Traitor Guard",
    "The Salesman",
    "Human Furniture",
    "Eagle VIP",
    "Panther VIP",
    "Bull VIP",
    "Lion VIP",
    "Squid",
    "Umbrella Dalgona",
    "Tyler Maxwell",
    "Cursed Coffin",
    "Square Guard",
    "Circle Guard",
    "Triangle Guard",
    "Lonely Marble",
    "Contraband Lighter",
    "Red Hair Dye",
    "Pastel Staircase",
    "Birthday Toy Gun",
  ]
  return randNames[Math.floor(Math.random() * randNames.length) + 1]
}
function generateRoomId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let roomId = ""
  for (let i = 0; i < 4; i++) {
    roomId += chars[Math.floor(Math.random() * chars.length)]
  }
  return roomId
}

let hostId

io.on("connection", (socket) => {
  console.log(socket.id, "connected")

  socket.on("host", (message) => {
    socket.join(socket.id)
    hostId = socket.id
    let roomId = generateRoomId()
    console.log(hostId, "is", message, "in room", roomId)
    io.to(hostId).emit("host-confirmation", roomId, {
      id: socket.id,
      name: "Player 001",
      score: 0,
    })
  })
  socket.on("join", (room) => {
    socket.join(room)
    console.log(socket.id, "joined room", room)
    io.to(socket.id).emit("join-confirmation", hostId)
    io.to(hostId).emit("player-joined", {
      id: socket.id,
      name: pickName(),
      score: 0,
    })
  })
  socket.on("answer-to-server", (answer) => {
    console.log("Sending", answer.content, "to", hostId)
    io.to(hostId).emit("answer", answer)
  })
})

instrument(io, { auth: false })
