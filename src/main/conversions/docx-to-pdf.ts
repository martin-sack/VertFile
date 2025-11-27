import { ConversionResult } from '../types';
import { runCommand, ensureDirectoryExists } from './utils';
import { getSystemTools } from '../systemTools';
import path from 'path';
import fs from 'fs/promises';

export async function convertDocxToPdf(
  inputPath: string,
  outputPath: string
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(outputPath);

    const tools = await getSystemTools();

    if (!tools.libreoffice) {
      return {
        success: false,
        error: 'DOCX → PDF requires LibreOffice',
        errorDetails: {
          type: 'TOOL_NOT_FOUND',
          message: 'LibreOffice not found',
          hint: 'This conversion requires LibreOffice',
          action: 'Install LibreOffice: brew install --cask libreoffice',
          reason: 'missing_tool',
        },
      };
    }

    const outputDir = path.dirname(outputPath);
    const command = `soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
    
    console.log('Running:', command);
    await runCommand(command);

    const generatedFile = path.join(outputDir, path.basename(inputPath, path.extname(inputPath)) + '.pdf');

    if (generatedFile !== outputPath) {
      await fs.rename(generatedFile, outputPath);
    }

    await fs.access(outputPath);
    const stats = await fs.stat(outputPath);
    
    if (stats.size === 0) {
      return {
        success: false,
        error: 'Output file is empty',
        errorDetails: {
          type: 'CONVERSION_FAILED',
          message: 'Conversion failed',
          hint: 'LibreOffice created an empty file',
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
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed',
      errorDetails: {
        type: 'CONVERSION_FAILED',
        message: 'Conversion failed',
        hint: error instanceof Error ? error.message : 'Unknown error',
        reason: 'other',
      },
    };
  }
}
