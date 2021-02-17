import fs from 'fs';
import { File } from '../models/file.model';

export const files = ['./src/mock-data/input1.csv', './src/mock-data/input2.csv'];
export const nonCSVFile = './src/mock-data/test.png';

export const mockFileData: File[] = [
    {
        fieldname: 'input1.csv',
        originalname: 'input1.csv',
        encoding: 'utf-8',
        mimetype: 'text/csv',
        buffer: fs.readFileSync(files[0])
    },
    {
        fieldname: 'input2.csv',
        originalname: 'input2.csv',
        encoding: 'utf-8',
        mimetype: 'text/csv',
        buffer: fs.readFileSync(files[1])
    }
];
export const mockNonCSVFileData: File = {
    fieldname: 'test.png',
    originalname: 'test.png',
    encoding: 'utf-8',
    mimetype: 'image/png',
    buffer: fs.readFileSync(nonCSVFile)
};

export const responses = {
    noConcern: [
        'test_1@gmail.com',
        'test_4@gmail.com',
        'test_14@gmail.com',
        'test_15@gmail.com',
        'test_17@gmail.com',
        'test_26@gmail.com',
        'test_30@gmail.com',
        'test_31@gmail.com',
        'test_34@gmail.com',
        'test_35@gmail.com',
        'test_45@gmail.com',
        'test_46@gmail.com',
        'test_59@gmail.com'
    ],
    youtube_channel: [
        'test_4@gmail.com',
        'test_17@gmail.com',
        'test_26@gmail.com',
        'test_30@gmail.com',
        'test_31@gmail.com',
        'test_59@gmail.com'
      ],
    subscriber_count: [
        'test_1@gmail.com',
        'test_14@gmail.com',
        'test_15@gmail.com',
        'test_26@gmail.com',
        'test_34@gmail.com',
        'test_35@gmail.com',
        'test_45@gmail.com',
        'test_46@gmail.com'
      ]

}