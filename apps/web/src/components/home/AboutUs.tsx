export function AboutUsSection() {
  return (
    <section className="py-xl bg-surface">
      <div className="max-w-container-max mx-auto px-gutter text-center max-w-4xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-lg">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mt-xl">
          <div className="space-y-md flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-4xl">eco</span>
            <h3 className="font-headline-md text-headline-md">Our Mission</h3>
            <p className="font-body-md text-on-surface-variant">To democratize luxury by providing high-end, sustainable fashion accessible to everyone, everywhere.</p>
          </div>
          <div className="space-y-md flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-4xl">auto_awesome</span>
            <h3 className="font-headline-md text-headline-md">Our Values</h3>
            <p className="font-body-md text-on-surface-variant">Excellence, Integrity, and Innovation are at the core of every digital silk thread we weave into our collections.</p>
          </div>
          <div className="space-y-md flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-4xl">groups</span>
            <h3 className="font-headline-md text-headline-md">Community</h3>
            <p className="font-body-md text-on-surface-variant">We are more than a brand; we are a collective of dreamers and trendsetters building the future of style.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
