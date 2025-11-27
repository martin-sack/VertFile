import Papa from 'papaparse';
import fs from 'fs/promises';

export interface JSONToCSVOptions {
  delimiter?: string;
  includeHeaders?: boolean;
}

export interface CSVToJSONOptions {
  delimiter?: string;
  hasHeaders?: boolean;
}

export interface ConversionResult {
  success: boolean;
  outputPath?: string;
  rowCount?: number;
  error?: string;
}

export async function jsonToCSV(
  inputPath: string,
  outputPath: string,
  options: JSONToCSVOptions = {}
): Promise<ConversionResult> {
  try {
    const { delimiter = ',', includeHeaders = true } = options;

    // Read JSON file
    const jsonContent = await fs.readFile(inputPath, 'utf-8');
    const jsonData = JSON.parse(jsonContent);

    // Ensure data is an array
    const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

    if (dataArray.length === 0) {
      return {
        success: false,
        error: 'JSON file is empty or invalid',
      };
    }

    // Convert to CSV
    const csv = Papa.unparse(dataArray, {
      delimiter,
      header: includeHeaders,
      skipEmptyLines: true,
    });

    // Write CSV file
    await fs.writeFile(outputPath, csv, 'utf-8');

    return {
      success: true,
      outputPath,
      rowCount: dataArray.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'JSON to CSV conversion failed',
    };
  }
}

export async function csvToJSON(
  inputPath: string,
  outputPath: string,
  options: CSVToJSONOptions = {}
): Promise<ConversionResult> {
  try {
    const { delimiter = ',', hasHeaders = true } = options;

    // Read CSV file
    const csvContent = await fs.readFile(inputPath, 'utf-8');

    // Parse CSV
    const parseResult = Papa.parse(csvContent, {
      delimiter,
      header: hasHeaders,
      skipEmptyLines: true,
      dynamicTyping: true, // Auto-convert numbers and booleans
    });

    if (parseResult.errors.length > 0) {
      return {
        success: false,
        error: `CSV parsing error: ${parseResult.errors[0].message}`,
      };
    }

    // Convert to JSON
    const jsonData = parseResult.data;
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Write JSON file
    await fs.writeFile(outputPath, jsonString, 'utf-8');

    return {
      success: true,
      outputPath,
      rowCount: jsonData.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CSV to JSON conversion failed',
    };
  }
}
