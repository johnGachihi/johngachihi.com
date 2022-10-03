import ReactPlayer from "react-player/youtube";

interface Props {
    url: string
}

export default function VideoPlayer({url}: Props) {
    return <ReactPlayer className="aspect-video" url={url} width="100%" height="100%" controls/>
}