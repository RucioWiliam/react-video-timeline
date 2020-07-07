import React from "react";
import VideoPlayer from "./videojs";
import MultiVideo from "./MultiVideo.jsx";

function Video() {
  const videoJsOptions = {
    autoplay: true,
    controls: false,
    controlBar: {
      fullscreenToggle: false
    },
    sources: [
      {
        src: "https://www.dropbox.com/s/y0ry2w3i7q59ozx/Sample_854x480.mp4",
        type: "video/mp4"
      }
    ]
  };

  return (
    <div className="Video">
      <div className="video__mode">
        <VideoPlayer {...videoJsOptions} />
      </div>      
    </div>
  );
}

export default Video;

