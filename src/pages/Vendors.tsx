import "./Vendors.css";
import { useEffect, useState } from "react";

interface ApiVendor {
  id: number;
  name: string;
  email: string;
}



const vendorCategories = [
  {
    title: "Photographers",
    vendors: [
      {
        name: "Elegant Moments",
        image: "/src/data/wphoto1.jpg",
      },
      {
        name: "Dream Lens Studio",
        image: "/src/data/wphoto2.jpg",
      },
      {
        name: "Forever Memories",
        image: "/src/data/wphoto3.jpg",
      },
    ],
  },
  {
    title: "Venues",
    vendors: [
      {
        name: "Rose Garden Estate",
        image: "/src/data/weddingvenue1.jpg",
      },
      {
        name: "Lake Como",
        image: "/src/data/weddingvenue2.jpg",
      },
      {
        name: "Sunset Lake Venue",
        image: "/src/data/weddingvenue3.jpg",
      },
    ],
  },
  {
    title: "Florists",
    vendors: [
      {
        name: "Bloom & Bliss",
        image: "/src/data/bridalbouquet1.jpg",
      },
      {
        name: "Petal Paradise",
        image: "/src/data/bridalbuket4.jpg",
      },
      {
        name: "White Rose Designs",
        image: "/src/data/bridalbouquet3.jpg",
      },
    ],
  },
  {
    title: "Makeup Artists",
    vendors: [
      {
        name: "Beauty by Emma",
        image: "/src/data/bridalmakeup1.jpg",
      },
      {
        name: "Glam Studio",
        image: "/src/data/bridalmakeup2.jpg",
      },
      {
        name: "Bridal Glow",
        image: "/src/data/bridalmakeup3.jpg",
      },
    ],
  },
];


function Vendors() {
   const [apiVendors, setApiVendors] = useState<ApiVendor[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setApiVendors(data));
  }, []);
  return (
    <div className="vendors-page">
      <h1>Wedding Vendors</h1>
      <p className="subtitle">
        Discover trusted professionals for your perfect day.
      </p>

      {vendorCategories.map((category) => (
        <section key={category.title} className="vendor-section">
          <h2>{category.title}</h2>

          <div className="vendor-grid">
            {category.vendors.map((vendor) => (
              <div key={vendor.name} className="vendor-card">
                <img src={vendor.image} alt={vendor.name} />
                <div className="vendor-info">
                  <h3>{vendor.name}</h3>
                  <button>Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      <h2 className="api-title">Recommended Vendors (API)</h2>

<div className="vendor-grid">
  {apiVendors.slice(0, 6).map((vendor) => (
    <div key={vendor.id} className="vendor-card">
      <div className="vendor-info">
        <h3>{vendor.name}</h3>
        <p>{vendor.email}</p>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default Vendors;