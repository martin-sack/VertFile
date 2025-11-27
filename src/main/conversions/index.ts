import { ConversionJob, ConversionResult } from '../types';
import { convertPdfToDocx } from './pdf-to-docx';
import { convertDocxToPdf } from './docx-to-pdf';
import { convertPptxToPdf } from './pptx-to-pdf';
import { convertPdfToImages } from './pdf-to-images';
import { convertImagesToPdf } from './images-to-pdf';
import { convertPdfToTxt } from './pdf-to-txt';
import { convertDocxToTxt } from './docx-to-txt';
import { parseConversionError, formatErrorForDisplay } from './errors';

export async function convertFile(job: ConversionJob): Promise<ConversionResult> {
  try {
    // Validate input file exists
    const fs = require('fs');
    if (!fs.existsSync(job.inputPath)) {
      const error = parseConversionError('File not found: ENOENT');
      return {
        success: false,
        error: formatErrorForDisplay(error),
        errorDetails: error,
      };
    }

    switch (job.conversionType) {
      case 'pdf-to-docx':
        return await convertPdfToDocx(job.inputPath, job.outputPath);
      case 'docx-to-pdf':
        return await convertDocxToPdf(job.inputPath, job.outputPath);
      case 'pptx-to-pdf':
        return await convertPptxToPdf(job.inputPath, job.outputPath);
      case 'pdf-to-images':
        return await convertPdfToImages(job.inputPath, job.outputPath, job.options);
      case 'images-to-pdf':
        return await convertImagesToPdf(job.inputPath, job.outputPath);
      case 'pdf-to-txt':
        return await convertPdfToTxt(job.inputPath, job.outputPath);
      case 'docx-to-txt':
        return await convertDocxToTxt(job.inputPath, job.outputPath);
      default:
        const error = parseConversionError(`Unsupported conversion type: ${job.conversionType}`);
        return {
          success: false,
          error: formatErrorForDisplay(error),
          errorDetails: error,
        };
    }
  } catch (error) {
    const parsedError = parseConversionError(error instanceof Error ? error : String(error));
    return {
      success: false,
      error: formatErrorForDisplay(parsedError),
      errorDetails: parsedError,
    };
  }
}

export * from './pdf-to-docx';
export * from './docx-to-pdf';
export * from './pptx-to-pdf';
export * from './pdf-to-images';
export * from './images-to-pdf';
export * from './pdf-to-txt';
export * from './docx-to-txt';
