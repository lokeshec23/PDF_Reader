# 🧠 Smart Document Annotation & Viewer Tool

A dynamic PDF viewer and JSON annotation tool built with React, Carbon Design System, and intelligent linking between document fields and extracted data. 

## 🚀 Features

- 📄 PDF Viewer with OCR-extracted data overlays
- 🧩 JSON Viewer with coordinate mapping
- 🖱 Hover any JSON field to highlight the corresponding area in the PDF
- 🔀 Document Type Switcher (Bank Statement, Paystub, etc.)
- 🧠 Smart Input Form dynamically rendered based on selected document type
- 📎 Arrow linking using `react-xarrows`
- 💅 Carbon Design System UI for clean, accessible inputs

## 📂 Supported Document Types

- **Bank Statement**
- **Paystub**
- (Easily extendable: W2, Schedule E, etc.)

## ⚙️ Tech Stack

- React (Vite or CRA)
- Carbon Components React (IBM Design System)
- react-pdf
- react-xarrows
- Context API for global state
- Dynamic schema-based rendering

## 🛠️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
