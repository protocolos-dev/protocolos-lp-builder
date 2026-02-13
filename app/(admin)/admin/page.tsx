import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminPage() {
  const landingPages = await prisma.landingPage.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Landing Pages
          </h1>
          <Link
            href="/admin/editor/new"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            + New Landing Page
          </Link>
        </div>

        {landingPages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              No landing pages created yet.
            </p>
            <Link
              href="/admin/editor/new"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Create your first landing page →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((lp) => (
              <div
                key={lp.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {lp.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Subdomain: <span className="font-mono">{lp.slug}</span>
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  Updated on:{" "}
                  {new Date(lp.updatedAt).toLocaleDateString("en-US")}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/editor/${lp.slug}`}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded text-center hover:bg-purple-700 transition-colors"
                  >
                    Edit
                  </Link>
                  <a
                    href={`/${lp.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded text-center hover:bg-gray-300 transition-colors"
                  >
                    Preview
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
