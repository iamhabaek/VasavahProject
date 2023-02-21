import React, { useState } from "react";
import ImageViewer from "react-simple-image-viewer";
const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openViewer = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  return (
    <div>
      {images &&
        images.map((image, index) => (
          <img
            key={image}
            src={image}
            width="50"
            onClick={() => openViewer(index)}
          />
        ))}
      {viewerIsOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: "999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", width: "80%", height: "80%" }}>
            <ImageViewer
              src={images.map((image) => image)}
              currentIndex={currentImage}
              onClose={() => setViewerIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
