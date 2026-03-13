import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import "@splidejs/react-splide/css";

const images = Object.values(
  import.meta.glob("../assets/gallery/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

const scrollToEvents = () => {
    const eventSection = document.querySelector("#events");
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: "smooth" });
    }
  };

const Gallery = () => {
  return (
    <section id="gallery" className="bg-[#F5EFE8] py-15 px-6 md:px-20">
      <div className="grid lg:grid-cols-[0.2fr_0.8fr] gap-16 items-start">
        {/* LEFT SECTION */}
        <div className="max-w-[420px] mt-15">
          <h2 className="text-6xl font-semibold text-[#2B1C15] mb-7">
            Gallery
          </h2>

          <p className="text-[#2B1C15] text-2xl leading-relaxed mb-10">
            Step into our pop-up coffee corner, where rich aromas, thoughtful
            brews, and warm conversations make every sip memorable.
          </p>

          {/* VIEW EVENTS BUTTON */}
          <button
            onClick={() => {
              const eventsSection = document.querySelector("#events");
              if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex items-center gap-3 px-7 py-4 bg-[#8E3B2F] border-2 border-[#8E3B2F] text-white
             rounded-xl text-lg font-medium hover:bg-[#F3E2DD] hover:text-[#8E3B2F] transition-all duration-300"
          >
            Explore Our Events
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-[#E3D7CB] p-8 rounded-2xl border border-[#E6D9CC] shadow-sm mt-6">
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              focus: "center",
              gap: "1.5rem",
              arrows: true,
              pagination: false,
              drag: true,
              autoScroll: {
                speed: 0.5,
              },
              breakpoints: {
                1024: {
                  perPage: 2,
                },
                640: {
                  perPage: 1,
                },
              },
            }}
            extensions={{ AutoScroll }}
          >
            {images.map((img, i) => (
              <SplideSlide key={i}>
                <div className="gallery-slide relative group">
                  <img
                    src={img}
                    alt={`Gallery ${i}`}
                    className="gallery-image"
                    loading="lazy"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
