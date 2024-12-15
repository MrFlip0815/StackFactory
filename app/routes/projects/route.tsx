import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "StackFactory Projects" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const handle = {
  breadcrumb: () => <div className="font-mono font-thin text-xs text-slate-800"><Link to="/">Home</Link> / Projects</div>
};

export default function Index() {
  return (
    <section className="bg-slate-300 my-10 p-5 shadow-lg rounded-lg dark:text-slate-800">
      <div className="flex justify-center mb-10">
        <h1 className="text-xl font-mono">Projects</h1>
      </div>
      <article>
        Coming soon
      </article>
    </section>
  );
}
