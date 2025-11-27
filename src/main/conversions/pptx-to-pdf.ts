import { ConversionResult } from '../types';
import { runCommand, ensureDirectoryExists, checkCommandExists } from './utils';
import { parseConversionError, formatErrorForDisplay } from './errors';
import path from 'path';
import fs from 'fs/promises';

export async function convertPptxToPdf(
  inputPath: string,
  outputPath: string
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(outputPath);

    // Check if LibreOffice is available - REQUIRED
    const hasLibreOffice = await checkCommandExists('soffice');

    if (!hasLibreOffice) {
      const error = parseConversionError('LibreOffice not found');
      return {
        success: false,
        error: formatErrorForDisplay(error),
        errorDetails: error,
      };
    }

    // Use LibreOffice for conversion
    const outputDir = path.dirname(outputPath);
    const command = `soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
    await runCommand(command);

    // LibreOffice creates the file with the same name but .pdf extension
    const generatedFile = path.join(
      outputDir,
      path.basename(inputPath, path.extname(inputPath)) + '.pdf'
    );

    // Rename if needed
    if (generatedFile !== outputPath) {
      await fs.rename(generatedFile, outputPath);
    }

    // Validate that the output file actually exists
    try {
      await fs.access(outputPath);
    } catch {
      const error = parseConversionError('Output file was not created');
      return {
        success: false,
        error: formatErrorForDisplay(error),
        errorDetails: error,
      };
    }

    return {
      success: true,
      outputPath,
      outputFiles: [outputPath],
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
