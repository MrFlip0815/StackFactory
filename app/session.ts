import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
  likeClicked: boolean;
  commentSubmitted: boolean;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "strict",
        secrets: ["s3cret1"],
        secure: true,
      },
    }
  );

export { getSession, commitSession, destroySession };