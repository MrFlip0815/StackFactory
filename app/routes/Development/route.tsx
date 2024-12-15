import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { TSFlask, TSGit, TSGraphQL, TSHtml5, TSIconAzure, TSIconCSharp } from "~/components/icons/tech/techstackicons";

export const meta: MetaFunction = () => {
  return [
    { title: "StackFactory Development" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const handle = {
  breadcrumb: () => <div className="font-mono font-thin text-xs text-slate-800"><Link to="/">Home</Link> / Development</div>
};

export default function Index() {
  return (



    <section className="bg-slate-300 my-10 p-5 rounded-lg shadow-lg">
      <div className="flex justify-center mb-10">
        <h1 className="text-xl font-mono">Development</h1>
      </div>
      <article>
        Coming soon
      </article>

      {/* <div className="flex gap-3">
        <div className="max-w-10 font-mono text-sm">
          <TSIconAzure></TSIconAzure>
          <p>Azure</p>
        </div>

        <div className="max-w-10 font-mono text-sm">
          <TSIconCSharp></TSIconCSharp>
          <p>CSharp</p>
        </div>

        <div className="max-w-10 font-mono text-sm">
          <TSFlask></TSFlask>
          <p>Flask</p>
        </div>

        <div className="max-w-10 font-mono text-sm">
          <TSGit></TSGit>
          <p>Git</p>
        </div>

        <div className="max-w-10 font-mono text-sm">
          <TSGraphQL></TSGraphQL>
          <p>GraphQL</p>
        </div>

        <div className="max-w-10 font-mono text-sm">
          <TSHtml5></TSHtml5>
          <p>Html5</p>
        </div>
      </div> */}

    </section >
  );
}
