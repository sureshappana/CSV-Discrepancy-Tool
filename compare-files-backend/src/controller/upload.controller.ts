import { Concern } from "../models";
import { processFiles } from "../services/upload.service";

export async function uploadFiles(files: any, concern?: any) {

  // Check if concern is valid or not
  if (concern && !(concern in Concern)) {
    throw new Error('Invalid concern parameter');
  }

  // Check if files are valid or not
  if (!files || !Array.isArray(files) && files.length < 2) {
    throw new Error('Invalid file count with csv format');
  }
  return processFiles(files, concern as Concern);
}