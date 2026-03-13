import { MapPin } from "lucide-react";

const EventCard = ({ image, title, date, location, onViewMore }) => {
  return (
    <div className="bg-[#F4EDE7] border border-[#E2D6CD] rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-[180px] object-cover rounded-md"
      />

      <h3 className="mt-4 text-xl font-semibold text-[#2B1C15]">
        {title}
      </h3>

      <p className="text-sm text-[#7A5B50] mt-1">
        {date}
      </p>

      <div className="border-t border-[#E2D6CD] my-2"></div>

      <div className="flex items-center gap-2 text-[#7A5B50] text-sm">
        <MapPin size={16} />
        {location}
      </div>

      <button
        onClick={onViewMore}
        className="mt-3 w-full border border-[#C6A18B] bg-[#8E3B2F] text-white py-2 rounded-md hover:bg-[#F3E2DD] hover:text-[#8E3B2F] transition"
      >
        View More →
      </button>

    </div>
  );
};

export default EventCard;