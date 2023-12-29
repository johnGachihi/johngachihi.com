import { Link } from "@remix-run/react";
import clsx from "clsx";

type Props = {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  className?: string;
};

function PostListItem({ title, date, tags, slug, className, ...otherProps }: Props) {
  return (
    <Link className={clsx(className, "block")} to={slug} {...otherProps}>
      <div className="p-4 border border-black/20 rounded-md sm:flex sm:items-baseline sm:border-0 sm:p-0">
        <span className="caption sm:mr-4 md:body2">{date}</span>

        <div>
          <span className="font-medium block body1 mb-2 sm:mb-0 lg:h6 hover:underline">{title}</span>

          {tags && (
            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <span className="mr-2 caption lg:body2" children={"#" + tag} key={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export { PostListItem as default };
