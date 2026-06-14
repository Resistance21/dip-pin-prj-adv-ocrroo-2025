# Overview

Include a brief overview of the project, include:

## How do you deploy and run the project?

To deploy this project, you will need the following programs:

## Tesseract

Tesseract is an OCR program that is used transcribe text from video frames in this project.
You can download it from
[Download link](https://docs.coro.net/featured/agent/install-tesseract-windows)

## UV

UV is a package management system for python and is used for this project.
You can download it from
Download options can be found at:
[Download link](https://docs.astral.sh/uv/getting-started/installation/#standalone-installer)

## Running the Backend and Frontend

This project has two parts: a Python FastAPI backend and a React frontend, each with their own dependencies.

### 1. Install backend dependencies

From the project root directory run:

​`
uv sync
​`

This downloads the Python packages defined in `pyproject.toml`.

### 2. Install frontend dependencies

Change into the frontend folder and run:

​`
npm install
​`

This downloads the Node packages defined in `package.json`.

### 3. Start the backend API

From the project root directory:

​`
uv run fastapi dev preliminary/simple_api.py
​`

The backend will start on `http://127.0.0.1:8000`.

### 4. Start the frontend

In a **separate terminal**, from the `frontend` folder:

​`
npm run dev
​`

The frontend dev server will start, and the URL to open in your browser will be shown in the terminal output (usually `http://localhost:5173`).

Once both servers are running, open the frontend URL in your browser to use the application.

## What are its core dependencies?

## Core dependences

**fastapi** standard >= 0.136.3"

**opencv-python** >= 4.13.0.92"

**pillow** >=12.2.0"

**pytesseract** >=0.3.13"

## Who is it for and why?

This project is designed to help people with poor eyesight, by giving them the ability to request an OCR on the current frame of a video they are watching and to get a transcribe of the text in the current frame.
