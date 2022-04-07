import styled from "@emotion/styled";
import ReactPlayer from "react-player/lazy";

type Props = { url: string }

function ShowcaseVideoPlayer({ url }: Props) {
  return (
    <PlayerWrapper>
      <Player url={url} width="100%" height="100%" controls/>
    </PlayerWrapper>
  )
}

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
`

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`

export default ShowcaseVideoPlayer