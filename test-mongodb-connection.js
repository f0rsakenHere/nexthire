// Test MongoDB Connection
// Run this file to test your MongoDB connection
// Usage: node test-mongodb-connection.js

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

console.log('🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', uri ? uri.replace(/:[^:@]+@/, ':****@') : 'NOT FOUND');
console.log('');

if (!uri) {
  console.error('❌ ERROR: MONGODB_URI not found in .env.local');
  console.log('\n📝 Please add MONGODB_URI to your .env.local file');
  process.exit(1);
}

async function testConnection() {
  let client;
  
  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    
    client = new MongoClient(uri);
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database access
    const db = client.db('nexthire');
    console.log('✅ Database "nexthire" accessible');
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collection(s):`);
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    // Test users collection
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`✅ Users collection has ${userCount} document(s)`);
    
    console.log('\n🎉 MongoDB connection test PASSED!');
    console.log('✅ Your application should work now');
    
  } catch (error) {
    console.error('\n❌ MongoDB Connection FAILED!');
    console.error('Error:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 FIX: Your cluster URL is incorrect');
      console.log('📖 Read MONGODB_CONNECTION_FIX.md for detailed instructions');
      console.log('\n💡 Steps to fix:');
      console.log('1. Go to MongoDB Atlas (https://cloud.mongodb.com/)');
      console.log('2. Click Database → Connect → Connect your application');
      console.log('3. Copy the connection string');
      console.log('4. Replace MONGODB_URI in .env.local');
      console.log('5. Make sure to replace <password> with your actual password');
      console.log('6. Add /nexthire before the ? in the URL');
    } else if (error.message.includes('authentication failed')) {
      console.log('\n🔧 FIX: Username or password is incorrect');
      console.log('💡 Check your MongoDB Atlas database user credentials');
    } else if (error.message.includes('IP')) {
      console.log('\n🔧 FIX: Your IP address is not whitelisted');
      console.log('💡 Go to MongoDB Atlas → Network Access → Add IP Address');
      console.log('💡 Add 0.0.0.0/0 to allow all IPs (for development)');
    }
    
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Connection closed');
    }
  }
}

testConnection();
