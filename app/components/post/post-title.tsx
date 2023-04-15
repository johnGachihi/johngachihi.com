type Props = {
  title: string;
  date: string;
  className?: string;
};

export default function PostTitle({ title, date, className }: Props) {
  return (
    <div className={className}>
      <h2 className="h4 leading-tight">{title}</h2>
      <div className="body1 mt-2 text-gray-600">{date}</div>
    </div>
  );
}
