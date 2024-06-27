import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./PS3.css";

const preitems = [
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/original.jpeg",
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/sam2.jpeg",
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/sam3.jpeg",
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/blankroom.webp",
];

const colorImages = {
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/original.jpeg": {
    c1: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20144802.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/1.jpeg",
    },
    c2: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20144903.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/3.jpeg",
    },
    c3: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145005.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/2.jpeg",
    },
    c4: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145041.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/5.jpeg",
    },
    c5: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145145.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/4.jpeg",
    },
  },
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/sam2.jpeg": {
    c1: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20144802.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/deepgreen.jpeg",
    },
    c2: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20144903.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/olive.jpeg",
    },
    c3: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145005.png",
      resultUrl:
        "https://upcdn.io/12a1yeE/raw/HIM%20prototype/deep%20violet.jpeg",
    },
    c4: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145041.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/crimson.jpeg",
    },
    c5: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145145.png",
      resultUrl:
        "https://upcdn.io/12a1yeE/raw/HIM%20prototype/coffeebrown.jpeg",
    },
  },
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/sam3.jpeg": {
    c1: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20144802.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/3deepgreen.jpeg",
    },
    c2: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145005.png",
      resultUrl:
        "https://upcdn.io/12a1yeE/raw/HIM%20prototype/3deepviolet.jpeg",
    },
    c3: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145041.png",
      resultUrl:
        "https://upcdn.io/12a1yeE/raw/HIM%20prototype/sam3crimson.jpeg",
    },
  },
  "https://upcdn.io/12a1yeE/raw/HIM%20prototype/blankroom.webp": {
    c1: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20144802.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/5deepgreen.jpeg",
    },
    c2: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145041.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/5crimson.jpeg",
    },
    c3: {
      url: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/Screenshot%202024-06-27%20145145.png",
      resultUrl: "https://upcdn.io/12a1yeE/raw/HIM%20prototype/brown5.jpeg",
    },
  },
  // Add other images similarly if needed
};

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.5;

function PS3() {
  const [imageUrl, setImageUrl] = useState("");
  const [lastValidImageUrl, setLastValidImageUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [zoom, setZoom] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const imageBackgroundRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      setZoom((prevZoom) => {
        let newZoom = event.deltaY > 0 ? prevZoom / 1.1 : prevZoom * 1.1;
        newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
        return newZoom;
      });
    };

    const imageBackground = imageBackgroundRef.current;
    if (imageBackground) {
      imageBackground.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (imageBackground) {
        imageBackground.removeEventListener("wheel", handleWheel);
      }
    };
  }, [imageUrl]);

  const handleImageClick = (url) => {
    setImageUrl(url);
    if (colorImages[url]) {
      setLastValidImageUrl(url);
    }
    setSelectedColor("");
  };

  const handleColorClick = (colorKey) => {
    const validImageUrl = colorImages[imageUrl] ? imageUrl : lastValidImageUrl;
    const colorInfo = colorImages[validImageUrl][colorKey];
    if (colorInfo && colorInfo.resultUrl) {
      setIsProcessing(true);
      setTimeout(() => {
        setImageUrl(colorInfo.resultUrl);
        setIsProcessing(false);
      }, 5000);
    } else {
      console.error("Color image not found for the selected image.");
    }
  };

  return (
    <div className="container">
      {!imageUrl && (
        <div className="predefined-images">
          {preitems.map((link, index) => (
            <img
              key={index}
              src={link}
              alt={`Predefined ${index + 1}`}
              onClick={() => handleImageClick(link)}
              className="predefined-image"
            />
          ))}
        </div>
      )}
      {imageUrl && (
        <div className="image-and-catalog">
          <div className="image-container">
            <div
              ref={imageBackgroundRef}
              className={`image-background ${isProcessing ? "processing" : ""}`}
              style={{
                backgroundImage: `url(${imageUrl})`,
                transform: `scale(${zoom})`,
              }}
            >
              {isProcessing && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
            </div>
          </div>
          <div className="catalog">
            <h2 className="catalog-heading">Catalog</h2>
            <h3 className="catalog-subheading">Color Options</h3>
            {colorImages[lastValidImageUrl] ? (
              <div className="catalog-items">
                {Object.keys(colorImages[lastValidImageUrl]).map(
                  (colorKey, index) => (
                    <div
                      key={index}
                      className="catalog-card"
                      onClick={() => handleColorClick(colorKey)}
                    >
                      <img
                        src={colorImages[lastValidImageUrl][colorKey].url}
                        alt={`Color ${index + 1}`}
                        className="catalog-image"
                      />
                      <p style={{ color: "black" }}>Color {index + 1}</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p style={{ color: "black" }}>
                No color options available for the selected image.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PS3;
