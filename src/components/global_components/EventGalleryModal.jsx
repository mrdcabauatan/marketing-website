import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const EventGalleryModal = ({ isOpen, onClose, images, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-5xl w-full h-[85vh] rounded-xl p-6 relative animate-modalOpen flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-2xl font-semibold text-center mb-3 text-[#2B1C15]">
          {title}
        </h3>

        <div className="flex-1">
          <Splide
            options={{
              type: "loop",
              perPage: 1,
              arrows: true,
              pagination: true,
              height: "100%",
            }}
          >
            {images.map((img, index) => (
              <SplideSlide key={index}>
                <img
                  src={img}
                  alt="event"
                  className="w-full h-[70vh] object-cover rounded-lg"
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default EventGalleryModal;
