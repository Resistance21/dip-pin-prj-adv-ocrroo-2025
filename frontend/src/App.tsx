import "./App.css";
import VideoListComponent from "./components/video-list.component";
import ImageOutputTextComponent from "./components/image-output-text.component";
import VideoFrameComponent from "./components/video-frame.component";
import { useRef, useState } from "react";
import {
  TranscribeTextSettingsComponent,
  type Settings,
} from "./components/transcribe-text-settings.component";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSecond, setVideoSeconds] = useState<number>(0);
  const [textSettings, setTextSettings] = useState<Settings>({
    fontSize: 16,
    colour: "#ffffff",
    backgroundColour: "transparent",
  });

  const getCurrentSeconds = (): number => {
    if (videoRef) return videoRef.current?.currentTime || 0;
    return 0;
  };
  return (
    <div className="pt-5">
      <div className="flex flex-col flex-none">
        <div className="pb-4">Video List</div>
        <VideoListComponent />
      </div>
      <div className="pt-5">
        <VideoFrameComponent ref={videoRef} />
      </div>
      <div className="flex flex-row justify-between p-5">
        <TranscribeTextSettingsComponent
          settings={textSettings}
          onChange={setTextSettings}
        />
        <button
          className="inline-flex items-center justify-center rounded-full border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none cursor-pointer"
          onClick={() => setVideoSeconds(getCurrentSeconds())}
        >
          Get Text from current time
        </button>
      </div>
      <ImageOutputTextComponent
        video="demo"
        seconds={videoSecond}
        settings={textSettings}
      />
    </div>
  );
}

export default App;
