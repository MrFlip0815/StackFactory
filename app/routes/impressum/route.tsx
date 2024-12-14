import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "StackFactory Impressum" },
        { name: "Privacy", content: "Test" },
    ];
};

export const handle = {
    breadcrumb: () => <div className="font-mono font-thin text-xs text-slate-800"><Link to="/">Home</Link> / Impressum</div>
};

export default function Index() {
    return (
        <section className="bg-slate-300 my-10 p-5 shadow-lg rounded-lg text-slate-800">
            <div className="flex justify-center pb-10">
                <h1 className="text-xl font-mono">Impressum</h1>
            </div>
            <div>
                <ul>
                    <li>
                        Stefan Simmer
                    </li>
                    <li>
                        4050 Traun
                    </li>
                    <li>
                        Muldenweg 14b
                    </li>
                    <li>
                        Tel: +43 676 3442251
                    </li>
                    <li>
                        E-Mail: office@stackfactory.dev
                    </li>
                </ul>
            </div>
        </section>
    );
}
