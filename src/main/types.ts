export interface ConversionJob {
  id: string;
  inputPath: string;
  outputPath: string;
  conversionType: ConversionType;
  options?: ConversionOptions;
}

export type ConversionType =
  | 'pdf-to-docx'
  | 'docx-to-pdf'
  | 'pptx-to-pdf'
  | 'pdf-to-images'
  | 'images-to-pdf'
  | 'pdf-to-txt'
  | 'docx-to-txt';

export interface ConversionOptions {
  imageFormat?: 'png' | 'jpg';
  quality?: number;
  dpi?: number;
  ignoreEncryption?: boolean; // For encrypted PDFs
}

export type ConversionErrorReason =
  | 'missing_tool'
  | 'encrypted_pdf'
  | 'password_required'
  | 'no_images_generated'
  | 'file_not_found'
  | 'permission_denied'
  | 'corrupted_file'
  | 'other';

export interface ConversionResult {
  success: boolean;
  outputPath?: string;
  outputFiles?: string[]; // For multi-file outputs like PDF → Images
  error?: string;
  errorDetails?: {
    type: string;
    message: string;
    hint: string;
    action?: string;
    reason?: ConversionErrorReason; // Structured error reason
  };
}

export interface BatchJobUpdate {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
  outputPath?: string;
}
