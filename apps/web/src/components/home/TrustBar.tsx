export function TrustBar() {
  return (
    <section className="bg-surface-container-low border-y border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-gutter py-lg grid grid-cols-1 md:grid-cols-3 gap-lg text-center">
        <div className="flex items-center justify-center gap-md">
          <span className="material-symbols-outlined text-primary text-3xl">verified</span>
          <span className="font-label-lg text-label-lg uppercase tracking-wider">Authenticity Guaranteed</span>
        </div>
        <div className="flex items-center justify-center gap-md border-y md:border-y-0 md:border-x border-outline-variant/30 py-md md:py-0">
          <span className="material-symbols-outlined text-primary text-3xl">lock</span>
          <span className="font-label-lg text-label-lg uppercase tracking-wider">100% Secure Payments</span>
        </div>
        <div className="flex items-center justify-center gap-md">
          <span className="material-symbols-outlined text-primary text-3xl">published_with_changes</span>
          <span className="font-label-lg text-label-lg uppercase tracking-wider">Easy 30-Day Returns</span>
        </div>
      </div>
    </section>
  );
}
