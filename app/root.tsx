import {
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  UIMatch,
  useMatches
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import NewsSection from "./components/NewsSection";

export const links: LinksFunction = () => [
  // { rel: "preconnect", href: "https://fonts.googleapis.com" },
  // {
  //   rel: "preconnect",
  //   href: "https://fonts.gstatic.com",
  //   crossOrigin: "anonymous",
  // },
  // {
  //   rel: "stylesheet",
  //   href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  // },
];

export const MyLinks = () => [
  {
    href: "/stacks",
    title: "Stacks",
    color: "text-white"
  },
  {
    href: "/projects",
    title: "Projects",
    color: "text-slate-300"
  },
  {
    href: "/development",
    title: "Development",
    color: "text-purple-400"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {

  // const matches: UIMatch<any, { breadcrumb: () => JSX.Element }>[] = useMatches() as any;
  const matches: UIMatch[] = useMatches();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen bg-white">
        <div className="fixed top-0 w-full bottom-0 min-h-screen bg-gradient-to-l from-red-700  to-teal-700 background-animateHorizontal mix-blend-multiply" />
        <div className="fixed top-0 w-full bottom-0 min-h-screen bg-gradient-to-bl from-pink-700  to-purple-700 background-animateVertical mix-blend-difference" />
        <div className="fixed top-0 w-full bottom-0 min-h-screen bg-gradient-to-br from-slate-700  to-blue-700 background-animateHorizontal mix-blend-difference" />
        <header id="headerSection" className="relative flex flex-row h-16 place-items-center bg-gray-700 rounded-lg shadow-xl m-3">
          <div className="flex justify-between w-full mx-10 ">
            <div>
              <NavLink to="/">
                <div className="hidden sm:block">
                  <span className="text-white font-mono font-extrabold text-xl">Stack</span>
                  <span className="text-xl text-slate-300 font-mono font-extrabold">Factory</span>
                  <span className="text-purple-400 font-mono font-extrabold">.dev</span>
                </div>
                <div className="sm:hidden">
                  <span className="text-white font-mono font-extrabold text-xl">S</span>
                  <span className="text-xl text-slate-300 font-mono font-extrabold">F</span>
                  <span className="text-purple-400 font-mono font-extrabold">.dev</span>
                </div>
              </NavLink>
            </div>

            <div className="flex gap-2 sm:gap-3" >
              {
                MyLinks().map((element, index) => (
                  <NavLink key={index} to={element.href} className={({ isActive }) => { return element.color + " " + "hover:underline " + (isActive ? "underline" : "") }} viewTransition>{element.title}</NavLink>
                ))
              }
            </div>
          </div>
        </header>
        <section id="breadcrumbsSection" className="relative container rounded-md mx-auto shadow-lg pl-3 bg-slate-400">
          <ol>
            {matches
              .filter(
                (match) =>
                  match.handle && match.handle.breadcrumb
              )
              .map((match, index) => (
                <li key={index}>
                  {match.handle.breadcrumb(match)}
                </li>
              ))}
          </ol>
        </section>

        <section id="nestedComponentsSection" className="relative container mb-10 mx-auto rounded-lg">
          {children}
        </section>

        <footer id="footerSection" className="relative mt-auto m-3 shadow-xl">
          <div className="bg-gray-700 h-16 rounded-lg">
            <ul className="flex justify-evenly gap-2 sm:gap-20 place-items-center h-16 text-xs text-slate-300 ">
              <span className="hidden xs:block">
                © 2024 StackFactory.dev
              </span>
              <span className="xs:hidden">
                © 2024 SF.dev
              </span>
              <li key="1">
                <NavLink to="/contact" className={({ isActive }) => { return "hover:underline " + (isActive ? "underline" : "") }} viewTransition>Contact</NavLink>
              </li>
              <li key="2">
                <NavLink to="/social" className={({ isActive }) => { return "hover:underline " + (isActive ? "underline" : "") }} viewTransition>Social</NavLink>
              </li>
              <li key="3">
                <NavLink to="/impressum" className={({ isActive }) => { return "hover:underline " + (isActive ? "underline" : "") }} viewTransition>Impressum</NavLink>
              </li>
              <li key="4">
                <NavLink to="/privacy" className={({ isActive }) => { return " hover:underline " + (isActive ? "underline" : "") }} viewTransition>
                  <span className="hidden xs:block">
                    Privacy Policy
                  </span>
                  <span className="xs:hidden">
                    Privacy
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body >
    </html >
  );
}

export default function App() {
  return <Outlet />;
}
