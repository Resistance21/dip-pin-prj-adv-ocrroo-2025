import React from "react";

export type Settings = {
  fontSize: number;
  colour: string;
  backgroundColour: string;
};

type Props = {
  settings: Settings;
  onChange: (s: Settings) => void;
};

const TranscribeTextSettingsComponent = ({ settings, onChange }: Props) => {
  const { fontSize, colour, backgroundColour } = settings;
  return (
    <div>
      <div>
        <label className="text-xl">Transcribe Settings</label>
      </div>
      <div className="flex gap-4">
        <div>
          <label className="mr-2 text-xl">Text Size</label>
          <input
            type="number"
            value={fontSize}
            className="border-1 w-15 text-right"
            required
            onChange={(e) =>
              onChange({ ...settings, fontSize: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="mr-2 text-xl">Text Colour</label>
          <input
            type="color"
            value={colour}
            onChange={(e) => onChange({ ...settings, colour: e.target.value })}
          />
        </div>
        <div>
          <label className="mr-2 text-xl">Background Colour</label>
          <input
            type="color"
            value={backgroundColour}
            onChange={(e) =>
              onChange({ ...settings, backgroundColour: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export { TranscribeTextSettingsComponent };
