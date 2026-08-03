import SftpClient from 'ssh2-sftp-client';

const {
  SFTP_HOST,
  SFTP_PORT,
  SFTP_USER,
  SFTP_PASSWORD,
  REMOTE_REPORT_PATH,
} = process.env;

const LOCAL_PATH = './docs/index.html';

async function main() {
  const sftp = new SftpClient();
  try {
    await sftp.connect({
      host: SFTP_HOST,
      port: Number(SFTP_PORT),
      username: SFTP_USER,
      password: SFTP_PASSWORD,
    });
    await sftp.get(REMOTE_REPORT_PATH, LOCAL_PATH);
    console.log('Synced report to', LOCAL_PATH);
  } catch (err) {
    console.error('Sync failed:', err.message);
    process.exit(1);
  } finally {
    sftp.end();
  }
}

main();
