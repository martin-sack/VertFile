import { ConversionResult } from '../types';
import { ensureDirectoryExists } from './utils';
// @ts-ignore - pdf-parse doesn't have types
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';

export async function convertPdfToTxt(
  inputPath: string,
  outputPath: string
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(outputPath);

    const dataBuffer = await fs.readFile(inputPath);
    const data = await pdfParse(dataBuffer);

    await fs.writeFile(outputPath, data.text);

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
