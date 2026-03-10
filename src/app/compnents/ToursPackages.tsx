// components/TourPackages.jsx
export default function TourPackages() {
  const packages = [
    {
      id: 1,
      title: "Tropical Paradise",
      location: "Maldives",
      duration: "7 Days / 6 Nights",
      price: "1,299",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&h=400&fit=crop",
      rating: 4.8,
    },
    {
      id: 2,
      title: "European Adventure",
      location: "Paris, France",
      duration: "5 Days / 4 Nights",
      price: "899",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Mountain Escape",
      location: "Swiss Alps",
      duration: "6 Days / 5 Nights",
      price: "1,499",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Cultural Journey",
      location: "Kyoto, Japan",
      duration: "8 Days / 7 Nights",
      price: "1,799",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=400&fit=crop",
      rating: 4.9,
    },
    {
      id: 5,
      title: "Desert Safari",
      location: "Dubai, UAE",
      duration: "4 Days / 3 Nights",
      price: "799",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=400&fit=crop",
      rating: 4.6,
    },
    {
      id: 6,
      title: "Island Hopping",
      location: "Santorini, Greece",
      duration: "7 Days / 6 Nights",
      price: "1,399",
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&h=400&fit=crop",
      rating: 4.8,
    },
    {
      id: 7,
      title: "Wildlife Safari",
      location: "Serengeti, Tanzania",
      duration: "9 Days / 8 Nights",
      price: "2,299",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=400&fit=crop",
      rating: 5.0,
    },
    {
      id: 8,
      title: "Ancient Wonders",
      location: "Machu Picchu, Peru",
      duration: "6 Days / 5 Nights",
      price: "1,599",
      image:
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=400&fit=crop",
      rating: 4.9,
    },
  ];

  return (
    <section className="py-16 ">
      <div className="mx-auto px-6" style={{ maxWidth: "1340px" }}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl  font-bold text-black mb-4">
            Popular Tour Packages
          </h2>
          <p className="text-lg text-gray-600">
            Discover amazing destinations around the world
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full">
                  <span className="text-yellow-500 text-sm font-semibold">
                    ★ {pkg.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {pkg.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {pkg.location}
                </p>
                <p className="text-gray-500 text-sm mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {pkg.duration}
                </p>

                {/* Price and Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="text-2xl font-bold text-blue-600">
                     ₹{pkg.price}
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
