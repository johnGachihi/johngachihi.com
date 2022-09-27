import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useCatch, useLocation,
} from "@remix-run/react";
import theme from "./styles/mui/theme";
import { MuiDocumentWrapper } from "./styles/mui/setup-utils";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import {AppBar} from "~/components/AppBar";


export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },

    // Google font
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
  "theme-color": theme.palette.primary.main,
  "emotion-insertion-point": "emotion-insertion-point",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <MuiDocumentWrapper>
      <html lang="en" className="h-full">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="h-full">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MuiDocumentWrapper>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();

  if (caught.status === 404)
    return (
        <MuiDocumentWrapper>
          <html lang="en" className="h-full">
            <head>
              <Meta />
              <Links />
            </head>
            <body className="flex flex-col h-full">
              <AppBar />
              <main className="w-4/5 mx-auto grow flex flex-col items-center justify-center text-center">
                <span className="text-5xl mb-4">404</span>
                <span className="text-xl mb-1">This path does not exist </span>
                <span className="text-xl max-w-full truncate">{location.pathname}</span>
              </main>
              <Scripts />
            </body>
          </html>
        </MuiDocumentWrapper>
    )
}