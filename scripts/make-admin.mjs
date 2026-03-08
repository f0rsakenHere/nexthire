// Run with: node scripts/make-admin.mjs your@email.com
import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://nexthire_db_admin:ylyYtC6Mqiur6O5Q@nexthire-cluster.6bacgya.mongodb.net/?appName=NextHire-cluster";

const email = process.argv[2];

if (!email) {
  console.error("❌  Usage: node scripts/make-admin.mjs your@email.com");
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  const db = client.db("nexthire");
  const result = await db
    .collection("users")
    .updateOne({ email }, { $set: { role: "admin" } });

  if (result.matchedCount === 0) {
    console.error(`❌  No user found with email: ${email}`);
    console.error(
      "    Make sure you have signed up first, then run this again.",
    );
  } else {
    console.log(`✅  ${email} is now an admin! Go to /nexthire-admin`);
  }
} finally {
  await client.disconnect();
}
