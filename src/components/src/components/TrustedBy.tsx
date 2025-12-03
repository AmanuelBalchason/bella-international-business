import React from "react";

/**
 * TrustedBy
 *
 * Uses images uploaded to public/Partner's Logos/
 * Filenames expected (based on your upload):
 * - awash-bank.png
 * - commercial-bank-of-ethiopia.png
 * - dangote-industries.png
 * - east-africa-holdings.png
 * - ethio-telecom.png
 * - ethiopian_airlines.png
 *
 * This component builds safe URLs using encodeURI so spaces and the apostrophe in the folder
 * name ("Partner's Logos") don't cause 404s in the browser.
 */

const fileNames = [
  { file: "ethio-telecom.png", alt: "Ethio Telecom" },
  { file: "commercial-bank-of-ethiopia.png", alt: "Commercial Bank of Ethiopia" },
  { file: "ethiopian_airlines.png", alt: "Ethiopian Airlines" },
  { file: "dangote-industries.png", alt: "Dangote Industries" },
  { file: "awash-bank.png", alt: "Awash Bank" },
  { file: "east-africa-holdings.png", alt: "East Africa Holdings" },
];

export default function TrustedBy(): JSX.Element {
  // base path exactly as in your repo
  const basePath = `Partner's Logos`;

  // build safe image src using encodeURI
  const logos = fileNames.map((f) => ({
    src: encodeURI(`/${basePath}/${f.file}`),
    alt: f.alt,
  }));

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm uppercase text-gray-500">Trusted By</p>
        <h3 className="font-marcellus text-3xl mt-2 mb-8">Our Strategic Partners</h3>

        <div className="overflow-hidden">
          <div
            className="flex items-center gap-8 animate-marquee"
            style={{ willChange: "transform" }}
          >
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white p-6 rounded shadow-sm"
                style={{ minWidth: 220 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 object-contain block"
                  style={{ filter: "none", opacity: 1 }}
                  onError={(e) => {
                    // hide broken images and log to console so we can debug missing files
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    // eslint-disable-next-line no-console
                    console.warn("TrustedBy: failed loading image", (e.currentTarget as HTMLImageElement).src);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          gap: 2rem;
          padding: 0.5rem 0;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
