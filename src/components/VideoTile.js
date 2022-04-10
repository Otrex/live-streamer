import { selectCameraStreamByPeerID, useHMSActions, useHMSStore } from '@100mslive/hms-video-react'
import React from 'react'

export default function VideoTile({ peer, isLocal }) {
  const videoRef = React.useRef(null)
  const hmsActions = useHMSActions()

  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id))

  React.useEffect(() => {
    if (videoTrack && videoRef.current) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current).then(() => {console.log("connected")})
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current).then(() => {console.log("disconnected")})
      }
    }
  })
  return (
    <div>
      <video
        ref={videoRef}
        autoPlay={true}
        muted={true}
        playsInline
        />
    </div>
  )
}
