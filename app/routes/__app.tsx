import { Outlet } from "@remix-run/react";
import { AppBar } from "~/components/AppBar";
import { Footer } from "~/components/footer";
import clsx from "clsx";

export default function Index() {
  return (
    <>
      <AppBar />
      <div
        className={clsx("my-0 mx-4 sm:mx-8 ",
          "lg:mx-auto lg:w-[840px]",
          "xl:mx-[200px] xl:w-[unset]",
          "2xl:mx-auto 2xl:w-[1040px]")}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
