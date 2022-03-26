import styled from "@emotion/styled";
import { caption, h5 } from "../../style/text";

type Props = {
  title: string;
  startedOn: string;
  className?: string
}

function Header({ title, startedOn, className }: Props) {
  return (
    <div className={className}>
      <Title>{title}</Title>
      <StartedOn>{startedOn}</StartedOn>
    </div>
  )
}

const Title = styled.h5`
  ${h5};
  margin: 0;
`

const StartedOn = styled.span`
  ${caption}
`

export default Header