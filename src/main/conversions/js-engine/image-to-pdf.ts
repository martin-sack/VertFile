import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import { createCanvas, loadImage } from 'canvas';

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

async function imageBufferToFormat(buffer: Buffer, targetFormat: 'png' | 'jpeg'): Promise<Buffer> {
  try {
    const img = await loadImage(buffer);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const mimeType = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
    return canvas.toBuffer(mimeType as any, { quality: 0.95 });
  } catch (error) {
    throw new Error(`Failed to convert image format: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  const img = await loadImage(buffer);
  return { width: img.width, height: img.height };
}

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
      // Read image
      const imageBuffer = await fs.readFile(inputPath);
      
      // Get image dimensions
      const { width: imgWidth, height: imgHeight } = await getImageDimensions(imageBuffer);

      // Determine format and embed image
      let image;
      const ext = inputPath.toLowerCase();
      
      try {
        if (ext.endsWith('.png')) {
          image = await pdfDoc.embedPng(imageBuffer);
        } else if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) {
          image = await pdfDoc.embedJpg(imageBuffer);
        } else {
          // Convert to JPEG for other formats
          const jpegBuffer = await imageBufferToFormat(imageBuffer, 'jpeg');
          image = await pdfDoc.embedJpg(jpegBuffer);
        }
      } catch (embedError) {
        // If embedding fails, try converting to JPEG
        const jpegBuffer = await imageBufferToFormat(imageBuffer, 'jpeg');
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
