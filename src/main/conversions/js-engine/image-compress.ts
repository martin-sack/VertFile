import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

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

    // Read and process image with Jimp
    const image = await Jimp.read(inputPath);

    // Resize if dimensions specified
    if (maxWidth || maxHeight) {
      image.scaleToFit(
        maxWidth || Jimp.AUTO,
        maxHeight || Jimp.AUTO
      );
    }

    // Set quality
    image.quality(quality);

    // Save compressed image
    await image.writeAsync(outputPath);

    // Get compressed file size
    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    return {
      success: true,
      outputPath,
      originalSize,
      compressedSize,
      compressionRatio: Math.max(0, compressionRatio),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Image compression failed',
    };
  }
}
