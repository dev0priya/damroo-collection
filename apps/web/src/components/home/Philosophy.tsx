export function Philosophy() {
  return (
    <section className="py-xl bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
        <div className="order-2 md:order-1">
          <img 
            alt="Boutique interior" 
            className="w-full rounded-xl shadow-lg h-[600px] object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACckppPumPBVqPP6oZgx6EFLjqlYl43Qo-staPhl-NqMLOW3IBB9fkrnI73Usf9maFnLiWAwKu3-D7y2nUnhPVxxrBL12CWf_Amof3tFBY3bXNEnXclsrEic2PctRhhzx5TaUIweeGiK3ZzbnaSfm0UCciBJAG6zZj2-ErQwf2qHcUlwR2Oz5MEO1P22Ou2ccWPcco7NbWgxUTuROkTHxPDLhjTA1PW-PvzPyV7gEs-gZuL4BVUm-DMhFUKIRo4aHYjCk6DX8dBjpg" 
          />
        </div>
        <div className="order-1 md:order-2 space-y-lg">
          <span className="font-label-lg text-label-lg text-primary tracking-widest uppercase">The Narrative</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Our Philosophy</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            At MODA & CO, we believe fashion is more than just clothing; it's a silent language of confidence. Founded on the principle of "Digital Silk," we curate a sensory experience that brings the meticulous craftsmanship of a luxury boutique to the effortless speed of modern e-commerce.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant italic">
            "Luxury is not about the price tag; it's about the feeling of a perfect fit and the longevity of a well-told story."
          </p>
          <button className="font-label-lg text-label-lg border-2 border-on-surface px-lg py-sm rounded hover:bg-on-surface hover:text-surface transition-all uppercase tracking-widest">
            Read More About Us
          </button>
        </div>
      </div>
    </section>
  );
}
