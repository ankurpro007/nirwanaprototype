import React, { useRef, useState } from "react";
import "./CAD.css"; // Import the CSS for styling

function CAD() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef(null);

  // Function to handle file input changes and load the image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Draw the image on the canvas
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setImageLoaded(true); // Update the state to hide the upload button
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Render the CAD component
  return (
    <div className="cad-container">
      {!imageLoaded && (
        <label htmlFor="file-upload" className="upload-button">
          <i className="fa fa-upload upload-icon"></i>
          Upload Image
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
        </label>
      )}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          style={{ maxWidth: "100%", maxHeight: "90vh" }}
        />
      </div>
    </div>
  );
}

export default CAD;
