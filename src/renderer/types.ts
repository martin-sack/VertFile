export interface ConversionTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  conversionType: string;
  inputExtensions: string[];
  outputExtension: string;
  category: 'pdf' | 'office' | 'image' | 'text';
}

export interface BatchJob {
  id: string;
  fileName: string;
  inputPath: string;
  outputPath: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}
