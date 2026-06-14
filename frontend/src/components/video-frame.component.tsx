import React, { forwardRef, useEffect, useState } from "react";

type videoFrameProps = {
  video: string;
};

const VideoFrameComponent = forwardRef<HTMLVideoElement, videoFrameProps>(
  ({ video }: videoFrameProps, ref) => {
    const [src, SetSrc] = useState<string>("");
    useEffect(() => {
      SetSrc(`http://127.0.0.1:8000/video/${video}/stream`);
    }, [video]);
    return (
      <div>
        <video src={src} controls className="w-full pb-8" ref={ref} />
      </div>
    );
  },
);

export default VideoFrameComponent;
