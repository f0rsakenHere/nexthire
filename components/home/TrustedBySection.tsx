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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        id="netflix_icon__Netflix_Symbol_RGB"
        version="1.1"
        viewBox="0 0 551.111 1000"
        className="w-full h-full"
      >
        <defs id="netflix_icon__defs4">
          <linearGradient id="netflix_icon__linearGradient35887">
            <stop
              id="netflix_icon__stop35883"
              offset="0"
              style={{ stopColor: "#b1060f", stopOpacity: 1 }}
            />
            <stop
              id="netflix_icon__stop36053"
              offset=".625"
              style={{ stopColor: "#7b010c", stopOpacity: 1 }}
            />
            <stop
              id="netflix_icon__stop35885"
              offset="1"
              style={{ stopColor: "#b1060f", stopOpacity: 0 }}
            />
          </linearGradient>
          <linearGradient id="netflix_icon__linearGradient19332">
            <stop
              id="netflix_icon__stop19328"
              offset="0"
              style={{ stopColor: "#b1060f", stopOpacity: 1 }}
            />
            <stop
              id="netflix_icon__stop19560"
              offset=".546"
              style={{ stopColor: "#7b010c", stopOpacity: 1 }}
            />
            <stop
              id="netflix_icon__stop19330"
              offset="1"
              style={{ stopColor: "#e50914", stopOpacity: 0 }}
            />
          </linearGradient>
          <linearGradient
            xlinkHref="#netflix_icon__linearGradient19332"
            id="netflix_icon__linearGradient13368"
            x1="78.234"
            x2="221.663"
            y1="423.767"
            y2="365.092"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#netflix_icon__linearGradient35887"
            id="netflix_icon__linearGradient35889"
            x1="456.365"
            x2="309.676"
            y1="521.56"
            y2="583.495"
            gradientUnits="userSpaceOnUse"
          />
        </defs>
        <path
          id="netflix_icon__path6055"
          d="M-1.152-1.152 2.305 1002.67c73.273-14.111 130.892-12.569 195.924-18.44V0Z"
          style={{
            fill: "url(#netflix_icon__linearGradient13368)",
            stroke: "none",
            strokeWidth: "1px",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeOpacity: 1,
            fillOpacity: 1,
          }}
        />
        <path
          id="netflix_icon__path678"
          d="M353.816 0h199.381l2.305 1000.365-202.839-33.422z"
          style={{
            fill: "url(#netflix_icon__linearGradient35889)",
            stroke: "none",
            strokeWidth: "1px",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeOpacity: 1,
            fillOpacity: 1,
          }}
        />
        <path
          id="netflix_icon__path362"
          d="M1.152 0c4.61 11.525 345.749 981.925 345.749 981.925 56.056-.4 131.219 8.754 205.144 17.288L197.077 0Z"
          style={{
            fill: "#e50914",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: "1px",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeOpacity: 1,
          }}
        />
      </svg>
    ),
  },
  {
    name: "Amazon",
    svg: (
      <svg
        xmlSpace="preserve"
        viewBox="0 0 304 182"
        className="w-full h-full text-white"
      >
        <path
          fill="#ffffff"
          d="m86 66 2 9c0 3 1 5 3 8v2l-1 3-7 4-2 1-3-1-4-5-3-6c-8 9-18 14-29 14-9 0-16-3-20-8-5-4-8-11-8-19s3-15 9-20c6-6 14-8 25-8a79 79 0 0 1 22 3v-7c0-8-2-13-5-16-3-4-8-5-16-5l-11 1a80 80 0 0 0-14 5h-2c-1 0-2-1-2-3v-5l1-3c0-1 1-2 3-2l12-5 16-2c12 0 20 3 26 8 5 6 8 14 8 25v32zM46 82l10-2c4-1 7-4 10-7l3-6 1-9v-4a84 84 0 0 0-19-2c-6 0-11 1-15 4-3 2-4 6-4 11s1 8 3 11c3 2 6 4 11 4zm80 10-4-1-2-3-23-78-1-4 2-2h10l4 1 2 4 17 66 15-66 2-4 4-1h8l4 1 2 4 16 67 17-67 2-4 4-1h9c2 0 3 1 3 2v2l-1 2-24 78-2 4-4 1h-9l-4-1-1-4-16-65-15 64-2 4-4 1h-9zm129 3a66 66 0 0 1-27-6l-3-3-1-2v-5c0-2 1-3 2-3h2l3 1a54 54 0 0 0 23 5c6 0 11-2 14-4 4-2 5-5 5-9l-2-7-10-5-15-5c-7-2-13-6-16-10a24 24 0 0 1 5-34l10-5a44 44 0 0 1 20-2 110 110 0 0 1 12 3l4 2 3 2 1 4v4c0 3-1 4-2 4l-4-2c-6-2-12-3-19-3-6 0-11 0-14 2s-4 5-4 9c0 3 1 5 3 7s5 4 11 6l14 4c7 3 12 6 15 10s5 9 5 14l-3 12-7 8c-3 3-7 5-11 6l-14 2z"
        />
        <path
          d="M274 144A220 220 0 0 1 4 124c-4-3-1-6 2-4a300 300 0 0 0 263 16c5-2 10 4 5 8z"
          fill="#f90"
        />
        <path
          d="M287 128c-4-5-28-3-38-1-4 0-4-3-1-5 19-13 50-9 53-5 4 5-1 36-18 51-3 2-6 1-5-2 5-10 13-33 9-38z"
          fill="#f90"
        />
      </svg>
    ),
  },
  {
    name: "Spotify",
    svg: (
      <svg
        viewBox="0 0 256 256"
        preserveAspectRatio="xMidYMid"
        className="w-full h-full"
      >
        <path
          d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z"
          fill="#1ED760"
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
      <div className="relative flex overflow-hidden group max-w-7xl mx-auto mask-gradient py-12">
        {/* Edge Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-20 animate-marquee hover:[animation-play-state:paused] w-max items-center pl-4">
          {/* Loop 1 */}
          {companies.map((company, index) => (
            <div
              key={index}
              className="h-14 w-auto min-w-[120px] px-6 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/logo flex items-center justify-center transform hover:scale-110"
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
              className="h-14 w-auto min-w-[120px] px-6 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/logo flex items-center justify-center transform hover:scale-110"
            >
              <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover/logo:opacity-50 transition-opacity duration-300 rounded-full" />
              {company.svg}
            </div>
          ))}

          {/* Loop 3 (Extra Duplicate for Wide Screens) */}
          {companies.map((company, index) => (
            <div
              key={`dup2-${index}`}
              className="h-14 w-auto min-w-[120px] px-6 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/logo flex items-center justify-center transform hover:scale-110"
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
