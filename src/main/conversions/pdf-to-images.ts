import { ConversionResult, ConversionOptions } from '../types';
import { ensureDirectoryExists, checkCommandExists, runCommand } from './utils';
import { parseConversionError, formatErrorForDisplay } from './errors';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function convertPdfToImages(
  inputPath: string,
  outputDir: string,
  options?: ConversionOptions
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(path.join(outputDir, 'dummy.txt'));

    // Check for ImageMagick or Poppler
    const hasImageMagick = await checkCommandExists('magick');
    const hasConvert = await checkCommandExists('convert');
    const hasPoppler = await checkCommandExists('pdftoppm');

    const hasImageEngine = hasImageMagick || hasConvert || hasPoppler;

    if (!hasImageEngine) {
      // Return proper error - tools are missing
      const errorDetails = parseConversionError('ImageMagick or Poppler not found');

      return {
        success: false,
        error: formatErrorForDisplay(errorDetails),
        errorDetails,
      };
    }

    // Get PDF info - handle encryption
    const pdfBytes = await fs.readFile(inputPath);
    let pdfDoc: PDFDocument;
    
    try {
      pdfDoc = await PDFDocument.load(pdfBytes, {
        ignoreEncryption: options?.ignoreEncryption === true,
      });
    } catch (error) {
      // Check if it's an encryption error
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('encrypted') || errorMessage.includes('ignoreEncryption')) {
        const errorDetails = parseConversionError(errorMessage);
        return {
          success: false,
          error: formatErrorForDisplay(errorDetails),
          errorDetails,
        };
      }
      // Re-throw other errors to be caught by outer try/catch
      throw error;
    }
    
    const pageCount = pdfDoc.getPageCount();

    const format = options?.imageFormat || 'png';
    const baseName = path.basename(inputPath, path.extname(inputPath));
    const dpi = options?.dpi || 300;

    let outputFiles: string[] = [];

    // Try ImageMagick first (magick or convert)
    if (hasImageMagick || hasConvert) {
      const command = hasImageMagick ? 'magick' : 'convert';
      const outputPattern = path.join(outputDir, `${baseName}-%d.${format}`);

      try {
        await runCommand(
          `${command} -density ${dpi} "${inputPath}" "${outputPattern}"`
        );
      } catch (error) {
        // ImageMagick failed, try Poppler if available
        if (hasPoppler) {
          try {
            const outputPrefix = path.join(outputDir, baseName);
            await runCommand(`pdftoppm -${format} -r ${dpi} "${inputPath}" "${outputPrefix}"`);
          } catch (popplerError) {
            // Both failed
            throw popplerError;
          }
        } else {
          throw error;
        }
      }
    } else if (hasPoppler) {
      // Use Poppler
      const outputPrefix = path.join(outputDir, baseName);
      await runCommand(`pdftoppm -${format} -r ${dpi} "${inputPath}" "${outputPrefix}"`);
    }

    // After running conversion commands, validate that actual image files were created
    const allFiles = await fs.readdir(outputDir);
    
    // Filter to only include actual image files (PNG, JPG, JPEG)
    const imageFiles = allFiles
      .filter((name) => {
        const lowerName = name.toLowerCase();
        return (
          (lowerName.endsWith('.png') ||
           lowerName.endsWith('.jpg') ||
           lowerName.endsWith('.jpeg')) &&
          !lowerName.endsWith('.txt') // Explicitly exclude .txt files
        );
      })
      .map((name) => path.join(outputDir, name));

    // Only return success if at least one image file was created
    if (imageFiles.length === 0) {
      const errorDetails = parseConversionError('No images generated');
      return {
        success: false,
        error: formatErrorForDisplay(errorDetails),
        errorDetails,
      };
    }

    outputFiles = imageFiles;

    return {
      success: true,
      outputPath: outputDir,
      outputFiles,
    };
  } catch (error) {
    const parsedError = parseConversionError(error instanceof Error ? error : String(error));
    return {
      success: false,
      error: formatErrorForDisplay(parsedError),
      errorDetails: parsedError,
    };
  }
}
