
const {exec} = require('child_process')
const {S3Client} = require('@aws-sdk/client-s3')
const S3SyncClient = require('s3-sync-client')

const key_id = process.env.BUCKETEER_AWS_ACCESS_KEY_ID 
const key = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY 
const region = process.env.BUCKETEER_AWS_REGION
const bucket = process.env.BUCKETEER_BUCKET_NAME     

const name = process.env.NODE_RED_USERNAME  

restore()

async function restore() {       
  
  const s3Client = new S3Client( { region: region, credentials: { accessKeyId: key_id, secretAccessKey: key }} )
  const {sync} = new S3SyncClient({ client: s3Client });  
  
  //put this back later **** filters are broken/syntax error *****
  //await sync(  's3://'+bucket+'/'+name, '/app', { relocations: [[name, '']] } )
  //await sync( 's3://'+bucket+'/'+name, '/app', { relocations: [[name, '']],
    //      filters: [ { exclude: (key) => key.includes('pm2.json') }, { exclude: (key) => key.includes('proxy.js') } ] } ) 
  
  exec( 'pm2-runtime start pm2.json && pm2-runtime logs all' , (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}
