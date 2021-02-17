import express from 'express';
import multer from 'multer';

import { uploadFiles } from '../controller/upload.controller';
import logger from '../utils/logger';

const router = express.Router();

/** File filter utility. It ignores non csv files */
const fileFilter = (req, file, cb) => {

  if (!file) {
    logger.debug('File is empty. Ignoring');
    cb(null, false);
    return;
  }
  const { originalname, mimetype } = file;
  logger.debug(`received ${file.originalname} is of type: ${file.mimetype}`);
  if (mimetype === 'text/csv') {
    logger.debug(`allowing ${file.originalname}`);
    cb(null, true);
  } else {
    logger.debug(`ignoring ${file.originalname}`);
    cb(null, false);
  }
};

// Multer to accept multiple input files
const upload = multer({
  fileFilter
});

/**
 * router post operation
 */
router.post('/upload', upload.array('files'), async (req, res, next) => {

  try {
    const discrepancies = await uploadFiles(req.files, req?.body?.concern);
    logger.info(`Response received from processing files: ${discrepancies}`);
    res.status(200).send(discrepancies);
  } catch (err) {
    const loggerHead = `Error in processing uploaded files: ${err.message}`;
    logger.error(loggerHead);
    res.status(500).send(loggerHead);
  }
});


export { router as UploadRouter };