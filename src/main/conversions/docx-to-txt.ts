import { ConversionResult } from '../types';
import { runCommand, ensureDirectoryExists, checkCommandExists } from './utils';

export async function convertDocxToTxt(
  inputPath: string,
  outputPath: string
): Promise<ConversionResult> {
  try {
    await ensureDirectoryExists(outputPath);

    const hasPandoc = await checkCommandExists('pandoc');

    if (!hasPandoc) {
      return {
        success: false,
        error: 'Pandoc is not installed. Please install pandoc to convert DOCX to TXT.',
      };
    }

    const command = `pandoc "${inputPath}" -t plain -o "${outputPath}"`;
    await runCommand(command);

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
