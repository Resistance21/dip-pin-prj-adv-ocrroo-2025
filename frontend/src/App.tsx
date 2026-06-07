import "./App.css";
import VideoListComponent from "./components/video-list.component";
import ImageOutputTextComponent from "./components/image-output-text.component";
import VideoFrameComponent from "./components/video-frame.component";
import { useRef, useState } from "react";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSecond, setVideoSeconds] = useState<number>(0);

  const getCurrentSeconds = (): number => {
    if (videoRef) return videoRef.current?.currentTime || 0;
    return 0;
  };
  return (
    <>
      <VideoListComponent />
      <VideoFrameComponent ref={videoRef} />
      <button
        className="inline-flex items-center justify-center rounded-full border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none"
        onClick={() => setVideoSeconds(getCurrentSeconds())}
      >
        Get Text from current time
      </button>
      <ImageOutputTextComponent video="demo" seconds={videoSecond} />
    </>
  );
}

export default App;
