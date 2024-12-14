import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ChatIconComponent, EmailIconComponent, HeartIconComponent, PhoneIconComponent } from "~/components/icons/icons";
import { CommentComponent } from "~/components/MessageComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "StackFactory Contact" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const handle = {
  breadcrumb: () => <div className="font-mono font-thin text-xs text-slate-800"><Link to="/">Home</Link> / Contact</div>
};

const likeCounter: Counter = {
  counter: 0,
}

interface Counter {
  counter: number
}

export async function loader({
  request,
}: LoaderFunctionArgs) {

  const url = new URL(request.url);
  const commentExpanded: boolean = url.searchParams.get("commentExpanded") != null;

  return { likeCounter, commentExpanded };
}

export async function action({
  request,
}: ActionFunctionArgs) {
  console.log(request);

  const formData = await request.formData()
  const intent = formData.get("intent")

  console.log(intent)

  if (intent === "LIKE")
    return likeCounter.counter++;
  if (intent === "SEND_MESSGE")
    return likeCounter.counter++;

  return likeCounter;
}

export default function Index() {

  const { likeCounter, commentExpanded } = useLoaderData<typeof loader>();
  const [visible, setVisible] = useState(commentExpanded);

  return (
    <section className="bg-slate-300 my-10 p-5 shadow-lg rounded-lg text-slate-800">
      <div className="flex justify-center pb-10">
        <h1 className="text-xl font-mono">Get in Contact</h1>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex">
          <div className="flex font-mono text-sm group">
            <div className="pr-1 group-hover">
              <EmailIconComponent />
            </div>
            <a href="mailto:office@stackfactory.dev?subject=Contact%20via%20website" className="group-hover">
              office@stackfactory.dev
            </a>
          </div>
        </div>
        <div className="flex-col">
          <div className="flex font-mono text-sm group cursor-pointer" onClick={() => { setVisible(!visible); }}>
            <div className="pr-1 group-hover">
              <ChatIconComponent />
            </div>
            <p className="group-hover">Leave a comment</p>
          </div>
          {
            <Form method="POST" className={"w-full lg:w-2/3 xl:w-1/2 overflow-hidden transition-all ease-in " + (visible ? "opacity-100 py-3" : "h-0 py-0 opacity-0")}>
              <CommentComponent buttonName="intent" buttonValue="SEND_MESSAGE" />
            </Form>
          }
        </div>

        <div className="flex">
          <div className="flex font-mono text-sm group cursor-pointer">
            <div className="pr-1 group-hover">
              <PhoneIconComponent />
            </div>
            <p className="group-hover">Call for emergencies</p>
          </div>
        </div>

        <Form method="post">
          <div className="flex">
            <div className="flex font-mono text-sm group cursor-pointer">
              <button type="submit" name="intent" value="LIKE">
                <div className="pr-1 group-hover flex">
                  <HeartIconComponent />
                  <p className="group-hover">Or just leave a like? :) ({likeCounter.counter})</p>
                </div>
              </button>
            </div>
          </div>
        </Form>
      </div >
    </section >
  );
}
