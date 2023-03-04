import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectSummary } from "~/models/project.server";
import style from "./project-card.css";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Link } from "@remix-run/react";
import { VideoPlayer2 } from "../post/video-player";

export function links() {
  return [{ rel: "stylesheet", href: style }]
}

export function ProjectCard({ project, className }: { project: ProjectSummary, className?: string }) {
  const [isLongHovered, isHovered, onMouseEnter, onMouseLeave] = useLongHover();
  const [videoWatchProgress, setVideoWatchProgress] = useState(0);

  const showcaseMedia = useMemo(() => {
    if (project.showcaseMedia) {
      return project.showcaseMedia.type === "image"
        ? (
          <img
            className="w-full h-full object-cover rounded-[inherit]"
            src={project.showcaseMedia.src}
            alt={project.title} />
        )
        : (
          <VideoThumbnail
            src={project.showcaseMedia.src}
            title={project.title}
            id={project.slug}
            isCardLongHovered={isLongHovered}
            isCardHovered={isHovered}
            onTimeUpdate={(time) => setVideoWatchProgress(time)}
          />
        )
    }
  }, [isHovered, isLongHovered, project.showcaseMedia, project.slug, project.title])

  // TODO: Is this necessary?
  const videoProgressUrlQuery = useMemo(() => {
    return videoWatchProgress > /* TODO: Eeh? */ 7
      ? `?v=${videoWatchProgress}`
      : undefined
  }, [videoWatchProgress])

  return (
    <Link
      to={{
        pathname: project.slug,
        search: videoProgressUrlQuery
      }}
      className={clsx("group", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="aspect-video rounded-lg group-hover:ring-2 ring-gray-400 ring-offset-8 transition duration-300">
        {showcaseMedia}
      </div>

      <div className="px-2 pt-4 pb-4">
        <div className="caption lg:body2">{project.startedAt}</div>
        <div className="h6">{project.title}</div>
        {project.tags && (
          <div className="flex flex-wrap mt-2">
            {project.tags.map((tag) => (
              <div className="caption lg:body2 text-gray-500 mr-2" children={"#" + tag} key={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
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

function VideoThumbnail({ src, title, id, isCardLongHovered, isCardHovered, onTimeUpdate }: {
  src: string,
  title: string,
  id: string,
  isCardLongHovered: boolean,
  isCardHovered: boolean,
  onTimeUpdate: (time: number) => void
}) {
  const shouldPlay = useMemo(() => isCardLongHovered, [isCardLongHovered])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handleTimeUpdate = debounce((time: number) => {
    onTimeUpdate(time)
  }, 500)

  return (
    <div className={clsx("relative w-full h-full rounded-[inherit]")}>
      <div className="absolute inset-0 flex flex-col justify-between items-end p-2">
        <div
          className={clsx(
            { "opacity-0": !isPlaying },
            "z-10 bg-gray-600/40 hover:bg-gray-600/75 text-white p-1.5 rounded transition duration-300"
          )}
        >
          <div
            onClick={(e) => {
              setIsMuted(isMuted => !isMuted);
              e.preventDefault();
            }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted
              ? <VolumeUpIcon color="inherit" />
              : <VolumeOffIcon color="inherit" />
            }
          </div>
        </div>

        <div
          className={clsx(
            isPlaying ? "opacity-0" : "opacity-100",
            "z-10 text-xs text-white bg-gray-600/75 p-1 rounded  transition duration-300"
          )}>
          {isCardHovered ? "Keep hovering to play" : "Video"}
        </div>
      </div>

      <VideoPlayer2
        className="absolute inset-0 rounded-[inherit] overflow-clip"
        src={src}
        shouldPlay={shouldPlay}
        isMuted={isMuted}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        meta={{ id, title }}
      />
    </div>
  )
}

function debounce(fn: (time: number) => void, ms: number) {
  let isDebouncing = false;
  let lastCallArg: number | null = null;

  const f = (time: number) => {
    if (!isDebouncing) {
      fn(time);

      isDebouncing = true;

      setTimeout(() => {
        isDebouncing = false;
        if (lastCallArg) {
          f(lastCallArg);
          lastCallArg = null;
        }
      }, ms);
    } else {
      lastCallArg = time;
    }
  }

  return f;
}