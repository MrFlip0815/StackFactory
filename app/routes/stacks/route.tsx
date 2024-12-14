import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import StackComponent from "~/components/stack";

export const meta: MetaFunction = () => {
  return [
    { title: "StackFactory Mission" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const handle = {
  breadcrumb: () => <div className="font-mono font-thin text-xs"><Link to="/">Home</Link> / Stacks</div>
};

export default function Index() {
  return (
    <section className="my-10 shadow-lg rounded-lg p-5 bg-slate-300">
      <div className="flex justify-center mb-10">
        <h1 className="text-xl font-mono">Choose your Stack</h1>
      </div>
      <article>
        <h2 className="textl font-mono">
          Trusty and Proven (.NET Based)
        </h2>
        <div className="flex flex-wrap">
          <div className="m-2 shadow-lg">
            <StackComponent title="Base" layer0="Azure" layer1=".NET" layer2="Remix"></StackComponent>
          </div>
          <div className="m-2 shadow-lg">
            <StackComponent title="API" layer0="Azure" layer1="SQL" layer2=".NET"></StackComponent>
          </div>

        </div>
        <h2 className="textl font-mono">
          Prototyping (Python Based)
        </h2>
        <div className="flex flex-wrap">
          <div className="m-2 shadow-lg">
            <StackComponent title="Rapid Python" layer0="Azure" layer1="Python" layer2="Alpine"></StackComponent>
          </div>
          <div className="m-2 shadow-lg">
            <StackComponent title="API" layer0="Azure" layer1="SQL" layer2=".NET"></StackComponent>
          </div>
          <div className="m-2 shadow-lg">
            <StackComponent title="Custom" layer0="Touch" layer1="In" layer2="Get"></StackComponent>
          </div>
        </div>

        <h2 className="textl font-mono">
          Custom (you decide)
        </h2>
        <div className="flex flex-wrap">
          <div className="m-2 shadow-lg">
            <StackComponent title="Choose" layer0="Touch" layer1="In" layer2="Get"></StackComponent>
          </div>
        </div>
      </article>
    </section>
  );
}
