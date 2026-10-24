# Explorer

**Explorer** is a document utility web application designed to help users convert and manage document files through a simple and accessible interface.

## ✨ Features

- **Document Conversion** — Convert supported document formats through the web interface.
- **PPTX to PDF** — Convert PowerPoint presentations into PDF files using LibreOffice.
- **PPTX to TXT** — Extract text content from PowerPoint presentations.
- **DOCX to PDF** — Convert Word documents into PDF format.
- **PDF Support** — Generate PDF files using jsPDF.
- **Simple Interface** — Upload files and access conversion actions through a web-based interface.

> Note: Conversion support and output quality depend on the conversion method used for each file format.

## 🛠️ Tech Stack

- HTML, CSS, and JavaScript
- Node.js
- Express.js
- Multer
- LibreOffice
- jsPDF

## 📁 Project Structure

```text
Explorer/
├── index.html
├── jspdf.umd.min.js
├── NOTICE.txt
├── README.md
├── .gitignore
└── explorer-backend/
    ├── server.js
    ├── package.json
    └── package-lock.json
```

## ⚙️ Requirements

Before running Explorer, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [LibreOffice](https://www.libreoffice.org/) — required for PPTX-to-PDF conversion
- A modern web browser

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mhmmdzlfnn/Explorer.git
cd Explorer
```

### 2. Install Backend Dependencies

```bash
cd explorer-backend
npm install
```

### 3. Start the Backend Server

```bash
node server.js
```

The backend server runs at:

```text
http://127.0.0.1:3000
```

Keep the terminal running while using features that require the backend.

### 4. Open the Web Application

Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code.

For backend-dependent features, ensure the backend server is running and the browser can access `http://127.0.0.1:3000`.

## 📄 License

Please refer to `NOTICE.txt` for applicable notices and third-party license information.
