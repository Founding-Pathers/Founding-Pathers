const { MongoMemoryServer } = require('../node_modules/mongodb-memory-server');
const { MongoClient } = require('mongodb');

async function connectToMongoDB(uri) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    // mock connection similar to conn.js
    await client.connect();
    console.log('Connected to MongoDB server');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}


jest.setTimeout(60000);

describe('MongoDB connection', () => {
  let mongoServer;
  let mongoUri;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it('should connect to MongoDB', async () => {
    const client = await connectToMongoDB(mongoUri);
    expect(client).toBeDefined();
    await client.close();
  });
});
