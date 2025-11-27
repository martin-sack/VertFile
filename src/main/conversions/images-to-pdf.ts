import { ConversionResult } from './index';
import { ConversionError, ErrorCode } from './errors';
import { ensureDirectoryExists } from './utils';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import Jimp from 'jimp';

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
      // Read image with Jimp
      const jimpImage = await Jimp.read(imagePath);
      const width = jimpImage.getWidth();
      const height = jimpImage.getHeight();

      // Get image buffer
      const mimeType = jimpImage.getMIME();
      let imageBuffer: Buffer;
      
      if (mimeType === Jimp.MIME_PNG) {
        imageBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
      } else {
        imageBuffer = await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
      }

      // Embed image
      let image;
      try {
        if (mimeType === Jimp.MIME_PNG) {
          image = await pdfDoc.embedPng(imageBuffer);
        } else {
          image = await pdfDoc.embedJpg(imageBuffer);
        }
      } catch (embedError) {
        // Fallback to JPEG
        const jpegBuffer = await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
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
