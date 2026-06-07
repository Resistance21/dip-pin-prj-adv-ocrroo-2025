import React, { useEffect, useRef, useState } from "react";

type imageOutputTextComponentProps = {
  video: string;
  seconds: number;
};

const ImageOutputTextComponent = ({
  video,
  seconds,
}: imageOutputTextComponentProps) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const getOCRText = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/video/${video}/second/${seconds}/ocr`,
      );
      const data = await response.text();
      setText(data);
      console.log(data);
    };
    getOCRText();
  }, [video, seconds]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div>
      <textarea
        key={"ocr text area"}
        id="ocr text area"
        className="w-full min-h-12 max-h-96 overflow-y-auto resize-none"
        readOnly
        defaultValue={text}
        ref={textareaRef}
      />
    </div>
  );
};

export default ImageOutputTextComponent;
