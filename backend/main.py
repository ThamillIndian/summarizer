from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
import subprocess
from fastapi.responses import FileResponse

app = FastAPI()

# Allow all origins for now (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

AUDIO_DIR = Path("app/audio")
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

def extract_audio(input_path: Path, output_path: Path):
    command = [
        "ffmpeg",
        "-i", str(input_path),
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", "16000",
        "-ac", "1",
        str(output_path)
    ]
    subprocess.run(command, check=True)

@app.get("/")
def read_root():
    return {"message": "Arrr! The FastAPI backend be runnin'!"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = UPLOAD_DIR / file.filename
    print(f"[DEBUG] Saving uploaded file to: {file_location}")
    with open(file_location, "wb") as f:
        content = await file.read()
        print(f"[DEBUG] Uploaded file size: {len(content)} bytes")
        f.write(content)
    # Extract audio after upload
    audio_filename = file.filename.rsplit(".", 1)[0] + ".wav"
    audio_location = AUDIO_DIR / audio_filename
    try:
        extract_audio(file_location, audio_location)
        audio_status = "Audio extracted successfully!"
    except Exception as e:
        audio_status = f"Audio extraction failed: {e}"
    print(f"[DEBUG] Audio extraction status: {audio_status}")
    return {
        "message": "File uploaded successfully!",
        "filename": file.filename,
        "audio_file": audio_filename,
        "audio_status": audio_status
    }

@app.get("/uploads/{filename}")
def get_uploaded_file(filename: str):
    file_path = UPLOAD_DIR / filename
    if file_path.exists():
        return FileResponse(file_path)
    return {"error": "File not found"}

@app.get("/audio/{filename}")
def get_audio_file(filename: str):
    file_path = AUDIO_DIR / filename
    if file_path.exists():
        return FileResponse(file_path)
    return {"error": "File not found"}
