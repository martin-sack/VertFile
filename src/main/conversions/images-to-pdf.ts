import { ConversionResult } from '../types';
import { ensureDirectoryExists } from './utils';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import fs from 'fs/promises';

export async function convertImagesToPdf(
  inputPath: string,
  outputPath: string
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(outputPath);

    // If inputPath is a directory, get all images
    let imagePaths: string[] = [];
    const stats = await fs.stat(inputPath);

    if (stats.isDirectory()) {
      const files = await fs.readdir(inputPath);
      imagePaths = files
        .filter((f) => /\.(png|jpg|jpeg|gif|bmp|tiff)$/i.test(f))
        .map((f) => `${inputPath}/${f}`);
    } else {
      imagePaths = [inputPath];
    }

    if (imagePaths.length === 0) {
      return {
        success: false,
        error: 'No images found',
      };
    }

    const pdfDoc = await PDFDocument.create();

    for (const imagePath of imagePaths) {
      const imageBuffer = await fs.readFile(imagePath);
      const ext = imagePath.toLowerCase();

      let image;
      if (ext.endsWith('.png')) {
        image = await pdfDoc.embedPng(imageBuffer);
      } else if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) {
        image = await pdfDoc.embedJpg(imageBuffer);
      } else {
        // Convert other formats to PNG using sharp
        const pngBuffer = await sharp(imageBuffer).png().toBuffer();
        image = await pdfDoc.embedPng(pngBuffer);
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);

    return {
      success: true,
      outputPath,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed',
    };
  }
}
