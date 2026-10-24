const express = require("express");
const multer = require("multer");
const { execFile } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { promisify } = require("util");

const app = express();
const execFileAsync = promisify(execFile);

const PORT = 3000;
const SOFFICE =
  "C:\\Program Files\\LibreOffice\\program\\soffice.exe";

const uploadDir = path.join(os.tmpdir(), "explorer-uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 100 * 1024 * 1024 }
});

app.post("/convert/pptx-to-pdf", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File PPTX belum dipilih." });
  }

  const workDir = path.join(os.tmpdir(), "explorer-" + crypto.randomUUID());

  try {
    if (path.extname(req.file.originalname).toLowerCase() !== ".pptx") {
      return res.status(400).json({ error: "File harus berformat PPTX." });
    }

    fs.mkdirSync(workDir, { recursive: true });

    const inputPath = path.join(workDir, "presentation.pptx");
    fs.copyFileSync(req.file.path, inputPath);

    await execFileAsync(SOFFICE, [
      "-env:UserInstallation=file://" +
        path.join(workDir, "lo-profile").replace(/\\/g, "/"),
      "--headless",
      "--convert-to", "pdf",
      "--outdir", workDir,
      inputPath
    ], {
      timeout: 120000,
      windowsHide: true
    });

    const pdfPath = path.join(workDir, "presentation.pdf");

    if (!fs.existsSync(pdfPath)) {
      throw new Error("File PDF tidak berhasil dibuat.");
    }

    res.download(pdfPath, "presentation.pdf", (err) => {
      fs.rmSync(workDir, { recursive: true, force: true });
      if (err) console.error("Gagal mengirim PDF:", err.message);
    });
  } catch (error) {
    console.error(error);
    fs.rmSync(workDir, { recursive: true, force: true });

    if (!res.headersSent) {
      res.status(500).json({
        error: "Konversi gagal. Periksa file PPTX dan LibreOffice."
      });
    }
  } finally {
    fs.rmSync(req.file.path, { force: true });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Explorer backend berjalan di http://127.0.0.1:${PORT}`);
});
