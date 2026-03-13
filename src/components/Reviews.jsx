import { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import {
  Coffee,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

const REVIEWS_PER_PAGE = 4;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9eYd74nR6fTPQJ08eGgzCR8_4tcusDZSHATU8-YUP1nUkYx6-B7vj3S-gnLEEvrd0F8bMdOZ_v69K/pub?gid=1034349029&single=true&output=csv";
  const FORM_LINK = "https://forms.gle/fSA5nyKoYbEdR7BV6";

  useEffect(() => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const validData = results.data
          .filter((rev) => rev["Name"] && rev["Share your thoughts"])
          .map((rev) => ({
            name: rev["Name"],
            text: rev["Share your thoughts"],
            rating: Number(rev["How would you rate us? "]),
            date: rev["Timestamp"],
          }));

        setReviews(validData.reverse());
        setLoading(false);
      },
      error: () => setLoading(false),
    });
  }, []);

  const handleReviewClick = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 10000);
  };

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const renderStars = (rating) => (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Coffee
            key={i}
            size={16}
            className={
              i < rating ? "fill-[#8E3B2F] text-[#8E3B2F]" : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-[#8E3B2F] text-sm font-semibold">{rating}.0</span>
    </div>
  );

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;

    if (distance > minSwipeDistance && page < totalPages - 1) {
      setPage(page + 1);
    }

    if (distance < -minSwipeDistance && page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <section
      id="reviews"
      className="min-h-screen w-full bg-[#D0CAC2] pt-10 pb-16 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-2">
          <h2 className="text-6xl font-semibold text-[#2B1C15]">
            Reviews
          </h2>
        </div>
        <div className="text-center mb-3">
          <p className="text-[#2B1C15] text-2xl leading-relaxed mb-2">
            Loved your coffee? Let us know!
          </p>

          {reviews.length > 0 && (
            <div className="flex justify-center items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Coffee
                    key={i}
                    size={18}
                    className={
                      i < Math.round(averageRating)
                        ? "fill-[#8E3B2F] text-[#8E3B2F]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="text-[#8E3B2F] font-semibold">
                {averageRating} / 5
              </span>

              <span className="text-sm text-[#8E3B2F]/60">
                ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="text-center mb-5">
          {!submitted ? (
            <a
              href={FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleReviewClick}
              className="inline-block bg-[#8E3B2F] text-white px-10 py-3 rounded-md 
              hover:bg-[#7a3127] transition duration-300 shadow-md font-medium"
            >
              Write a Review
            </a>
          ) : (
            <div className="flex flex-col items-center">
              <CheckCircle className="text-[#8E3B2F] mb-2" size={32} />
              <p className="text-[#8E3B2F] font-semibold text-xl">
                Thank you for sharing!
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#8E3B2F]/60 animate-pulse">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-[#F5EFE8]/50 border-2 border-dashed border-[#8E3B2F]/20 rounded-xl p-12 text-center max-w-2xl mx-auto">
            <MessageSquare
              className="mx-auto text-[#8E3B2F]/30 mb-4"
              size={48}
            />
            <p className="text-[#8E3B2F] font-semibold text-xl mb-2">
              Our review board is a blank slate!
            </p>
            <p className="text-[#8E3B2F]/70 italic leading-relaxed">
              Be the first to pour your thoughts and help us brew the perfect
              experience.
            </p>
          </div>
        ) : (
          <div className="relative flex items-center">
            {totalPages > 1 && (
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="absolute -left-12 md:-left-16 p-3 rounded-full border border-[#8E3B2F] text-[#8E3B2F] hover:scale-110 hover:bg-[#8E3B2F] hover:text-white transition disabled:opacity-30"
              >
                <ChevronLeft size={22} />
              </button>
            )}
            <div
              className="overflow-hidden w-full"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {[...Array(totalPages)].map((_, pageIndex) => {
                  const start = pageIndex * REVIEWS_PER_PAGE;
                  const items = reviews.slice(start, start + REVIEWS_PER_PAGE);

                  return (
                    <div
                      key={pageIndex}
                      className="min-w-full grid md:grid-cols-2 gap-6 auto-rows-fr"
                    >
                      {items.map((rev, i) => (
                        <div
                          key={i}
                          className="bg-[#F5EFE8] max-h-[270px] p-6 shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between mb-4">
                              {renderStars(rev.rating)}

                              <span className="text-sm text-gray-600">
                                {new Date(rev.date).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed mb-6">
                              “{rev.text}”
                            </p>
                          </div>

                          <p className="text-gray-600 text-sm font-medium">
                            {rev.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
            {totalPages > 1 && (
              <button
                onClick={() =>
                  setPage((p) => Math.min(p + 1, totalPages - 1))
                }
                disabled={page === totalPages - 1}
                className="absolute -right-12 md:-right-16 p-3 rounded-full border border-[#8E3B2F] text-[#8E3B2F] hover:scale-110 hover:bg-[#8E3B2F] hover:text-white transition disabled:opacity-30"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;