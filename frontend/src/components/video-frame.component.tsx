import React, { forwardRef } from "react";

const VideoFrameComponent = forwardRef<HTMLVideoElement>((props, ref) => {
  return (
    <div>
      <video
        src={"http://127.0.0.1:8000/video/demo/stream"}
        controls
        className="w-full pb-8"
        ref={ref}
      />
    </div>
  );
});

export default VideoFrameComponent;
