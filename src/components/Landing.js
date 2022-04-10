import React from 'react'

export default function Landing({ handleSubmit }) {
  const [username, setUsername] = React.useState("")
  return (
    <div>
      <input
        onChange={(e) => setUsername(e.target.value) }
        placeholder="Enter username" />
      
      <button onClick={() => handleSubmit(username)}>Submit</button>
    </div>
  )
}
