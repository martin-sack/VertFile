import { ConversionResult } from '../types';
import { runCommand, ensureDirectoryExists } from './utils';
import { getSystemTools } from '../systemTools';
import path from 'path';
import fs from 'fs/promises';

export async function convertPdfToDocx(
  inputPath: string,
  outputPath: string
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(outputPath);

    // Check if LibreOffice is available - REQUIRED
    const tools = await getSystemTools();
    
    if (!tools.libreoffice) {
      return {
        success: false,
        error: 'PDF → DOCX requires LibreOffice. Install it from https://libreoffice.org',
        errorDetails: {
          type: 'TOOL_NOT_FOUND',
          message: 'LibreOffice not found',
          hint: 'This conversion requires LibreOffice. Install it to enable this tool.',
          action: 'Install LibreOffice: brew install --cask libreoffice (macOS) or visit libreoffice.org',
          reason: 'missing_tool',
        },
      };
    }

    // Use LibreOffice for conversion
    const outputDir = path.dirname(outputPath);
    const command = `soffice --headless --convert-to docx --outdir "${outputDir}" "${inputPath}"`;
    
    console.log('Running LibreOffice command:', command);
    await runCommand(command);
    console.log('LibreOffice command completed');

    // LibreOffice creates the file with the same name but .docx extension
    const generatedFile = path.join(
      outputDir,
      path.basename(inputPath, path.extname(inputPath)) + '.docx'
    );

    // Rename if needed
    if (generatedFile !== outputPath) {
      await fs.rename(generatedFile, outputPath);
    }

    // Validate that the output file actually exists
    console.log('Checking if output file exists:', outputPath);
    try {
      await fs.access(outputPath);
      const stats = await fs.stat(outputPath);
      if (stats.size === 0) {
        console.error('Output file is empty:', outputPath);
        return {
          success: false,
          error: 'LibreOffice did not produce a valid file',
          errorDetails: {
            type: 'CONVERSION_FAILED',
            message: 'Conversion failed',
            hint: 'LibreOffice created an empty file. The PDF may be corrupted or incompatible.',
            reason: 'other',
          },
        };
      }
      console.log('Output file exists and is valid! Size:', stats.size);
    } catch (err) {
      console.error('Output file does NOT exist:', outputPath);
      return {
        success: false,
        error: 'Output file was not created',
        errorDetails: {
          type: 'CONVERSION_FAILED',
          message: 'Output file was not created',
          hint: 'LibreOffice did not produce a file. The conversion may have failed.',
          reason: 'other',
        },
      };
    }

    return {
      success: true,
      outputPath,
      outputFiles: [outputPath],
    };
  } catch (error) {
    console.error('PDF → DOCX conversion error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed',
      errorDetails: {
        type: 'CONVERSION_FAILED',
        message: 'Conversion failed',
        hint: error instanceof Error ? error.message : 'An unexpected error occurred',
        reason: 'other',
      },
    };
  }
}
