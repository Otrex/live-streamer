import { selectIsLocalAudioEnabled, selectIsLocalVideoEnabled, useHMSActions, useHMSStore } from '@100mslive/hms-video-react'
import React from 'react'
 
export default function Controller() {
  const isSoundEnabled = useHMSStore(selectIsLocalAudioEnabled)
  const isVideoEnabled = useHMSStore(selectIsLocalVideoEnabled)
  const hmsActions = useHMSActions()

  const toggleSound = async () => {
    await hmsActions.setLocalAudioEnabled(!isSoundEnabled)
  }

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isVideoEnabled)
  }

  return (
    <div>
      <button name="sound" onClick={toggleSound}> {isSoundEnabled ? 'mute': 'unmute'} </button>
      <button name="video" onClick={toggleVideo}> {isVideoEnabled ? 'hide': 'unhide'} </button>
    </div>
  )
}
