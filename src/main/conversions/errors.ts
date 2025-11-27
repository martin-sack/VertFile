// Conversion error types and helpful messages

export enum ConversionErrorType {
  TOOL_NOT_FOUND = 'TOOL_NOT_FOUND',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  FILE_ENCRYPTED = 'FILE_ENCRYPTED',
  PASSWORD_REQUIRED = 'PASSWORD_REQUIRED',
  FILE_CORRUPTED = 'FILE_CORRUPTED',
  UNSUPPORTED_FORMAT = 'UNSUPPORTED_FORMAT',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  DISK_SPACE = 'DISK_SPACE',
  INVALID_OUTPUT = 'INVALID_OUTPUT',
  CONVERSION_FAILED = 'CONVERSION_FAILED',
  UNKNOWN = 'UNKNOWN',
}

export interface ConversionError {
  type: ConversionErrorType;
  message: string;
  hint: string;
  action?: string;
  reason?: 'missing_tool' | 'encrypted_pdf' | 'password_required' | 'no_images_generated' | 'file_not_found' | 'permission_denied' | 'corrupted_file' | 'other';
}

export function parseConversionError(error: Error | string): ConversionError {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const lowerMessage = errorMessage.toLowerCase();

  // Tool not found errors
  if (
    lowerMessage.includes('pandoc') &&
    (lowerMessage.includes('not found') || lowerMessage.includes('command not found'))
  ) {
    return {
      type: ConversionErrorType.TOOL_NOT_FOUND,
      message: 'Pandoc not found',
      hint: 'Pandoc is required for this conversion. Install it to continue.',
      action: 'Install Pandoc: brew install pandoc (macOS) or visit pandoc.org',
      reason: 'missing_tool',
    };
  }

  if (
    (lowerMessage.includes('libreoffice') || lowerMessage.includes('soffice')) &&
    (lowerMessage.includes('not found') || lowerMessage.includes('command not found'))
  ) {
    return {
      type: ConversionErrorType.TOOL_NOT_FOUND,
      message: 'LibreOffice not found',
      hint: 'This conversion requires LibreOffice. Install it to enable this tool.',
      action: 'Install LibreOffice: brew install --cask libreoffice (macOS) or visit libreoffice.org',
      reason: 'missing_tool',
    };
  }

  if (
    (lowerMessage.includes('imagemagick') || lowerMessage.includes('poppler')) &&
    lowerMessage.includes('not found')
  ) {
    return {
      type: ConversionErrorType.TOOL_NOT_FOUND,
      message: 'ImageMagick or Poppler not found',
      hint: 'PDF → Images requires ImageMagick or Poppler to convert PDF pages to images.',
      action:
        'Install ImageMagick: brew install imagemagick (macOS) or Poppler: brew install poppler (macOS)',
      reason: 'missing_tool',
    };
  }

  // File not found
  if (lowerMessage.includes('enoent') || lowerMessage.includes('no such file')) {
    return {
      type: ConversionErrorType.FILE_NOT_FOUND,
      message: 'File not found',
      hint: 'The input file could not be found. It may have been moved or deleted.',
      action: 'Check that the file exists and try again',
      reason: 'file_not_found',
    };
  }

  // Permission denied
  if (lowerMessage.includes('eacces') || lowerMessage.includes('permission denied')) {
    return {
      type: ConversionErrorType.PERMISSION_DENIED,
      message: 'Permission denied',
      hint: 'Unable to read the input file or write to the output location.',
      action: 'Check file permissions or choose a different output folder',
      reason: 'permission_denied',
    };
  }

  // Disk space
  if (lowerMessage.includes('enospc') || lowerMessage.includes('no space left')) {
    return {
      type: ConversionErrorType.DISK_SPACE,
      message: 'Not enough disk space',
      hint: 'There is not enough space on the disk to complete the conversion.',
      action: 'Free up disk space and try again',
    };
  }

  // Encrypted file (pdf-lib specific)
  if (lowerMessage.includes('is encrypted') || lowerMessage.includes('ignoreencryption')) {
    return {
      type: ConversionErrorType.FILE_ENCRYPTED,
      message: 'This PDF is encrypted',
      hint: 'This PDF is encrypted. For security reasons, it cannot be processed automatically.',
      action: 'You can try loading it anyway, but some features may not work correctly.',
      reason: 'encrypted_pdf',
    };
  }

  // Password required
  if (lowerMessage.includes('password') && (lowerMessage.includes('required') || lowerMessage.includes('protected'))) {
    return {
      type: ConversionErrorType.PASSWORD_REQUIRED,
      message: 'Password required',
      hint: 'This PDF is password protected.',
      action: 'Password entry is not yet supported. Please remove the password and try again.',
      reason: 'password_required',
    };
  }

  // Corrupted file
  if (
    lowerMessage.includes('corrupted') ||
    lowerMessage.includes('invalid') ||
    lowerMessage.includes('malformed') ||
    lowerMessage.includes('cannot parse')
  ) {
    return {
      type: ConversionErrorType.FILE_CORRUPTED,
      message: 'File is corrupted or invalid',
      hint: 'The file appears to be damaged or not a valid format.',
      action: 'Try opening the file in its native application to verify it works',
      reason: 'corrupted_file',
    };
  }

  // Unsupported format
  if (
    lowerMessage.includes('unsupported') ||
    lowerMessage.includes('not supported') ||
    lowerMessage.includes('unknown format')
  ) {
    return {
      type: ConversionErrorType.UNSUPPORTED_FORMAT,
      message: 'Unsupported file format',
      hint: 'This file format is not supported for this conversion.',
      action: 'Check that you selected the correct conversion tool',
    };
  }

  // Invalid output path
  if (lowerMessage.includes('output') && lowerMessage.includes('invalid')) {
    return {
      type: ConversionErrorType.INVALID_OUTPUT,
      message: 'Invalid output location',
      hint: 'The output folder path is invalid or inaccessible.',
      action: 'Choose a different output folder',
    };
  }

  // No images generated (PDF to images specific)
  if (lowerMessage.includes('no images generated') || lowerMessage.includes('no images')) {
    return {
      type: ConversionErrorType.CONVERSION_FAILED,
      message: 'No images generated',
      hint: 'The PDF conversion completed but no image files were created.',
      action: 'Check that the PDF is valid and try again',
      reason: 'no_images_generated',
    };
  }

  // Generic conversion failure
  if (lowerMessage.includes('conversion failed') || lowerMessage.includes('failed to convert')) {
    return {
      type: ConversionErrorType.CONVERSION_FAILED,
      message: 'Conversion failed',
      hint: 'The conversion process encountered an error.',
      action: 'Check that the input file is valid and try again',
    };
  }

  // Unknown error
  return {
    type: ConversionErrorType.UNKNOWN,
    message: 'Conversion failed',
    hint: errorMessage || 'An unexpected error occurred during conversion.',
    action: 'Try again or check the file format',
    reason: 'other',
  };
}

export function formatErrorForDisplay(error: ConversionError): string {
  return `${error.message}: ${error.hint}`;
}

export function getErrorAction(error: ConversionError): string | undefined {
  return error.action;
}
