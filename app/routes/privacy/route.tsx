import type { MetaFunction } from "@remix-run/node";
import { Link, UIMatch } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "StackFactory Privacy Policy" },
        { name: "Privacy", content: "Test" },
    ];
};

export const handle = {
    breadcrumb: () => <div className="font-mono font-thin text-xs text-slate-800"><Link to="/">Home</Link> / Privacy</div>
};

export default function Index() {
    return (
        <section className="bg-slate-300 my-10 p-5 shadow-lg rounded-lg text-slate-800 font-mono text-sm">
            <div className="flex justify-center pb-10">
                <h1 className="text-xl">Privacy Policy</h1>
            </div>
            <div>
                <ul className="list-inside">
                    <li className="list-disc">
                        We do not use cookies
                    </li>
                    <li className="list-disc">
                        We do not track by using client side JavaScript libraries
                    </li>
                    <li className="list-disc">
                        We do not share, sell, distribute or talk about your data with any external company, partners, affiliates or any other entity
                    </li>
                    <li className="list-disc">
                        We will replace the google font api in the near future
                    </li>
                </ul>
            </div>
        </section>
    );
}
