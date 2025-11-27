import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface SystemTools {
  libreoffice: boolean;
  imagemagick: boolean;
  poppler: boolean;
}

export async function checkCommandExists(cmd: string): Promise<boolean> {
  try {
    await execAsync(`${cmd} --version`);
    return true;
  } catch {
    return false;
  }
}

export async function detectTools(): Promise<SystemTools> {
  console.log('Detecting system tools...');
  
  const tools = {
    libreoffice: await checkCommandExists('soffice'),
    imagemagick: await checkCommandExists('convert'),
    poppler: await checkCommandExists('pdftoppm'),
  };

  console.log('System tools detected:', tools);
  return tools;
}

// Global storage
let cachedTools: SystemTools | null = null;

export async function getSystemTools(): Promise<SystemTools> {
  if (!cachedTools) {
    cachedTools = await detectTools();
  }
  return cachedTools;
}

export function refreshSystemTools(): void {
  cachedTools = null;
}
