import { SendMailClient } from "zeptomail";

export async function sendMail(from: string, message: string) {
  let client = new SendMailClient({url: "api.zeptomail.com/", token: "Zoho-enczapikey yA6KbHtf4limxT9TQkA11ZCLoo4wrqg4jH/i5H+xLs10LNnh3KE910FsKtfpITCMiI7Zta8HatkWJY/vt4xcd8FhMtMFLJTGTuv4P2uV48xh8ciEYNYjjZqsA7UXGqNAdRglDi03TvQoWA=="});

  console.log('calling send mail', from, message)

  client.sendMailWithTemplate({
    "template_key": "13ef.6d366c3e0a6f41a0.k1.22839750-ba3f-11ef-9863-164305ecc9b6.193c62bcd45",
    "from": {
        "address": from,
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
        "company": message
    },
    "reply_to": [
        {
            "address": from,
            "name": "Website Contact Form"
        }
    ],
    "mime_headers": {
        "X-Test": "test"
    }
  }).then((resp) => console.log("success")).catch((error) => console.log("error"));
}

