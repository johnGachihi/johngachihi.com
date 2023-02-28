import ReactPlayer from "react-player/youtube";

interface Props {
    url: string
    width?: string
    height?: string
}

export default function VideoPlayer({ url, width = "100%", height = "100%" }: Props) {
    return <ReactPlayer className="aspect-video" url={url} width={width} height={height} controls light />
}