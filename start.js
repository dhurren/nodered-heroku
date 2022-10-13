
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
  await sync(  's3://'+bucket+'/'+name, '/app', { relocations: [[name, '']] } )
  
  exec( 'pm2-runtime start /app/node_modules/node-red/red.js -i 1 -- --settings /app/settings.js --userDir /app' )
}
