"""A basic introduction to Open CV

Instructions
------------

Implement the functions below based on their docstrings.

Notice some docstrings include references to third-party documentation
Some docstrings **require** you to add references to third-party documentation.

Make sure you read the docstrings C.A.R.E.F.U.L.Y (yes, I took the L to check that you are awake!)
"""

# imports - add all required imports here
from pathlib import Path
import cv2 as cv
import numpy as np
from PIL import Image
import pytesseract


VID_PATH = Path("resources/oop.mp4")

class CodingVideo:
    capture: cv.VideoCapture


    def __init__(self, video: Path | str):
        self.capture = cv.VideoCapture(video)
        if not self.capture.isOpened():
            raise ValueError(f"Cannot open {video}")

        self.fps = self.capture.get(cv.CAP_PROP_FPS)
        self.frame_count = self.capture.get(cv.CAP_PROP_FRAME_COUNT)
        self.duration = (self.frame_count / self.fps) / 60


    def __str__(self) -> str:
        """Displays key metadata from the video

        Specifically, the following information is shown:
            FPS - Number of frames per second rounded to two decimal points
            FRAME COUNT - The total number of frames in the video
            DURATION (minutes) - Calculated total duration of the video given FPS and FRAME COUNT

        Reference
        ----------
        https://docs.opencv.org/3.4/d4/d15/group__videoio__flags__base.html#gaeb8dd9c89c10a5c63c139bf7c4f5704d
        """
        return f"The video has an FPS of {self.fps:.2f}, with a Frame Count of {self.frame_count}, with a Duration of {self.duration:.2f} minutes"
    
    def get_frame_number_at_time(self, seconds: int) -> int:
        """Given a time in seconds, returns the value of the nearest frame"""
        return round(seconds * self.fps)

    def get_frame_rgb_array(self, frame_number: int) -> np.ndarray:
        """Returns a numpy N-dimensional array (ndarray)

        The array represents the RGB values of each pixel in a given frame

        Note: cv2 defaults to BGR format, so this function converts the color space to RGB

        Reference
        ---------
        # TODO: Find a tutorial on OpenCV that demonstrates color space conversion

        """
        self.capture.set(cv.CAP_PROP_POS_FRAMES, frame_number)
        retrival, frame = self.capture.read()
        return cv.cvtColor(frame, cv.COLOR_BGR2RGB)

    def get_image_as_bytes(self, seconds: int) -> bytes:
        self.capture.set(cv.CAP_PROP_POS_FRAMES, self.get_frame_number_at_time(seconds))
        ok, frame = self.capture.read()
        if not ok or frame is None:
            raise ValueError("Invalid frame in target location")
        ok, buf = cv.imencode(".png", frame)
        if not ok:
            raise ValueError("Failed to encode frame")
        return buf.tobytes()




    def save_as_image(self, seconds: int, output_path: Path | str = 'output.png') -> None:
        """Saves the given frame as a png image

        # TODO: Requires a third-party library to convert ndarray to png
        # TODO: Identify the library and add a reference to its documentation
            Pillow is used for the convert ndarry to png 
            Pillow docs 
            https://pillow.readthedocs.io/en/stable/index.html
            docs for the array convert 
            https://pillow.readthedocs.io/en/stable/reference/Image.html#PIL.Image.fromarray
            saving the image
            https://pillow.readthedocs.io/en/stable/reference/Image.html#PIL.Image.Image.save
        """
        image_array = self.get_frame_rgb_array(self.get_frame_number_at_time(seconds))
        image = Image.fromarray(image_array)
        image.save(output_path)

    def get_text_from_image(self, seconds: int):
        frame_number = self.get_frame_number_at_time(seconds)
        image = Image.fromarray(self.get_frame_rgb_array(frame_number))
        return pytesseract.image_to_string(image)

def test():
    """Try out your class here"""
    oop = CodingVideo("resources/oop.mp4")
    print(oop)
    oop.save_as_image(219, 'resources/output.png')
    print(oop.get_text_from_image(219))

if __name__ == '__main__':
    test()
