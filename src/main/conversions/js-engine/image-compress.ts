import sharp from 'sharp';
import path from 'path';

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
    const fs = await import('fs/promises');
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;

    // Get image format
    const ext = path.extname(inputPath).toLowerCase().slice(1);

    // Process image
    let pipeline = sharp(inputPath);

    // Resize if dimensions specified
    if (maxWidth || maxHeight) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Apply compression based on format
    if (ext === 'jpeg' || ext === 'jpg') {
      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    } else if (ext === 'png') {
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
    } else if (ext === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else {
      // Default to JPEG for unknown formats
      pipeline = pipeline.jpeg({ quality });
    }

    // Save compressed image
    await pipeline.toFile(outputPath);

    // Get compressed file size
    const compressedStats = await fs.stat(outputPath);
    const compressedSize = compressedStats.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    return {
      success: true,
      outputPath,
      originalSize,
      compressedSize,
      compressionRatio,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Image compression failed',
    };
  }
}
