import AWS from 'aws-sdk';
import { basename } from 'path';

interface S3File {
  filepath?: string;
  url?: string;
  isDirectory: boolean;
}

export default function list(
  Bucket = '',
  Prefix = '',
): Promise<S3File[] | null> {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket, Prefix }, function (err, output) {
      if (err) return reject(err);
      return resolve(
        (output.Contents || [])
          .filter(({ Key }) => Key !== Prefix)
          .map(({ Key = '', Size }) => ({
            basename: basename(Key),
            filepath: Key,
            url: `https://${Bucket}/${Key}`,
            isDirectory: Size === 0 && Key.endsWith('/'),
          })),
      );
    });
  });
}
