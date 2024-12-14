import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import NewsComponent from "~/components/NewsSection";
import TerminalComponent from "~/components/TerminalComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "StackFactory" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const handle = {
  breadcrumb: () => <div className="font-mono font-thin text-xs text-slate-800">Home</div>
};

export default function Index() {
  return (
    <div>
      <section className="my-10 shadow-lg rounded-lg pt-5 bg-slate-400">
        <div className="flex justify-center">
          <h1 className="text-xl font-mono pb-10 text-slate-800">
            <span>Welcome to </span>
            <span className="text-white font-mono font-extrabold text-xl">Stack</span>
            <span className="text-xl text-slate-300 font-mono font-extrabold">Factory</span>
            <span className="text-purple-400 font-mono font-extrabold">.dev</span>
          </h1>
        </div>
        <div className="p-5">
          <TerminalComponent></TerminalComponent>
        </div>
      </section>
      {/* <div id="spacer" className="sm:min-h-40"></div>
      <section className="shadow-lg rounded-lg pt-5 bg-slate-200">
        <div className="flex justify-center">
          <h2 className="text-lg font-mono pb-10">News</h2>
        </div>
        <div className="p-5">
          <NewsComponent amount={4}></NewsComponent>
        </div>
      </section> */}
    </div >
  );
}