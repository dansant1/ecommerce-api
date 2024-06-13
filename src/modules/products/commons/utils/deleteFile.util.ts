import { promises as fs } from 'fs'; 

export async function deleteFile(filePath: string) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Failed to delete file: ${filePath}`, error);
    }
}