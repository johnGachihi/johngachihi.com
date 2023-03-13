import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef } from "react";

export default function VideoPlayer(
  {
    className,
    src,
    shouldPlay,
    isMuted,
    startTime,
    meta: { id, title },
    onPlaying,
    onPause,
    onTimeUpdate,
  }: {
    className?: string,
    src: string,
    shouldPlay: boolean,
    isMuted?: boolean,
    startTime?: number,
    meta: {
      id: string,
      title: string,
    }
    onPlaying?: () => void,
    onPause?: () => void,
    onTimeUpdate?: (time: number) => void,
  }
) {
  const videoElRef = useRef<any>(null)

  useEffect(() => {
    if (shouldPlay) {
      videoElRef.current?.play()
    } else {
      videoElRef.current?.pause()
    }
  }, [shouldPlay])

  return (
    <MuxPlayer
      ref={videoElRef}
      streamType="on-demand"
      playbackId={src}
      startTime={startTime}
      onPlaying={onPlaying}
      onPause={onPause}
      onTimeUpdate={() => onTimeUpdate?.(videoElRef.current?.currentTime)}
      muted={isMuted}
      metadata={{ video_id: id, video_title: title }}
      className={className}
      primaryColor="#eee"
      secondaryColor="#000"
    />
  )
}