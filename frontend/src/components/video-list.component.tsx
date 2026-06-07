import React, { useEffect, useState } from "react";

type videoListArray = {
  id: string;
  path: string;
};

const VideoListComponent = () => {
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
        return <div key={item.id}>{item.id}</div>;
      })}
    </div>
  );
};

export default VideoListComponent;
