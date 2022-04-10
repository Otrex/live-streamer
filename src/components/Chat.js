import { useState } from "react";
import Message from './Message';
import {
  selectHMSMessages,
  selectBroadcastMessages,
  selectMessagesByRole,
  selectMessagesByPeerID,
  useHMSStore,
  useHMSActions
} from '@100mslive/hms-video-react';

function Chat({ peer, role }) {
  const [msg, setMsg] = useState("")
  // use only the selectors that are required for the corresponding UI
  const allMessages = useHMSStore(selectHMSMessages); // get all messages
  const brodacastMessages = useHMSStore(selectBroadcastMessages); // get all broadcasted messages
  const groupMessagesByRole = useHMSStore(selectMessagesByRole(role)); // get conversation with the host role
  const directMessages = useHMSStore(selectMessagesByPeerID(peer.id)); // get private conversation with peer
  const hmsActions = useHMSActions()
  const chat = () => {
    // hmsActions.sendDirectMessage("keep this message a secret!", peer.id);
    hmsActions.sendBroadcastMessage(msg);
    setMsg("")
  }
  return <div style={{
    padding: "10px 20px"
  }}>
    {
        allMessages.map(msg => <Message key={msg.id} message={msg} />)
    }

    <input onChange={(e) => setMsg(e.target.value) } onKeyPress={(e) => {
      e.key === 'Enter' ? chat() : (() => {})()
    }} placeholder="enter message" />
    <button onClick={chat} > Chat </button>
  </div>
}

export default Chat