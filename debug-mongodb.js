// MongoDB Connection Debugger
// This will help you identify the exact issue

require('dotenv').config({ path: '.env.local' });

console.log('🔍 MongoDB Connection Debugger\n');
console.log('=' .repeat(50));

// Check if MONGODB_URI exists
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.log('❌ MONGODB_URI not found in .env.local');
  console.log('\n📝 Action Required:');
  console.log('1. Make sure .env.local file exists in project root');
  console.log('2. Add MONGODB_URI variable');
  process.exit(1);
}

console.log('✅ MONGODB_URI found\n');

// Mask password for security
const maskedUri = uri.replace(/:[^:@]+@/, ':****@');
console.log('Connection String (masked):');
console.log(maskedUri);
console.log('');

// Check for common issues
const issues = [];

if (uri.includes('XXXXX')) {
  issues.push({
    type: '❌ CRITICAL',
    problem: 'Placeholder "XXXXX" found in connection string',
    solution: 'Replace XXXXX with your actual cluster identifier'
  });
}

if (uri.includes('<password>')) {
  issues.push({
    type: '❌ CRITICAL',
    problem: 'Placeholder "<password>" found',
    solution: 'Replace <password> with your actual password'
  });
}

if (uri.includes('your_mongodb_user')) {
  issues.push({
    type: '❌ CRITICAL',
    problem: 'Placeholder username found',
    solution: 'Replace with actual username: nexthire_db_admin'
  });
}

if (!uri.includes('/nexthire?')) {
  issues.push({
    type: '⚠️  WARNING',
    problem: 'Database name might be missing',
    solution: 'Make sure you have /nexthire before the ?'
  });
}

if (uri.includes('cluster0.mongodb.net')) {
  issues.push({
    type: '❌ CRITICAL',
    problem: 'Generic cluster URL detected',
    solution: 'You need the full cluster URL with unique identifier'
  });
}

// Display issues
if (issues.length > 0) {
  console.log('🚨 Issues Found:\n');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.type}`);
    console.log(`   Problem: ${issue.problem}`);
    console.log(`   Solution: ${issue.solution}`);
    console.log('');
  });
  
  console.log('=' .repeat(50));
  console.log('\n📖 How to Fix:\n');
  console.log('Step 1: Go to MongoDB Atlas');
  console.log('   → https://cloud.mongodb.com/');
  console.log('');
  console.log('Step 2: Click "Database" → Find your cluster');
  console.log('');
  console.log('Step 3: Click "Connect" button');
  console.log('');
  console.log('Step 4: Select "Connect your application"');
  console.log('');
  console.log('Step 5: Copy the connection string');
  console.log('   It will look like:');
  console.log('   mongodb+srv://user:<password>@cluster0.abc123.mongodb.net/');
  console.log('');
  console.log('Step 6: Modify it to:');
  console.log('   mongodb+srv://nexthire_db_admin:ylyYtC6Mqiur6O5Q@cluster0.abc123.mongodb.net/nexthire?retryWrites=true&w=majority');
  console.log('');
  console.log('   Replace:');
  console.log('   - abc123 with YOUR cluster identifier');
  console.log('   - Keep the password: ylyYtC6Mqiur6O5Q');
  console.log('   - Add /nexthire before the ?');
  console.log('');
  console.log('Step 7: Update .env.local with the corrected string');
  console.log('');
  console.log('Step 8: Restart your dev server (npm run dev)');
  console.log('');
  
} else {
  console.log('✅ No obvious issues found in connection string\n');
  console.log('Testing actual connection...\n');
  
  // Try to connect
  const { MongoClient } = require('mongodb');
  
  (async () => {
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();
      
      console.log('✅ Successfully connected to MongoDB!\n');
      
      const db = client.db('nexthire');
      const collections = await db.listCollections().toArray();
      
      console.log(`Database: nexthire`);
      console.log(`Collections: ${collections.length}`);
      
      if (collections.length > 0) {
        console.log('\nExisting collections:');
        for (const col of collections) {
          const count = await db.collection(col.name).countDocuments();
          console.log(`  - ${col.name}: ${count} document(s)`);
        }
      } else {
        console.log('\n⚠️  No collections found yet');
        console.log('This is normal for a new database');
        console.log('Collections will be created when you add data');
      }
      
      console.log('\n🎉 Your MongoDB connection is working!');
      console.log('✅ Try signing up in your app now');
      
    } catch (error) {
      console.log('❌ Connection failed!\n');
      console.log('Error:', error.message);
      
      if (error.message.includes('ENOTFOUND')) {
        console.log('\n💡 This means your cluster URL is wrong');
        console.log('Follow the steps above to get the correct URL');
      } else if (error.message.includes('authentication')) {
        console.log('\n💡 Username or password is incorrect');
        console.log('Check your MongoDB Atlas database user');
      }
    } finally {
      if (client) await client.close();
    }
  })();
}
