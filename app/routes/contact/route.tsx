import type { ActionFunctionArgs, HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ChatIconComponent, EmailIconComponent, HeartIconComponent, PhoneIconComponent } from "~/components/icons/icons";
import { CommentComponent } from "~/components/MessageComponent";
import { SendMailClient } from "zeptomail";
import { commitSession, getSession } from "~/session";

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
  count: 0,
}

interface Counter {
  count: number
}

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": "private" }
}

export async function loader({
  request,
}: LoaderFunctionArgs) {


  const url = new URL(request.url);
  const param = url.searchParams.get("commentExpanded");
  const commentExpanded: boolean = param !== null && param === "true"

  const session = await getSession(
    request.headers.get("Cookie")
  );

  const realLikesResponse = await fetch(`${process.env.BACKEND_URL}/likes`, { headers: { "Authorization": `Bearer ${process.env.BACKEND_API_KEY}` } })

  likeCounter.count = (await realLikesResponse.json() as Counter).count;

  const likeClicked = session.get("likeClicked") || false;
  const commentSubmitted = session.get("commentSubmitted") || false;

  return { likeCounter, commentExpanded, likeClicked, commentSubmitted };
}

export async function action({
  request,
}: ActionFunctionArgs) {

  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "LIKE") {
    const session = await getSession(
      request.headers.get("Cookie")
    );

    session.set("likeClicked", true)

    const payload = {
      "userAgent": request.headers.get("user-agent"),
      "host": request.headers.get("fastly-client-ip"), // fastly specific implementation
    }

    const apiKey = process.env.BACKEND_API_KEY;
    const url = process.env.BACKEND_URL;

    const result = await fetch(`${process.env.BACKEND_URL}/addOrUpdateLike`, { body: JSON.stringify(payload), method: "POST", headers: { "Authorization": `Bearer ${process.env.BACKEND_API_KEY}`, "content-type": "application/json" } })

    return Response.json(likeCounter.count++, { headers: { "Set-Cookie": await commitSession(session) } })
  }

  else if (intent === "SEND_MESSAGE") {

    let messageFrom = formData.get("messageFrom");
    let message = formData.get("message");
    let apiKey = process.env.ZOHO_EMAIL_API;

    let client = new SendMailClient({ url: "api.zeptomail.eu/v1.1/email/template", token: `Zoho-enczapikey ${apiKey}` });

    try {
      let result = await client.sendMailWithTemplate({
        "mail_template_key": "13ef.6d366c3e0a6f41a0.k1.22839750-ba3f-11ef-9863-164305ecc9b6.193c62bcd45",
        "from": {
          "address": "office@stackfactory.dev",
          "name": "Website Contact Form"
        },
        "to": [
          {
            "email_address": {
              "address": "office@stackfactory.dev",
              "name": "Stackfactory Office"
            }
          }
        ],
        "merge_info": {
          "from": messageFrom,
          "message": message
        }
      });

      const session = await getSession(
        request.headers.get("Cookie")
      );

      session.set("commentSubmitted", true)

      return Response.json(true, { headers: { "Set-Cookie": await commitSession(session) } })

    } catch {
      // TODO
      console.log("error")
    }
  }
}


export default function Index() {

  let { likeCounter, commentExpanded, likeClicked, commentSubmitted } = useLoaderData<typeof loader>();
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
          <div className={commentSubmitted ? "flex font-mono text-sm group" : "flex font-mono text-sm group cursor-pointer"} onClick={() => { setVisible(!visible); }}>
            <div className="pr-1 group-hover">
              <ChatIconComponent filled={commentSubmitted} />
            </div>
            <p className="group-hover">
              {
                commentSubmitted ? "Your comment has been pushed on our Stack!" : "Leave a comment"
              }
            </p>
          </div>
          {!commentSubmitted &&
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


        <div className="flex">
          <Form method="POST">
            <button type="submit" name="intent" value="LIKE" disabled={likeClicked} className="text-left">
              <div className={"flex font-mono text-sm group" + (likeClicked ? "" : "cursor-pointer")}>
                <div className="pr-1 group-hover">
                  <HeartIconComponent filled={likeClicked} />
                </div>
                <p className="group-hover">
                  {
                    likeClicked ? "Your like has been pushed on our Stack!" : "Or just leave a like? :)"
                  }
                  &nbsp;({likeCounter.count})</p>
              </div>
            </button>
          </Form>
        </div>
      </div >
    </section >
  );
}
