export type ConversionStatus = 'success' | 'failed';

export interface ConversionRecord {
  id: string; // uuid or timestamp
  timestamp: number; // Date.now()
  toolId: string; // "pdf-to-docx", "images-to-pdf", etc.
  toolName: string; // "PDF → DOCX", "Images → PDF", etc.
  inputPaths: string[]; // file names or paths
  outputPath?: string; // folder or file path (desktop)
  status: ConversionStatus;
  error?: string; // error message if failed
}
