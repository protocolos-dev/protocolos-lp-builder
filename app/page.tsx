import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-6">Landing Page Builder</h1>
        <p className="text-2xl mb-12 opacity-90">
          Crie landing pages incríveis com arrastar e soltar
        </p>
        <Link
          href="/admin"
          className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
        >
          Acessar Painel Admin
        </Link>
      </div>
    </div>
  );
}
