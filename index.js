const micro = require('micro')
const schedule = require('node-schedule')
const { MongoClient } = require('mongodb')

const job = schedule.scheduleJob('* * * * 7', function() {
  drop()
})

async function drop() {
  const client = await MongoClient.connect(process.env.MONGO_URL || 'mongodb://localhost:27018')
  const db = client.db(process.env.DB || 'apm')
  await db.collection('systemMetrics').drop()
  await db.collection('rmaLogs').drop()
  await db.collection('rawSystemMetrics').drop()
  await db.collection('rawPubMetrics').drop()
  await db.collection('rawMethodsMetrics').drop()
  await db.collection('rawErrorMetrics').drop()
  await db.collection('pubTraces').drop()
  await db.collection('pubMetrics').drop()
  await db.collection('prodStats').drop()
  await db.collection('methodsMetrics').drop()
  await db.collection('methodTraces').drop()
  await db.collection('errorTraces').drop()
  await db.collection('errorMetrics').drop()
  console.log('clean unused data')
}

console.log('scheduled at', JSON.stringify(job.nextInvocation()))

const server = micro((req, res) => {
  if (req.url === '/?force=true') {
    drop()
  }
  return job.nextInvocation()
})

server.listen(process.env.PORT || 3000)
