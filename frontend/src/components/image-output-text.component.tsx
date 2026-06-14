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
  setOCRWorking: (value: boolean) => void;
  OCRText: string;
};

const ImageOutputTextComponent = ({
  settings,
  OCRText,
}: imageOutputTextComponentProps) => {
  const [text, setText] = useState<string>("");
  const [ocrProcess, setOcrProcess] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { fontSize, colour, backgroundColour } = settings;

  useEffect(() => {
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
  }, [OCRText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [OCRText]);

  return (
    <div ref={wrapperRef}>
      <textarea
        key={"ocr text area"}
        id="ocr text area"
        className={`w-full min-h-50 max-h-96 overflow-y-auto resize-none border-t-2 border-b-2 border-indigo-600 text-[${fontSize}] decoration-[${colour}] bg-[${backgroundColour}] pl-2`}
        readOnly
        defaultValue={OCRText}
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
