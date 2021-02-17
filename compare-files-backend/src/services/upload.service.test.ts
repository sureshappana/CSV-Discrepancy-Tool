
import sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { Concern } from '../models/file.model';
import { processFiles } from './upload.service';
import chaiPromised from 'chai-as-promised';
import chai from 'chai';
import { mockFileData, responses } from 'src/mock-data';

chai.use(chaiPromised);
const expect = chai.expect;

let sandbox: SinonSandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});

afterEach(() => {
    sandbox.restore();
});

describe('upload service', () => {
    it('returns success for valid inputs', async () => {
        expect(await processFiles(mockFileData)).deep.equal(responses.noConcern);
        expect(await processFiles(mockFileData, 'youtube_channel' as Concern)).deep.equal(responses.youtube_channel);
        expect(await processFiles(mockFileData, 'subscriber_count' as Concern)).deep.equal(responses.subscriber_count);
    });

    it('throws error for empty array', async () => {
        await expect(processFiles([mockFileData[0]])).to.be.rejected;
    });

    it('throws error when single file passed', async () => {
        await expect(processFiles([mockFileData[0]])).to.be.rejected;
    });
});