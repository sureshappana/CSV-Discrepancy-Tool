import chai from 'chai';
import chaiPromised from 'chai-as-promised';
import { SinonSandbox } from 'sinon';
import sinon from 'sinon';

import { mockFileData } from 'src/mock-data';
import { uploadFiles } from './upload.controller';
import * as UploadService from 'src/services/upload.service';

chai.use(chaiPromised);
const expect = chai.expect;

let sandbox: SinonSandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});

afterEach(() => {
    sandbox.restore();
});
describe('upload controller', () => {
    it('upload files with valid data', async () => {
        sandbox.stub(UploadService, 'processFiles').resolves(['email']);
        expect(await uploadFiles(mockFileData, 'youtube_channel')).to.eql(['email']);
        expect(await uploadFiles(mockFileData, 'subscriber_count')).to.eql(['email']);
        expect(await uploadFiles(mockFileData)).to.eql(['email']);
    });
    it('upload files with invalid concern should be rejected', async () => {
        await expect(uploadFiles(mockFileData, 'test-random-concern')).to.be.rejected;
    });
    it('upload files with invalid concern should be rejected', async () => {
        await expect(uploadFiles(mockFileData, 'test-random-concern')).to.be.rejected;
    });
})