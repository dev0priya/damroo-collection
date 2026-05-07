"use client";

export function ReachToUs() {
  return (
    <section className="py-xl bg-surface-container-low border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-xl">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">Reach to Us</h2>
          <p className="font-body-lg text-on-surface-variant mb-xl">Have a question or want to share your digital silk journey? We'd love to hear from you.</p>
          <div className="space-y-lg">
            <div className="flex items-start gap-md">
              <span className="material-symbols-outlined text-primary">mail</span>
              <div>
                <h4 className="font-label-lg uppercase text-primary">Email</h4>
                <p className="font-body-md">concierge@modaandco.com</p>
              </div>
            </div>
            <div className="flex items-start gap-md">
              <span className="material-symbols-outlined text-primary">call</span>
              <div>
                <h4 className="font-label-lg uppercase text-primary">Phone</h4>
                <p className="font-body-md">+1 (800) MODA-SILK</p>
              </div>
            </div>
            <div className="flex items-start gap-md">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <div>
                <h4 className="font-label-lg uppercase text-primary">Address</h4>
                <p className="font-body-md">72nd Luxury Ave, Digital Fashion District, NY 10022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant/30">
          <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="space-y-xs">
                <label className="font-label-md text-on-surface-variant">Full Name</label>
                <input className="w-full bg-surface border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-md py-sm outline-none border" placeholder="John Doe" type="text"/>
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-on-surface-variant">Email Address</label>
                <input className="w-full bg-surface border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-md py-sm outline-none border" placeholder="john@example.com" type="email"/>
              </div>
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-on-surface-variant">Subject</label>
              <select className="w-full bg-surface border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-md py-sm outline-none border">
                <option>Order Support</option>
                <option>Product Inquiry</option>
                <option>General Feedback</option>
              </select>
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-on-surface-variant">Message</label>
              <textarea className="w-full bg-surface border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-md py-sm outline-none border" placeholder="How can we help?" rows={4}></textarea>
            </div>
            <button className="w-full bg-primary text-on-primary font-label-lg py-md rounded-lg hover:shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest font-black" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
