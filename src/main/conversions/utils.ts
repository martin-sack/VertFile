import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export async function runCommand(command: string): Promise<{ stdout: string; stderr: string }> {
  try {
    return await execAsync(command);
  } catch (error: any) {
    throw new Error(`Command failed: ${error.message}`);
  }
}

export async function checkCommandExists(command: string): Promise<boolean> {
  try {
    const checkCmd = process.platform === 'win32' ? `where ${command}` : `which ${command}`;
    const result = await execAsync(checkCmd);
    console.log(`✅ Found ${command} at: ${result.stdout.trim()}`);
    return true;
  } catch (error) {
    console.log(`❌ ${command} not found in PATH`);
    return false;
  }
}

export async function checkCommandExistsAtPath(commandPath: string): Promise<boolean> {
  try {
    await fs.access(commandPath, fs.constants.X_OK);
    console.log(`✅ Found executable at: ${commandPath}`);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function checkPandocAvailability(): Promise<boolean> {
  console.log('🔍 Checking for Pandoc...');
  
  // Check in PATH first
  if (await checkCommandExists('pandoc')) {
    return true;
  }

  // Check common installation paths
  const commonPaths = [
    '/usr/local/bin/pandoc',
    '/opt/homebrew/bin/pandoc',
    'C:\\Program Files\\Pandoc\\pandoc.exe',
    'C:\\Program Files (x86)\\Pandoc\\pandoc.exe',
  ];

  for (const pandocPath of commonPaths) {
    if (await checkCommandExistsAtPath(pandocPath)) {
      return true;
    }
  }

  console.log('❌ Pandoc not found');
  return false;
}

export async function checkLibreOfficeAvailability(): Promise<boolean> {
  console.log('🔍 Checking for LibreOffice...');

  // Try different command names based on platform
  const commands = process.platform === 'darwin' 
    ? ['soffice', 'libreoffice']
    : process.platform === 'win32'
    ? ['soffice.exe', 'libreoffice.exe']
    : ['soffice', 'libreoffice'];

  // Check in PATH
  for (const cmd of commands) {
    if (await checkCommandExists(cmd)) {
      return true;
    }
  }

  // Check common installation paths
  const commonPaths = process.platform === 'darwin'
    ? [
        '/Applications/LibreOffice.app/Contents/MacOS/soffice',
        '/opt/homebrew/bin/soffice',
        '/usr/local/bin/soffice',
      ]
    : process.platform === 'win32'
    ? [
        'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
        'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
      ]
    : [
        '/usr/bin/soffice',
        '/usr/bin/libreoffice',
        '/usr/local/bin/soffice',
      ];

  for (const loPath of commonPaths) {
    if (await checkCommandExistsAtPath(loPath)) {
      return true;
    }
  }

  console.log('❌ LibreOffice not found');
  return false;
}

export async function checkToolAvailability() {
  console.log('🔧 Checking tool availability...');
  
  const [pandoc, libreoffice] = await Promise.all([
    checkPandocAvailability(),
    checkLibreOfficeAvailability(),
  ]);

  console.log(`📊 Tool detection results: Pandoc=${pandoc}, LibreOffice=${libreoffice}`);

  return { pandoc, libreoffice };
}

export function sanitizePath(filePath: string): string {
  return filePath.replace(/[<>:"|?*]/g, '_');
}
