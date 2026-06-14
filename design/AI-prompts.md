## AI Prompts

<h2 style="color: green;">AI prompt one</h2>

can you show me what a generic template for a github issue would look like

## Respones

Claude responded: Here's a generic template you can copy into the body of each issue and fill in.
Here's a generic template you can copy into the body of each issue and fill in. It hits every requirement in the spec and works for any UI design issue you'd raise on this project (or any other).
markdown

## User story

As a [persona], I want to [goal], so that [reason].

## Description

[A short paragraph or two describing what needs to be built or changed.
Cover the *what* and the *where* — which component, page, or part of the
UI is affected. Keep it factual and scoped to this issue; if it sprawls,
it should probably be split into multiple issues.]

## Acceptance criteria

- [ ] [A specific, testable condition that must be true when the work is done]
- [ ] [Another condition]
- [ ] [And another]

## Non-functional requirements

- **Accessibility:** [e.g. all controls reachable via keyboard; ARIA
  attributes on form elements; colour contrast meets WCAG AA]
- **Usability:** [e.g. changes apply live with no submit step; error
  messages appear within 200ms of invalid input]
- **Performance:** [e.g. no unnecessary re-fetches from the backend;
  re-renders limited to affected components]
- **Compatibility:** [e.g. works in Chrome, Firefox, Safari latest two
  versions; renders correctly at 1024px width and above]
- **Maintainability:** [e.g. shared types exported from one location;
  no duplicated state across components]

## Notes

[Anything else worth recording — design decisions considered and
rejected, links to related issues with `#2` syntax, links to mockups
or external references, open questions for teammates.]

<h2 style="color: green;">AI prompt two</h2>

for these tesseract wrappers for python

Python

[tesserocr](https://github.com/sirfz/tesserocr) - A Python wrapper around Tesseract’s C++ API

[pytesseract](https://github.com/madmaze/pytesseract) - a wrapper class for Tesseract OCR (requires tesseract executable)

[tesseract-ocr-wrapper](https://github.com/Altabeh/tesseract-ocr-wrapper) - a python wrapper for tesseract-ocr with support for OCRing of pdf

[aiopytesseract](https://github.com/amenezes/aiopytesseract) - asyncio tesseract wrapper for Tesseract-OCR.

[image2text](https://github.com/prabhakar267/image2text) - A python wrapper for tesseract to work on large datasets and directories.

which would be the best to use for a small project

## Response

For a small project, pytesseract is the clear choice.

It's the most popular, best-documented, and easiest to get started with. The API is dead simple:

```python
import pytesseract
from PIL import Image

text = pytesseract.image_to_string(Image.open('image.png'))
```

You just need the Tesseract executable installed on your system, then `pip install pytesseract` and you're done. Tons of Stack Overflow answers and tutorials exist if you hit issues.

## Quick Comparison

- **tesserocr** — Faster (direct C++ bindings, no subprocess overhead), but installation is notoriously painful because it needs to compile against Tesseract's C++ headers. Only worth it if you're processing large volumes and pytesseract's performance becomes a bottleneck.
- **aiopytesseract** — Only useful if your project is already async (FastAPI, aiohttp, etc.). Overkill otherwise.
- **tesseract-ocr-wrapper** — Niche; useful only if your specific need is OCRing PDFs.
- **image2text** — Aimed at batch-processing large datasets/directories, not small projects. Also less actively maintained.

## Recommendation

Start with **pytesseract**. If you later find you need PDF support or speed, swap in one of the others.
