import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session } = await authenticate.webhook(request);

  if (!topic || topic !== "APP_UNINSTALLED") {
    return new Response("Unhandled webhook topic", { status: 404 });
  }

  console.log(" App uninstalled from shop:", shop);

  // Make HTTP request to the specified API endpoint
  try {
    const response = await fetch(
      `https://tellos-xyz.link/shopify/uninstall?shop=${shop}`,
    );
    if (!response.ok) {
      console.error("Failed to hit API endpoint. Status:", response.status);
      throw new Error("Failed to hit the API endpoint");
    }
    console.log(" Successfully notified external API about uninstall");
  } catch (error) {
    console.error("Error hitting API endpoint:", error);
  }

  return new Response("Webhook processed", { status: 200 });
};
