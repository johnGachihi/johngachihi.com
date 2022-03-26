import styled from "@emotion/styled";
import { caption } from "../../style/text";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode
  text: string
  link: string
  className?: string
}

function ProjectLink({ icon: Icon, text, link, className }: Props) {
  return (
    <Link href={link} className={className}>
      {Icon}
      <Text>{text}</Text>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  border-radius: 7px;
  border: 1px solid black;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  width: fit-content;
`

const Text = styled.span`
  ${caption}
  margin-left: 8px
`

export default ProjectLink