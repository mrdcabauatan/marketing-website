import { useEffect, useRef, useState } from "react";
import homeBg from "../assets/home-bg.png";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const lightRef = useRef(null);

  useEffect(() => {
    setLoaded(true);

    const moveLight = (e) => {
      if (!lightRef.current) return;

      lightRef.current.style.left = e.clientX + "px";
      lightRef.current.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", moveLight);

    return () => window.removeEventListener("mousemove", moveLight);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* cursor light */}
      <div
        ref={lightRef}
        className="pointer-events-none fixed z-10"
        style={{
          left: "50%",
          top: "50%",
          width: "350px",
          height: "350px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0) 70%)",
          filter: "blur(50px)",
          mixBlendMode: "screen",
        }}
      />

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center px-6"
      >
        <div className="max-w-4xl">
          <h1
            className={`font-fredoka text-[#F2E6DA]
            text-[90px] sm:text-[110px] md:text-[130px] lg:text-[190px]
            font-bold leading-[0.9]
            transition-all duration-1000 ease-out
            ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              WebkitTextStroke: "1.5px #8E3B2F",
              textShadow: "0 10px 40px rgba(0,0,0,0.45)",
            }}
          >
            DOUZE
          </h1>

          <p
            className={`mt-6 text-[#F2E6DA] text-xl md:text-5xl max-w-3xl mx-auto leading-relaxed
            transition-all duration-1000 delay-300
            ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ WebkitTextStroke: "0.4px #8E3B2F" }}
          >
            Grinding beans for the night owls and midnight coffee runs.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;