import type { ActionFunctionArgs, HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { data, Form, json, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { useState, useTransition } from "react";
import { ChatIconComponent, EmailIconComponent, HeartIconComponent, PhoneIconComponent } from "~/components/icons/icons";
import { CommentComponent } from "~/components/MessageComponent";
import { sendMail } from "~/lib/sendMail";
import { SendMailClient } from "zeptomail";

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

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": "private" }
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

  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "LIKE")
    return likeCounter.counter++;
  if (intent === "SEND_MESSAGE") {

    let from = formData.messageFrom;
    let message = "superduper";
    let apiKey = process.env.ZOHO_EMAIL_API;

    console.log(apiKey)

    let client = new SendMailClient({ url: "api.zeptomail.eu/v1.1/email/template", token: `Zoho-enczapikey ${apiKey}` });

    client.sendMailWithTemplate({
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
        "from": from,
        "message": message
      }
    }).then((resp) => console.log("success")).catch((error) => console.log(error));
  }

  return likeCounter.counter++;
}

export default function Index() {

  let { likeCounter, commentExpanded } = useLoaderData<typeof loader>();
  const [visible, setVisible] = useState(commentExpanded);
  const navigation = useNavigation();
  const isActionSubmission =
    navigation.state === "submitting";

  console.log(navigation.formAction);

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
              <CommentComponent buttonName="intent" buttonValue="SEND_MESSAGE" active={true} />
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

        <Form method="POST">
          <div className="flex">
            <div className="flex font-mono text-sm group cursor-pointer">
              <button type="submit" name="intent" value="LIKE">
                <div className="pr-1 group-hover flex">
                  <HeartIconComponent />
                </div>
              </button>
              <p className="group-hover">Or just leave a like? :) ({likeCounter.counter})</p>
            </div>
          </div>
        </Form>
      </div >
    </section >
  );
}
