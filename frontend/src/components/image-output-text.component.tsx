import React, { useEffect, useRef, useState, forwardRef } from "react";

type Settings = {
  fontSize: number;
  colour: string;
  backgroundColour: string;
};

type imageOutputTextComponentProps = {
  video: string;
  seconds: number;
  settings: Settings;
};

const ImageOutputTextComponent = ({
  video,
  seconds,
  settings,
}: imageOutputTextComponentProps) => {
  const [text, setText] = useState<string>("");
  const [ocrCount, setOcrCount] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { fontSize, colour, backgroundColour } = settings;

  useEffect(() => {
    const getOCRText = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/video/${video}/second/${seconds}/ocr`,
      );
      const data = await response.text();
      setText(data);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (wrapperRef.current) {
            wrapperRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }
        });
      });
    };
    getOCRText();
    console.log("wrapperRef", wrapperRef.current);
  }, [video, seconds]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div ref={wrapperRef}>
      <textarea
        key={"ocr text area"}
        id="ocr text area"
        className={`w-full min-h-50 max-h-96 overflow-y-auto resize-none border-t-2 border-b-2 border-indigo-600 text-[${fontSize}] decoration-[${colour}] bg-[${backgroundColour}]`}
        readOnly
        defaultValue={text}
        ref={textareaRef}
        style={{
          fontSize: `${fontSize}px`,
          color: colour,
          backgroundColor: backgroundColour,
        }}
      />
    </div>
  );
};

export default ImageOutputTextComponent;
