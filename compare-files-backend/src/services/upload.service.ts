import logger from '../utils/logger';
import parser from 'csvtojson';
import { Concern, File } from '../models';

/**
 * formats channel name to proper format and removes uc from it
 * @param channel input channel name
 */
function formatChannel(channel: string) {
  return channel.replace(/.*\/channel\/(uc)?/i, '').replace(/^(uc)/i, '');
};

/**
 * formats number to proper number format by removing commas from it
 * @param channel input channel name
 */
function formatNumber(count: string) {
  return parseFloat(count.replace(/,/g, ''));
}


/**
 * this function does all the comparison to find discrepancies in files
 * @param files Array of files
 * @param concern concern is either subscriber count or youtube channel
 */
export async function processFiles(files: File[], concern?: Concern) {

  try {
    logger.info(`Received ${files.length} and concern: ${concern}`);

    if (!files || !Array.isArray(files) || files.length < 2) {
      const errorMessage = 'Minimum two valid input files are required for comparison';
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    const parsedFileData = new Array();

    for (const file of files) {
      parsedFileData.push(await parser().fromString(file.buffer.toString()));
    }

    // Assuming length of file data is same (i.e., list of all emails are same and in same order)
    let j = 0;
    const discrepancies = new Array<string>();
    while (j < parsedFileData[0].length) {

      const firstFileEntry = parsedFileData[0][j];
      const email = firstFileEntry['Account Email'];
      const subscriberCount = formatNumber(firstFileEntry[Concern.subscriber_count]);
      const channelName = formatChannel(firstFileEntry[Concern.youtube_channel]);
      let i = 1;
      while (i < files.length) {
        const testFileEntry = parsedFileData[i][j]
        const testSubscriberCount = formatNumber(testFileEntry[Concern.subscriber_count]);
        const testChannelName = formatChannel(testFileEntry[Concern.youtube_channel]);

        const isSubscribersMatched = testSubscriberCount === subscriberCount;
        const isChannelNameMatched = testChannelName === channelName;

        if (Concern[concern] === Concern.youtube_channel && !isChannelNameMatched) {
          discrepancies.push(email);
          break;
        } else if (Concern[concern] === Concern.subscriber_count && !isSubscribersMatched) {
          discrepancies.push(email);
          break;
        } else if (!concern && !(isSubscribersMatched && isChannelNameMatched)) {
          discrepancies.push(email);
          break;
        }
        i++;
      }
      j++;
    }

    return discrepancies;
  } catch (err) {
    throw err;
  }
};