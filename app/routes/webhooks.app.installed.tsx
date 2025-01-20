import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, payload } = await authenticate.webhook(request);

  if (!topic || topic !== "APP_INSTALLED") {
    return new Response("Unhandled webhook topic", { status: 404 });
  }

  console.log("🎉 App installed on store:", shop);
  console.log("Store details:", payload);

  return new Response("Webhook processed", { status: 200 });
};
