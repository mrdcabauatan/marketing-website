import { useState } from "react";
import coffeeBg from "../assets/coffeeBg.png";
import nonCoffeeBg from "../assets/nonCoffeeBg.png";
import matchaBg from "../assets/matchaBg.png";

const menuData = {
  coffee: [
    { name: "Long Black", price: "₱79" },
    { name: "Cafe Latte", price: "₱89" },
    { name: "Cappuccino", price: "₱89" },
    { name: "Spanish Latte", price: "₱89" },
    { name: "Mocha", price: "₱94" },
    { name: "Salted Caramel", price: "₱94" },
    { name: "White Chocolate Mocha", price: "₱94" },
    { name: "Tres Leches", price: "₱94" },
    { name: "Vanilla Latte", price: "₱94" },
    { name: "Blondie Latte", price: "₱94" },
    { name: "Hazelnut Latte", price: "₱94" },
    { name: "Caramel Macchiato", price: "₱94" },
  ],

  "non-coffee": [
    { name: "Dark Cocoa", price: "₱94" },
    { name: "Milo Cloud", price: "₱94" },
    { name: "Blueberry", price: "₱94" },
    { name: "Strawberry", price: "₱94" },
  ],

  matcha: [
    { name: "Matcha", price: "₱104" },
    { name: "Matcha + Cocoa", price: "₱114" },
    { name: "Matcha + Blueberry", price: "₱114" },
    { name: "Matcha + Strawberry", price: "₱114" },
    { name: "Matcha + Salted Caramel", price: "₱114" },
    { name: "Matcha + Espresso", price: "₱119" },
  ],

  additionals: [
    { name: "Syrup, Sauce, Milk, Jam", price: "₱15" },
    { name: "Extra Shot", price: "₱20" },
    { name: "Matcha Powder", price: "₱25" },
  ],
};

const categories = [
  { id: "coffee", label: "Coffee" },
  { id: "non-coffee", label: "Non-Coffee" },
  { id: "matcha", label: "Matcha" },
  { id: "additionals", label: "Additionals" },
];

const MenuSection = () => {
  const [active, setActive] = useState("coffee");
  const [bgImage, setBgImage] = useState(coffeeBg);
  const [nextBg, setNextBg] = useState(null);

  const activeLabel = categories.find((cat) => cat.id === active)?.label || "";

  const handleCategoryClick = (id) => {
    setActive(id);

    let newBg = bgImage;

    if (id === "coffee") newBg = coffeeBg;
    if (id === "non-coffee") newBg = nonCoffeeBg;
    if (id === "matcha") newBg = matchaBg;

    if (newBg !== bgImage) {
      setNextBg(newBg);

      setTimeout(() => {
        setBgImage(newBg);
        setNextBg(null);
      }, 600);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Current background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize:"cover",
          backgroundPosition: "center -280px",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Sliding background */}
      {nextBg && (
        <div
          className="absolute inset-0 slide-bg"
          style={{
            backgroundImage: `url(${nextBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center -280px",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      <section
        id="menu"
        className="relative h-[900px] py-20 px-6 md:px-20"
      >
        <div className="flex items-center justify-center gap-6 mb-3">
          <h2 className="text-6xl font-semibold text-[#2B1C15] tracking-wide">
            Our Selection
          </h2>
        </div>

        <p className="flex items-center justify-center mb-10 text-[#2B1C15] text-2xl leading-relaxed">
          Perfect brews for late-night cravings.
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-12">
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`relative text-left px-4 py-2 text-lg transition-all duration-300
                ${
                  active === cat.id
                    ? "text-[#6b3e26] font-semibold"
                    : "text-[#2B1C15] hover:text-[#6b3e26] hover:translate-x-1"
                }`}
              >
                {cat.label}

                {active === cat.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-[#6b3e26] rounded"></span>
                )}
              </button>
            ))}
          </div>

          <div className="relative flex flex-col gap-6 max-w-[680px]">
            <h3 className="text-3xl font-semibold text-[#2B1C15]">
              {activeLabel}
            </h3>

            <div className="menu-scroll max-h-[400px] overflow-y-auto pr-6 flex flex-col gap-6">
              {(menuData[active] || []).map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-300 pb-3 hover:translate-x-2 transition-all duration-300"
                >
                  <span className="text-white text-lg">{item.name}</span>
                  <span className="text-white text-lg font-medium">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuSection;