import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-white mt-20 border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-xl flex flex-col md:flex-row justify-between border-t border-outline-variant/10">
        <div className="mb-xl md:mb-0 md:w-1/3">
          <Link href="/" className="block mb-md">
            <img src="/dumroo-logo.png" alt="DUMROO" className="h-16 w-auto object-contain" />
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant max-w-xs">
            Elevating your digital fashion experience through curated luxury and effortless elegance.
          </p>
          <div className="flex gap-md mt-lg">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">camera</span>
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-xl md:w-2/3">
          <div>
            <h4 className="font-label-lg text-label-lg text-primary mb-md uppercase tracking-widest">Customer Service</h4>
            <ul className="space-y-sm">
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Help Center</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Returns</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Contact Us</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Shipping Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-lg text-label-lg text-primary mb-md uppercase tracking-widest">Company Info</h4>
            <ul className="space-y-sm">
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Privacy Policy</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Terms of Use</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Sustainability</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" href="#">Careers</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-container-max mx-auto px-gutter py-md border-t border-outline-variant/10 pb-20 md:pb-8">
        <p className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-fixed-variant text-center md:text-left">
          © {new Date().getFullYear()} DUMROO COLLECTION. The Digital Silk Experience.
        </p>
      </div>
    </footer>
  );
}
