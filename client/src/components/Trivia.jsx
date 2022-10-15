/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"

const Trivia = ({ socket }) => {
  let answer = false
  setTimeout(() => {
    socket.emit("answer-to-server", {
      id: socket.id,
      content: answer,
      team: null,
    })
  }, 3000)

  return (
    <div>
      <p>Why was 6 afraid of 7?</p>
      <button>7 is a known cyber-terrorist</button>
      <button>
        7 cracks kneecaps for a living. He literally makes money doing it.
      </button>
      <button onClick={() => (answer = true)}>7 ate 9</button>
      <button>
        Numbers don't have feelings, why are we talking about this?
      </button>
      <p>Your answer: {answer}</p>
    </div>
  )
}

export default Trivia
