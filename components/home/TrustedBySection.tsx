"use client";

const companies = [
  {
    name: "Google",
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          className="fill-[#4285F4]"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          className="fill-[#34A853]"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          className="fill-[#FBBC05]"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          className="fill-[#EA4335]"
        />
      </svg>
    ),
  },
  {
    name: "Microsoft",
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path d="M1 1h10v10H1z" className="fill-[#F25022]" />
        <path d="M13 1h10v10H13z" className="fill-[#7FBA00]" />
        <path d="M1 13h10v10H1z" className="fill-[#00A4EF]" />
        <path d="M13 13h10v10H13z" className="fill-[#FFB900]" />
      </svg>
    ),
  },
  {
    name: "Meta",
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M23.9981 12.0003C23.9981 5.37269 18.6258 0.000305176 11.9981 0.000305176C5.37059 0.000305176 -0.00195312 5.37269 -0.00195312 12.0003C-0.00195312 17.9904 4.38799 22.9535 10.1231 23.8542V15.4691H7.07524V12.0003H10.1231V9.35634C10.1231 6.34915 11.9135 4.69363 14.6548 4.69363C15.9681 4.69363 17.3421 4.92837 17.3421 4.92837V7.88175H15.8282C14.3379 7.88175 13.8731 8.80662 13.8731 9.75583V12.0003H17.2009L16.6687 15.4691H13.8731V23.8542C19.6083 22.9535 23.9981 17.9904 23.9981 12.0003Z"
          className="fill-[#0081FB]"
        />
      </svg>
    ),
  },
  {
    name: "Netflix",
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M5.006 20.37h2.895l.006-11.859 6.837 11.875h3.693V3.618h-2.889l-.004 11.9-6.837-11.9H5.006v16.752Z"
          className="fill-[#E50914]"
        />
      </svg>
    ),
  },
  {
    name: "Amazon",
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full text-white">
        <path
          d="M13.435 14.128c-2.458 1.83-5.266 1.34-6.494.613-.39-.234-.516-.543-.371-.976l1.04-3.52c.168-.53.593-.566 1.097-.246 1.707 1.05 4.098 1.011 4.673.238.25-.332.063-1.02-.68-1.574-3.535-2.61-2.074-6.68 1.89-6.68 1.957 0 3.73.684 4.5 1.14.329.196.426.602.27.997l-1.02 2.87c-.172.536-.613.567-1.023.274-.696-.484-1.922-.84-2.817-.63-1.355.32-1.285 1.72-.016 2.59 4.316 2.922 1.637 6.946-2.05 6.946l1.004-2.043z"
          fill="currentColor"
        />
        <path
          d="M19.703 16.035c-.172-.258-.293-.207-.504-.008-1.66 1.68-4.254 1.832-6.527.766-.465-.219-.66-.082-.375.344 1.586 2.309 5.379 2.129 7.426.047.309-.32.227-.82-.02-1.149zm-8.867-1.1s-.29-.27-.797-.04c-.66.305-1.02.485-1.02.485s.55.352 1.156.403c.516.039.66-.848.66-.848z"
          fill="#FF9900"
        />
      </svg>
    ),
  },
  {
    name: "Spotify",
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.118-.96-.539-.12-.42.118-.84.54-.96 4.68-1.079 8.64-.719 11.76 1.2.36.18.48.6.24.96zm1.44-3.3c-.3.48-.841.6-1.26.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
          className="fill-[#1DB954]"
        />
      </svg>
    ),
  },
];

export function TrustedBySection() {
  return (
    <section className="py-12 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <p className="text-white/40 text-sm uppercase tracking-[0.2em] font-medium">
          Candidates hired by top companies
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group max-w-7xl mx-auto mask-gradient">
        {/* Edge Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-20 animate-marquee hover:[animation-play-state:paused] w-max items-center pl-4">
          {/* Loop 1 */}
          {companies.map((company, index) => (
            <div
              key={index}
              className="h-12 w-auto min-w-[120px] px-2 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/logo flex items-center justify-center transform hover:scale-110"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover/logo:opacity-50 transition-opacity duration-300 rounded-full" />
              {company.svg}
            </div>
          ))}

          {/* Loop 2 (Duplicate for Seamless Scroll) */}
          {companies.map((company, index) => (
            <div
              key={`dup-${index}`}
              className="h-12 w-auto min-w-[120px] px-2 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/logo flex items-center justify-center transform hover:scale-110"
            >
              <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover/logo:opacity-50 transition-opacity duration-300 rounded-full" />
              {company.svg}
            </div>
          ))}

          {/* Loop 3 (Extra Duplicate for Wide Screens) */}
          {companies.map((company, index) => (
            <div
              key={`dup2-${index}`}
              className="h-12 w-auto min-w-[120px] px-2 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/logo flex items-center justify-center transform hover:scale-110"
            >
              <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover/logo:opacity-50 transition-opacity duration-300 rounded-full" />
              {company.svg}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
