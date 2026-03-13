import { MapPin, Instagram, Facebook, Mail, Phone } from "lucide-react";
import map from "../assets/map.png";

const FindUsHere = () => {
  return (
    <section
      id="findus"
      className="w-full min-h-screen bg-[#D0CAC2] px-10 py-20 flex justify-center"
    >
      <div className="mt-10 max-w-6xl w-full grid md:grid-cols-2 gap-16 items-start">
        <div className="border-2 border-solid border-[#caa89a] rounded-xl bg-[#d8d1c8] overflow-hidden max-w-lg">
          <img
            src={map}
            alt="Location Map"
            className="w-full h-70 object-cover"
          />

          <div className="p-6 text-[#8b3a2b]">
            <div className="flex items-center gap-2 font-semibold mb-1 text-xl">
              <MapPin size={22} />
              Our Location
            </div>

            <p className="text-lg mb-1">
              Ireneville, Parañaque, Philippines, 1700
            </p>

            <p className="text-lg">Day</p>
            <p className="text-lg mb-3">Time</p>

            <button
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/yft5ERm4d77wxgnt7",
                  "_blank",
                )
              }
              className="flex items-center gap-3 px-7 py-4 bg-[#8E3B2F] border-2 border-[#8E3B2F] text-white
              rounded-xl text-lg font-medium hover:bg-[#F3E2DD] hover:text-[#8E3B2F] transition-all duration-300"
            >
              Open in Google Maps
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center justify-center gap-6 mb-3 mt-5">
            <h2 className="text-6xl font-semibold text-[#2B1C15] tracking-wide">
              Meet Us at Douze
            </h2>
          </div>

          <p className="flex items-center justify-center mb-5 text-[#2B1C15] text-2xl leading-relaxed">
            Drop by for a cozy night coffee or message us anytime.
          </p>

          <div className="flex justify-center gap-2 mb-5 text-[#8b3a2b]">
            <div
              title="Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/douzecoffee_/", "_blank")
              }
              className="bg-[#8E3B2F] p-1 w-10 h-10 rounded-md cursor-pointer flex items-center justify-center
              transition-all duration-300 hover:bg-[#F3E2DD]"
            >
              <Instagram
                size={50}
                className="transition-transform duration-300 text-white hover:scale-130 hover:text-[#8E3B2F]"
              />
            </div>
            <div
              title="Facebook"
              onClick={() =>
                window.open("https://www.facebook.com/douzecoffee", "_blank")
              }
              className="bg-[#8E3B2F] p-1 w-10 h-10 rounded-md cursor-pointer flex items-center justify-center
              transition-all duration-300 hover:bg-[#F3E2DD]"
            >
              <Facebook
                size={50}
                className="transition-transform duration-300 text-white hover:scale-130 hover:text-[#8E3B2F]"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#8E3B2F] p-1 w-10 h-10 rounded-md flex items-center justify-center">
                <Phone size={26} className="text-white" />
              </div>
              <span className="text-lg font-medium text-[#8E3B2F]">
                0967 566 3022
              </span>
            </div>
          </div>

          <div className="mt-10 text-[#8b3a2b] text-lg text-center md:text-left">
            <p>Thank you for stopping by!</p>
            <p className="font-semibold">Love, Douze ☕</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUsHere;
