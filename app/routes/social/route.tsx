import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "StackFactory Social" },
        { name: "Privacy", content: "Test" },
    ];
};

export const handle = {
    breadcrumb: () => <div className="font-mono font-thin text-xs text-slate-800"><Link to="/">Home</Link> / Social</div>
};

export default function Index() {
    return (
        <section className="bg-slate-300 my-10 p-5 shadow-lg rounded-lg text-slate-800">
            <div className="flex justify-center pb-10">
                <h1 className="text-xl font-mono">Social</h1>
            </div>
            <div>
                <p>coming soon</p>
            </div>
        </section>
    );
}
