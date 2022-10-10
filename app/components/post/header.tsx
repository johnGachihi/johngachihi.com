import styled from "@emotion/styled";
import { caption, h5 } from "~/styles/text";

type Props = {
  title: string;
  date: string;
  className?: string;
};

export default function Header({ title, date, className }: Props) {
  return (
    <div className={className}>
      <Title>{title}</Title>
      <Date>{date}</Date>
    </div>
  );
}

const Title = styled.h2` 
  ${h5};
  margin: 0;
`;

const Date = styled.span`
  ${caption}
`;
