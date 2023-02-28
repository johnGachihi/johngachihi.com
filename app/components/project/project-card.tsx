import styled from "@emotion/styled";
import MuxPlayer from "@mux/mux-player-react";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectSummary } from "~/models/project.server";
import { body1, body2, caption, h6 } from "~/styles/text";
import style from "./project-card.css";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export function links() {
  return [{ rel: "stylesheet", href: style }]
}

export function ProjectCard({ project, className }: { project: ProjectSummary, className?: string }) {
  const [isLongHovered, isHovered, onMouseEnter, onMouseLeave] = useLongHover();

  const showcaseMedia = useMemo(() => {
    if (project.showcaseMedia) {
      return project.showcaseMedia.type === "image"
        ? (
          <img
            className="w-full h-full object-cover rounded-[inherit]"
            src={project.showcaseMedia.src}
            alt="project.title" />
        )
        : <VideoThumbnail isCardLongHovered={isLongHovered} isCardHovered={isHovered} />
    }
  }, [isHovered, isLongHovered, project.showcaseMedia])

  return (
    <div className={clsx("group", className)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <div className="aspect-video rounded-lg group-hover:ring-2 ring-gray-500 ring-offset-8 transition duration-300">
        {showcaseMedia}
      </div>

      <div className="px-2 pt-4 pb-4">
        <StartedOn>{project.startedAt}</StartedOn>
        <Title>{project.title}</Title>
        {project.tags && (
          <div className="flex flex-wrap mt-2">
            {project.tags.map((tag) => (
              <Tag className="text-gray-500" children={"#" + tag} key={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function useLongHover() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLongHovered, setIsLongHovered] = useState(false);
  const timeoutRef = useRef<any>(null);

  const onMouseEnter = () => {
    setIsHovered(true);
    timeoutRef.current = setTimeout(() => {
      setIsLongHovered(true);
    }, 2000);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    clearTimeout(timeoutRef.current);
    setIsLongHovered(false);
  };

  return [isLongHovered, isHovered, onMouseEnter, onMouseLeave] as const;
}

function VideoThumbnail({ isCardLongHovered, isCardHovered }: {
  isCardLongHovered: boolean,
  isCardHovered: boolean
}) {
  const shouldPlay = useMemo(() => isCardLongHovered, [isCardLongHovered])
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)

  const videoOverlayRef = useRef<any>(null)

  useEffect(() => {
    if (shouldPlay) {
      videoOverlayRef.current?.play()
    } else {
      videoOverlayRef.current?.pause()
    }
  }, [shouldPlay])

  return (
    <div className={clsx("relative w-full h-full rounded-[inherit]")}>
      <div className="absolute inset-0 z-10 flex flex-col justify-between items-end p-1">
        <div
          className={clsx(
            { "opacity-0": !videoPlaying },
            "bg-gray-600/40 hover:bg-gray-600/75 text-white p-1.5 rounded transition duration-300"
          )}
        >
          <div
            onClick={() => setVideoMuted(videoMuted => !videoMuted)}
            title={videoMuted ? "Unmute" : "Mute"}
          >
            {videoMuted
              ? <VolumeUpIcon color="inherit" />
              : <VolumeOffIcon color="inherit" />
            }
          </div>
        </div>

        <div className={clsx(videoPlaying ? "opacity-0" : "opacity-100", "text-xs text-white bg-gray-600/75 p-1 rounded  transition duration-300")}>
          {isCardHovered ? "Keep hovering to play" : "Video"}
        </div>
      </div>
      <MuxPlayer
        ref={videoOverlayRef}
        streamType="on-demand"
        playbackId="Ff7MTdfXRZ15H71OxA5aemolT72EB4v2ySjSgRZVKAg"
        onPlaying={() => setVideoPlaying(true)}
        onPause={() => setVideoPlaying(false)}
        muted={videoMuted}
        metadata={{
          video_id: "video-id",
          video_title: "video title",
        }}
        className="absolute inset-0 rounded-[inherit] overflow-clip"
        primaryColor="#000"
        secondaryColor="#fff"
      />
    </div>
  )
}

const StartedOn = styled.div`
  ${caption};

  @media (min-width: 600px) {
    margin-right: 16px;
  }

  @media (min-width: 900px) {
    ${body2};
  }
`;

const Title = styled.span`
  font-weight: 500;
  display: block;
  ${body1};

  @media (max-width: 600px) {
    margin-bottom: 8px;
  }

  @media (min-width: 900px) {
    ${h6};
  }

  /* &:hover {
    text-decoration: underline;
  } */
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  margin-right: 8px;
  ${caption};

  @media (min-width: 900px) {
    ${body2};
  }
`;