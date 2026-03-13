import { useState } from "react";
import EventCard from "../components/global_components/EventCard";
import EventGalleryModal from "../components/global_components/EventGalleryModal";
import eventBg from "../assets/eventBg.png";

const images = import.meta.glob("../assets/events/*/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const eventImages = Object.entries(images).reduce((acc, [path, img]) => {
  const folder = path.split("/")[3];

  if (!acc[folder]) acc[folder] = [];

  acc[folder].push(img);

  return acc;
}, {});

const events = [
  {
    key: "events1",
    title: "PATTS Flight Fest 2024: Skyquest",
    date: "November 20, 2024 to November 22, 2024",
    location: "PATTS College of Aeronautics | Parañaque City",
  },
  {
    key: "events2",
    title: "Event 2",
    date: "Date",
    location: "Location",
  },
  {
    key: "events3",
    title: "Event 3",
    date: "Date",
    location: "Location",
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${eventBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section
        id="events"
        className="py-20 px-6 min-h-[900px] scroll-mt-16"
      >
        <div className="text-center max-w-2xl mx-auto mb-8 mt-5">
          <h2 className="text-6xl font-semibold text-[#2B1C15] tracking-wide">
            Coffee Memories
          </h2>

          <p className="flex items-center justify-center mb-5 text-[#2B1C15] text-2xl leading-relaxed">
            Moments that brought coffee, stories, and people together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event) => {
            const gallery = eventImages[event.key] || [];
            return (
              <EventCard
                key={event.key}
                image={gallery[0]}
                title={event.title}
                date={event.date}
                location={event.location}
                onViewMore={() =>
                  setSelectedEvent({
                    title: event.title,
                    images: gallery,
                  })
                }
              />
            );
          })}
        </div>

        <EventGalleryModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          images={selectedEvent?.images || []}
          title={selectedEvent?.title}
        />
      </section>
    </div>
  );
};

export default Events;
