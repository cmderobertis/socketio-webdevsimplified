import React from "react"
import HostButton from "../components/HostButton"
import JoinButton from "../components/JoinButton"

const Welcome = ({ socket }) => {
  return (
    <>
      <h2>Welcome to the Calamari Game.</h2>
      <HostButton socket={socket} />
      <JoinButton socket={socket} />
    </>
  )
}

export default Welcome
