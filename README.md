# Summarizer

## Overview
This project provides a tool for summarizing text documents, articles, or any lengthy content. The Summarizer uses advanced algorithms to extract key points and generate concise summaries, making it easier for users to digest information quickly.

## Features
- Text summarization
- User-friendly interface
- Supports various document formats

## Installation
To install the Summarizer, clone the repository and install the required dependencies:

```bash
git clone https://github.com/ThamillIndian/summarizer.git
cd summarizer
```

### Backend Setup
Create and activate a Python virtual environment, then install backend dependencies:

```bash
python -m venv venv
source venv/bin/activate   # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

## Usage

### Backend
Start the backend server with:
```bash
uvicorn app.main:app --reload
```

### Frontend
Start the frontend app with:
```bash
npm start
```

## License
This project is licensed under the MIT License.
