import fs from 'fs/promises';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

export interface ImageCompressOptions {
  quality?: number; // 0-100
  maxWidth?: number;
  maxHeight?: number;
}

export interface ImageCompressResult {
  success: boolean;
  outputPath?: string;
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
  error?: string;
}

export async function compressImage(
  inputPath: string,
  outputPath: string,
  options: ImageCompressOptions = {}
): Promise<ImageCompressResult> {
  try {
    const { quality = 80, maxWidth, maxHeight } = options;

    // Get original file size
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;

    // Read image file
    const imageBuffer = await fs.readFile(inputPath);
    
    // Load image using canvas
    const img = await loadImage(imageBuffer);
    let width = img.width;
    let height = img.height;

    // Calculate new dimensions if resize is needed
    if (maxWidth || maxHeight) {
      const widthRatio = maxWidth ? maxWidth / width : Infinity;
      const heightRatio = maxHeight ? maxHeight / height : Infinity;
      const ratio = Math.min(widthRatio, heightRatio, 1); // Don't enlarge

      width = Math.floor(width * ratio);
      height = Math.floor(height * ratio);
    }

    // Create canvas and draw image
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    // Get output format
    const ext = path.extname(inputPath).toLowerCase();
    const format = ext === '.png' ? 'image/png' : 'image/jpeg';

    // Convert quality from 0-100 to 0-1
    const qualityRatio = quality / 100;

    // Get compressed buffer
    const compressedBuffer = canvas.toBuffer(format as any, { quality: qualityRatio });

    // Write to output file
    await fs.writeFile(outputPath, compressedBuffer);

    // Get compressed file size
    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    return {
      success: true,
      outputPath,
      originalSize,
      compressedSize,
      compressionRatio: Math.max(0, compressionRatio), // Ensure non-negative
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Image compression failed',
    };
  }
}
