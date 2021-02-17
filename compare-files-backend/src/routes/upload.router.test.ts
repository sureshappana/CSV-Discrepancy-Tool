import express from 'express';
import sinon, { SinonSandbox } from 'sinon';

import * as uploadController from '../controller/upload.controller';
import { UploadRouter } from './upload.route';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { files, nonCSVFile } from 'src/mock-data';

let app: any;

let sandbox: SinonSandbox;
chai.use(chaiHttp);

beforeEach(() => {
    app = express();
    app.use('/', UploadRouter);
    sandbox = sinon.createSandbox();
});
afterEach(() => {
    sandbox.restore();
});
describe('POST /upload', () => {

    it('should return 200 for success operation', () => {
        sandbox.stub(uploadController, 'uploadFiles').resolves(['email']);
        return chai.request(app)
            .post('/upload')
            .field('files', files)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.eql(['email']);
            });
    });
    it('should return 500 for invalid operation', () => {
        sandbox.stub(uploadController, 'uploadFiles').rejects();
        return chai.request(app)
            .post('/upload')
            .then((res) => {
                expect(res.status).to.eq(500);
            });
    });

    it('should ignore non csv file in the request', () => {
        sandbox.stub(uploadController, 'uploadFiles').resolves(['email']);
        return chai.request(app)
            .post('/upload')
            .field('files', [...files, nonCSVFile])
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.eql(['email']);
            });
    });
});