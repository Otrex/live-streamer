import { selectLocalPeer, selectPeers, selectRTMPState, useHMSActions, useHMSStore } from '@100mslive/hms-video-react'
import React from 'react'
import Chat from './Chat';
import Controller from './Controller';
import VideoTile from './VideoTile';

export default function Room() {
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions()
  const isStreaming = useHMSStore(selectRTMPState)
  // meetingURL: "http://localhost:3000",
  //       rtmpUrls: [
  //         "rtmp://a.rtmp.youtube.com/live2/9v65-66jp-18eu-pbs5-0zk1",
  //         "rtmp://b.rtmp.youtube.com/live2/9v65-66jp-18eu-pbs5-0zk1?backup=1"
  //       ],
  //       record: false
  const stream = async () => {
  
    try {
      await hmsActions.startRTMPOrRecording({
        meetingUrl: "https://trex-video.app.100ms.live/meeting/618ec88abe6c3c0b3515150c/host",
        rtmpUrls: [
                  "rtmp://a.rtmp.youtube.com/live2/9v65-66jp-18eu-pbs5-0zk1",
                  "rtmp://b.rtmp.youtube.com/live2/9v65-66jp-18eu-pbs5-0zk1?backup=1"
                ],
        record: false
      })
    } catch (err) {
      console.error(err)
    }
  }

  const stopStream = async () => {
    try {
      await hmsActions.stopRTMPAndRecording();
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    if (isStreaming.running) {
      console.log('is streaming ....')
    }
    return () => {
      if (isStreaming.running) {
        stopStream().then(() => {
          console.log('is streaming has stopped....')
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStreaming])

  return (
    <div style={{
      display: "flex"
    }}>
      { <Chat role={"host"} peer={localPeer}/> }
      { localPeer && <VideoTile peer={localPeer} isLocal={true} />}
      {
        peers && peers.filter((peer)=> !peer.isLocal).map((peer, idx) =>
          <VideoTile peer={peer} isLocal={false} key={idx} />
         )
      }
      <div>
        <Controller />
        <button onClick={stream} > Stream </button>
        <button onClick={stopStream} > Stream Stop </button>
      </div>
    </div>
  )
}

