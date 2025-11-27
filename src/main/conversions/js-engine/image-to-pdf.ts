import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import Jimp from 'jimp';

export interface ImageToPDFOptions {
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
  margin?: number; // in points (1/72 inch)
  fitToPage?: boolean;
}

export interface ImageToPDFResult {
  success: boolean;
  outputPath?: string;
  pageCount?: number;
  error?: string;
}

// Page sizes in points (1 point = 1/72 inch)
const PAGE_SIZES = {
  A4: { width: 595, height: 842 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
};

export async function imageToPDF(
  inputPaths: string[],
  outputPath: string,
  options: ImageToPDFOptions = {}
): Promise<ImageToPDFResult> {
  try {
    const {
      pageSize = 'A4',
      orientation = 'portrait',
      margin = 20,
      fitToPage = true,
    } = options;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Get page dimensions
    let { width: pageWidth, height: pageHeight } = PAGE_SIZES[pageSize];
    
    // Swap dimensions for landscape
    if (orientation === 'landscape') {
      [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    // Process each image
    for (const inputPath of inputPaths) {
      // Read image with Jimp
      const jimpImage = await Jimp.read(inputPath);
      const imgWidth = jimpImage.getWidth();
      const imgHeight = jimpImage.getHeight();

      // Convert to buffer in appropriate format
      const mimeType = jimpImage.getMIME();
      let imageBuffer: Buffer;
      
      if (mimeType === Jimp.MIME_PNG) {
        imageBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
      } else {
        // Convert to JPEG for all other formats
        imageBuffer = await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
      }

      // Embed image in PDF
      let image;
      try {
        if (mimeType === Jimp.MIME_PNG) {
          image = await pdfDoc.embedPng(imageBuffer);
        } else {
          image = await pdfDoc.embedJpg(imageBuffer);
        }
      } catch (embedError) {
        // If embedding fails, convert to JPEG and try again
        const jpegBuffer = await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
        image = await pdfDoc.embedJpg(jpegBuffer);
      }

      // Add a new page
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Calculate image dimensions to fit page
      const availableWidth = pageWidth - (margin * 2);
      const availableHeight = pageHeight - (margin * 2);

      let drawWidth = imgWidth;
      let drawHeight = imgHeight;

      if (fitToPage) {
        const widthRatio = availableWidth / imgWidth;
        const heightRatio = availableHeight / imgHeight;
        const ratio = Math.min(widthRatio, heightRatio);

        drawWidth = imgWidth * ratio;
        drawHeight = imgHeight * ratio;
      }

      // Center image on page
      const x = (pageWidth - drawWidth) / 2;
      const y = (pageHeight - drawHeight) / 2;

      // Draw image
      page.drawImage(image, {
        x,
        y,
        width: drawWidth,
        height: drawHeight,
      });
    }

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);

    return {
      success: true,
      outputPath,
      pageCount: inputPaths.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Image to PDF conversion failed',
    };
  }
}
