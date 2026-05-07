export default function AboutPage() {
  return <StaticPage title="About Damroo" body="Damroo Collection curates Indian and contemporary clothing with transparent pricing, size clarity, and reliable customer support." />;
}

function StaticPage({ title, body }: { title: string; body: string }) {
  return <section className="mx-auto max-w-3xl px-4 py-12"><h1 className="text-3xl font-black">{title}</h1><p className="mt-4 leading-8 text-stone-700">{body}</p></section>;
}
