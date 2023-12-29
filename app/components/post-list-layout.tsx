import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ title: string }>;

function PostListLayout({ title, children }: Props) {
  return (
    <>
      <header>
        <h2 className="h6 mt-6 mb-4 sm:h4 sm:mt-10 sm:mb-6 sm:font-normal lg:mt-14">{title}</h2>
      </header>
      {children}
    </>
  );
}

export default PostListLayout;
