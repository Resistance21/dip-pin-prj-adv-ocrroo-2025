## User Journey

## User Stroy

As a visually impaired user, I want to get the text from a video frame that I am watching, so that text I am having trouble reading from the video can be shown in a text area with larger font.

## User Journey

![alt text](/design//user-journey/user-journey-Wire-frame-video.png)

1. User selects the video they want to view from the video selection component.
2. User watches the video in the video frame; they come to a section they need to get a transcribe of the text on the current frame.
3. The user makes any personalisation changes as needed to the text that will be transcribed such as font size, font colour, background colour, bolding text.
4. User clicks the button which sends the request to the backend to run the OCR on the current frame the video is currently on.
5. The transcribed text is returned by the server and displayed in the text area, user reads the text, if needed they can request another OCR to be performed.
