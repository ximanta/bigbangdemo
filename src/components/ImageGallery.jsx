import React, { useState } from 'react';
import { X } from 'lucide-react';

const ImageGallery = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery-section">
      {title && <h3>{title}</h3>}
      <div className="image-gallery">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openModal(image)}
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
            />
            <p>
              {index % 2 === 0 ? 'Before' : 'After'}
            </p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModal}
            >
              <X size={30} />
            </button>
            <img
              src={selectedImage}
              alt="Selected Gallery Image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
