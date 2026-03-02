import React from 'react';

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className="video-player-container">
      <iframe
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
