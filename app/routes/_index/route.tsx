// app/routes/_index.tsx

import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

// If "login" is located somewhere else, adjust this import:
import { login } from "../../shopify.server";

// Loader: If there's a "?shop" query param, redirect to /app; otherwise define `showForm`
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  return { showForkButton: Boolean(login) };
};

export default function IndexPage() {
  const { showForkButton } = useLoaderData<typeof loader>();

  return (
    <div className="relative min-h-screen bg-white text-gray-800 flex flex-col">
      {/*
        ===========================
        HERO / HEADER SECTION
      ===========================
      */}
      <header className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Shopify App Template - Remix
          </h1>
          <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-gray-600">
            This template streamlines building Shopify apps using the Remix
            framework. It’s optimized for Vercel deployment and includes
            built-in Tailwind CSS support. A perfect solution to speed up
            development and handle the gaps in official Shopify documentation
            for deploying on Vercel.
          </p>
        </div>
      </header>

      {/*
        ===========================
        FORK BUTTON (CONDITIONAL)
      ===========================
      */}
      {showForkButton && (
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-md p-4 text-center">
            <a
              href="https://github.com/aaronarrays/shopify-vercel-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-blue-600 py-3 px-6 font-semibold text-white hover:bg-blue-700"
            >
              Fork this Repository on GitHub
            </a>
          </div>
        </div>
      )}

      {/*
        ===========================
        MAIN CONTENT: INSTRUCTIONS
      ===========================
      */}
      <main className="container mx-auto flex-grow px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Installation Instructions
          </h2>
          <p className="mb-4 text-gray-700">
            Follow these steps to set up and deploy your Shopify app:
          </p>

          <ol className="mb-10 list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Fork the Repository:</strong> Start by forking this
              repository to your GitHub account.
            </li>
            <li>
              <strong>Update Configuration Files:</strong> Modify
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                shopify.app.toml
              </code>
              and
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                package.json
              </code>
              with your information (app name, handle, URLs, and client_id).
            </li>
            <li>
              <strong>Create a .env File:</strong> Include your secrets (
              <code className="bg-gray-200 px-1 py-0.5 text-sm">
                SHOPIFY_API_KEY
              </code>
              ,
              <code className="bg-gray-200 px-1 py-0.5 text-sm">
                SHOPIFY_API_SECRET
              </code>
              , scopes, and database URLs, etc.).
            </li>
            <li>
              <strong>Install Dependencies:</strong>{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                npm install
              </code>
            </li>
            <li>
              <strong>Generate and Migrate Prisma:</strong>{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                npx prisma generate
              </code>{" "}
              and{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                npx prisma migrate deploy
              </code>
              .
            </li>
            <li>
              <strong>Deploy to Vercel:</strong> Create a new project on Vercel,
              configure environment variables, and deploy.
            </li>
            <li>
              <strong>Commit Your Changes:</strong> Keep your repository up to
              date using Git commands:
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                git add .
              </code>
              ,
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                git commit -m ...
              </code>
              ,
              <code className="mx-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
                git push origin main
              </code>
              .
            </li>
            <li>
              <strong>Deploy to Shopify:</strong>{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                shopify app deploy
              </code>
              . Your app is now ready to install and use!
            </li>
          </ol>

          {/* Features */}
          <h3 className="mb-4 text-xl font-bold text-gray-800">Features</h3>
          <ul className="mb-8 list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Optimized for Vercel:</strong> Seamless deployment with
              tailored configurations.
            </li>
            <li>
              <strong>Built-in Tailwind CSS:</strong> Style your app efficiently
              with Tailwind.
            </li>
            <li>
              <strong>Shopify Integration:</strong> Includes Polaris, AppBridge,
              and Webhooks for enhanced functionality.
            </li>
          </ul>

          {/* Need Help? */}
          <h3 className="mb-2 text-xl font-bold text-gray-800">Need Help?</h3>
          <p className="mb-4 text-gray-700">
            Feel free to reach out for assistance or customization:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:kaizendesarrollador@gmail.com"
                className="text-blue-600 hover:underline"
              >
                kaizendesarrollador@gmail.com
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/aaronarrays"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/aaronarrays
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/aaronkaizen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.linkedin.com/in/aaronkaizen/
              </a>
            </li>
          </ul>
          <p className="mt-8 text-gray-600">
            This template was built to drastically reduce time and complexity
            when deploying Shopify apps to Vercel—previously a longer, more
            fragmented process.
          </p>
        </div>
      </main>

      {/*
        ===========================
        FOOTER
      ===========================
      */}
      <footer className="bg-gray-900 py-6 text-gray-300">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          <p className="mb-2 text-sm md:mb-0">
            © {new Date().getFullYear()} -{" "}
            <span className="font-semibold">Aaron Kaizen</span>.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:kaizendesarrollador@gmail.com"
              className="text-sm text-gray-300 hover:text-white"
            >
              Email
            </a>
            <a
              href="https://github.com/aaronarrays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aaronkaizen/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
