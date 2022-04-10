import React from 'react'

export default function Message({ message }) {
  return (
    <div style={{
      textAlign: 'left'
    }}>
      <ul>
        <li><b>Message: </b><p> { message.message } </p></li>
        <li><b>Time: </b><p> { JSON.stringify(message.time) } </p></li>
        <li><b>Sender: </b><p> { message.senderName } </p></li>
      </ul>
    </div>
  )
}
