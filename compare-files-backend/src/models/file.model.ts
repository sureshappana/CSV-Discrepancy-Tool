export enum Concern {
    youtube_channel = 'YouTube Channel',
    subscriber_count = 'Subscriber Count'
}

export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
}

