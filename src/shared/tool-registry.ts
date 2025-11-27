// Shared tool definitions for both web and desktop apps

export type ToolCategory = 'images' | 'documents' | 'data' | 'archives' | 'media' | 'text';

export type SystemTool = 'libreoffice' | 'imagemagick' | 'pandoc' | 'poppler';

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  
  // JS-only tools work immediately
  isJSOnly: boolean;
  
  // Pro tools require system tools
  requiresSystemTool?: SystemTool;
  
  // File formats
  inputFormats: string[];
  outputFormat: string;
  
  // Settings
  hasQualitySlider?: boolean;
  hasFormatSelector?: boolean;
  customSettings?: string[];
}

export const TOOL_CATEGORIES = {
  images: { name: 'Images', icon: '🖼️', color: 'purple' },
  documents: { name: 'Documents', icon: '📄', color: 'blue' },
  data: { name: 'Data', icon: '📊', color: 'green' },
  archives: { name: 'Archives', icon: '📦', color: 'yellow' },
  media: { name: 'Media', icon: '🎬', color: 'red' },
  text: { name: 'Text', icon: '📝', color: 'cyan' },
};

// PoC Tools: These work immediately with JS libraries
export const JS_ONLY_TOOLS: ToolDefinition[] = [
  {
    id: 'image-compress',
    name: 'Image Compressor',
    description: 'Reduce image file size while maintaining quality',
    category: 'images',
    icon: '🗜️',
    isJSOnly: true,
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormat: 'same',
    hasQualitySlider: true,
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert images to PDF documents',
    category: 'images',
    icon: '📄',
    isJSOnly: true,
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormat: 'pdf',
    customSettings: ['pageSize', 'orientation'],
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON data to CSV format',
    category: 'data',
    icon: '📊',
    isJSOnly: true,
    inputFormats: ['json'],
    outputFormat: 'csv',
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV data to JSON format',
    category: 'data',
    icon: '📋',
    isJSOnly: true,
    inputFormats: ['csv'],
    outputFormat: 'json',
    customSettings: ['delimiter', 'hasHeaders'],
  },
];

// Pro Tools: These require system tools (coming soon in PoC)
export const PRO_TOOLS: ToolDefinition[] = [
  {
    id: 'pdf-to-docx',
    name: 'PDF → DOCX',
    description: 'Convert PDF documents to Word format',
    category: 'documents',
    icon: '📝',
    isJSOnly: false,
    requiresSystemTool: 'libreoffice',
    inputFormats: ['pdf'],
    outputFormat: 'docx',
  },
  {
    id: 'docx-to-pdf',
    name: 'DOCX → PDF',
    description: 'Convert Word documents to PDF',
    category: 'documents',
    icon: '📄',
    isJSOnly: false,
    requiresSystemTool: 'libreoffice',
    inputFormats: ['docx'],
    outputFormat: 'pdf',
  },
  {
    id: 'pptx-to-pdf',
    name: 'PPTX → PDF',
    description: 'Convert PowerPoint presentations to PDF',
    category: 'documents',
    icon: '📊',
    isJSOnly: false,
    requiresSystemTool: 'libreoffice',
    inputFormats: ['pptx'],
    outputFormat: 'pdf',
  },
  {
    id: 'pdf-to-images-pro',
    name: 'PDF → Images (Pro)',
    description: 'High-quality PDF to image conversion',
    category: 'images',
    icon: '🖼️',
    isJSOnly: false,
    requiresSystemTool: 'imagemagick',
    inputFormats: ['pdf'],
    outputFormat: 'png',
    hasQualitySlider: true,
  },
];

// All tools combined
export const ALL_TOOLS = [...JS_ONLY_TOOLS, ...PRO_TOOLS];

// Helper functions
export function getToolById(id: string): ToolDefinition | undefined {
  return ALL_TOOLS.find(tool => tool.id === id);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return ALL_TOOLS.filter(tool => tool.category === category);
}

export function getJSOnlyTools(): ToolDefinition[] {
  return JS_ONLY_TOOLS;
}

export function getProTools(): ToolDefinition[] {
  return PRO_TOOLS;
}
