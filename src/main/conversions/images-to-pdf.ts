import { ConversionResult } from './index';
import { ConversionError, ErrorCode } from './errors';
import { ensureDirectoryExists } from './utils';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import { createCanvas, loadImage } from 'canvas';

async function getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  const img = await loadImage(buffer);
  return { width: img.width, height: img.height };
}

async function imageBufferToJpeg(buffer: Buffer): Promise<Buffer> {
  const img = await loadImage(buffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas.toBuffer('image/jpeg', { quality: 0.95 });
}

export async function convertImagesToPdf(
  inputPath: string,
  outputPath: string,
  options?: any
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(outputPath);

    // For single image, wrap in array
    const imagePaths = Array.isArray(inputPath) ? inputPath : [inputPath];

    // Create PDF document
    const pdfDoc = await PDFDocument.create();

    for (const imagePath of imagePaths) {
      const imageBuffer = await fs.readFile(imagePath);
      const { width, height } = await getImageDimensions(imageBuffer);

      // Try to embed image directly
      let image;
      const ext = imagePath.toLowerCase();
      
      try {
        if (ext.endsWith('.png')) {
          image = await pdfDoc.embedPng(imageBuffer);
        } else if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) {
          image = await pdfDoc.embedJpg(imageBuffer);
        } else {
          // Convert to JPEG for other formats
          const jpegBuffer = await imageBufferToJpeg(imageBuffer);
          image = await pdfDoc.embedJpg(jpegBuffer);
        }
      } catch (embedError) {
        // If embedding fails, convert to JPEG
        const jpegBuffer = await imageBufferToJpeg(imageBuffer);
        image = await pdfDoc.embedJpg(jpegBuffer);
      }

      // Add page with image dimensions
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);

    return {
      success: true,
      outputPath,
      message: `Successfully converted ${imagePaths.length} image(s) to PDF`,
    };
  } catch (error) {
    throw new ConversionError(
      'Failed to convert images to PDF',
      ErrorCode.CONVERSION_FAILED,
      error instanceof Error ? error.message : undefined
    );
  }
}
