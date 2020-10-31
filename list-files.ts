import AWS from 'aws-sdk';

interface S3File {
  filepath?: string;
  url?: string;
}

export default function list(Bucket = '', Prefix = ''): Promise<S3File[]> {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket, Prefix }, function (err, { Contents = [] }) {
      if (err) return reject(err);
      return resolve(
        Contents.map((file) => ({
          filepath: file.Key || '',
          url: `https://${Bucket}/${file.Key}`,
        })),
      );
    });
  });
}
