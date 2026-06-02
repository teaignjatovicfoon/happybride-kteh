import { useState } from "react";
import "./Inspo.css";

type InspoImage = {
  id: number;
  src: string;
};

const images: InspoImage[] = [
  { id: 1, src: "/src/data/hb3.jpg" },
  { id: 2, src: "/src/data/venue1.jpg" },
  { id: 3, src: "/src/data/w0.jpg" },
  { id: 4, src: "/src/data/wd1.jpg" },
  { id: 5, src: "/src/data/hb7.jpg" },
  { id: 6, src: "/src/data/venue3.jpg" },
  { id: 7, src: "/src/data/hb12.jpg" },
  { id: 8, src: "/src/data/wd3.jpg" },
  { id: 9, src: "/src/data/venue6.jpg" },
  { id: 10, src: "/src/data/w1.jpg" },
];

export default function Inspo() {
  const [pins, setPins] = useState<number[]>([]);

  const handlePin = (id: number) => {
    if (!pins.includes(id)) {
      setPins([...pins, id]);
    }
  };

  return (
    <div className="inspo-page">
      <div className="inspo-container">
        <div className="inspo-background">
          <div className="gallery">
            {images.map((image) => (
              <div key={image.id} className="card">
                <img src={image.src} alt="" />

                <button
                  className="pin-btn"
                  onClick={() => handlePin(image.id)}
                >
                  Pin
                </button>

                {pins.includes(image.id) && (
                  <div className="pinned">📌</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}