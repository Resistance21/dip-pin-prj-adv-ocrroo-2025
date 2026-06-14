import React, { useEffect, useState } from "react";

type videoListArray = {
  id: string;
  path: string;
};

type videoListProps = {
  setVideo: React.Dispatch<React.SetStateAction<string>>;
};
const VideoListComponent = ({ setVideo }: videoListProps) => {
  const [videoList, setVideoList] = useState<Array<videoListArray>>([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await fetch("http://127.0.0.1:8000/video");
      const data = await response.json();
      //console.log(data.videos);
      setVideoList(data.videos);
    };
    getVideos();
  }, []);

  return (
    <div>
      {videoList.map((item) => {
        console.log(videoList);
        return (
          <button
            className="inline-flex items-center justify-center rounded-full border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none cursor-pointer"
            key={item.id}
            onClick={() => setVideo(item.id)}
          >
            {item.id}
          </button>
        );
      })}
    </div>
  );
};

export default VideoListComponent;
