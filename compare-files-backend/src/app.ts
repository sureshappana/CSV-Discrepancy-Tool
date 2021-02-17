import express from 'express';
import cors from 'cors';

import { UploadRouter } from './routes';
import logger from './utils/logger';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/', UploadRouter);

app.listen(port, () => {
    logger.info(`CSV discrepancies tool backend app listening at http://localhost:${port}`)
});
