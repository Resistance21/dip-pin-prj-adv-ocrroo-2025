import "./App.css";
import VideoListComponent from "./components/video-list.component";
import ImageOutputTextComponent from "./components/image-output-text.component";
import VideoFrameComponent from "./components/video-frame.component";
import { useEffect, useRef, useState } from "react";
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
  const [OCRWorking, setOCRWorking] = useState<boolean>(false);
  const [OCRText, setOCRText] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [OCRTime, setOCRTime] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  const getOCRText = async () => {
    const seconds = getCurrentSeconds();
    setOCRText("OCR is Processing...");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/video/${video}/second/${seconds}/ocr`,
      );
      setOCRText(await response.text());
      setOCRTime(() => Date.now());
    } catch (err) {
      console.error("OCR fetch failed", err);
      setOCRText("OCR request failed. Please try again.");
    } finally {
      setOCRWorking(false);
    }
  };

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatAgo = (timestamp: number, now: number): string => {
    const seconds = Math.floor((now - timestamp) / 1000);
    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) return "1 minute ago";
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 hour ago";
    return `${hours} hours ago`;
  };

  const getCurrentSeconds = (): number => {
    if (videoRef) return videoRef.current?.currentTime || 0;
    return 0;
  };
  return (
    <div className="pt-5">
      <div className="flex flex-col flex-none">
        <div className="pb-4">Video List</div>
        <div className="pb-4">Click a video to get started</div>
        <VideoListComponent setVideo={setVideo} />
      </div>
      <div className="pt-5">
        <VideoFrameComponent ref={videoRef} video={video} />
      </div>
      <div className="flex flex-row justify-between p-5">
        <TranscribeTextSettingsComponent
          settings={textSettings}
          onChange={setTextSettings}
        />
        <button
          className="inline-flex items-center justify-center rounded-full border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none cursor-pointer disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:hover:bg-indigo-300 "
          onClick={() => {
            // setVideoSeconds(getCurrentSeconds());
            setOCRWorking(true);
            getOCRText();
          }}
          disabled={OCRWorking}
        >
          Get Text from current time
        </button>
      </div>
      {OCRTime && (
        <div className="text-m text-gray-500 text-left pl-2" aria-live="polite">
          Last OCR happened: {formatAgo(OCRTime, now)}
        </div>
      )}
      <ImageOutputTextComponent
        video="demo"
        seconds={videoSecond}
        settings={textSettings}
        setOCRWorking={setOCRWorking}
        OCRText={OCRText}
      />
    </div>
  );
}

export default App;
