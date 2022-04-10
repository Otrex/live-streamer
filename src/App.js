import React from "react";
import axios from "axios";
import './App.css';
import Landing from './components/Landing';
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from '@100mslive/hms-video-react';
import Room from "./components/Room";

const room_id = "618ec88abe6c3c0b3515150c"
// const tokenEndpoint = "https://trex-video.app.100ms.live/meeting/orr-rue-jah"
const tokenEndpoint = "https://prod-in.100ms.live/hmsapi/trex.app.100ms.live/"
// const getToken = (user_id) => {
//   return fetch(`${tokenEndpoint}api/token`, {
//     method: 'POST',
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       user_id,
//       type: "app",
//       role: "host",
//       room_id,
//     })
//   })
// }

const getToken = async (user_id) => {
  return axios.post(`${tokenEndpoint}api/token`, {
    user_id,
    type: "app",
    role: "host",
    room_id,
  })
}
// const hostToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjE4ZWMzNWVhZjMxODhkZjMzZTY3ZGFkIiwicm9vbV9pZCI6IjYxOGVjODhhYmU2YzNjMGIzNTE1MTUwYyIsInVzZXJfaWQiOiJ0aW5ieGZuZyIsInJvbGUiOiJob3N0IiwianRpIjoiM2U1ZGRlZDQtYjY4OC00NTcxLWEwMTEtYzA0N2FlZWYwNTQ3IiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImV4cCI6MTYzNjgzNTIwM30.DjkbGGK_AzghomwF50D08tiWWlrY0ftTQACMLA3hX4k"
function App() {
  const hmsActions = useHMSActions()
  const isConnected = useHMSStore(selectIsConnectedToRoom)

  const handleSubmit = async (username) => {
    const { data } = await getToken(username)
    hmsActions.join({ authToken: data.token, username })
  }

  React.useEffect(() => {
    console.log(isConnected);
  }, [isConnected])
  return (
    <div className="App">
      {
        isConnected ?
        <Room />: 
        <Landing handleSubmit={handleSubmit}/>
      }
    </div>
  );
}

export default App;
