# MongoDB Integration - Troubleshooting & Implementation Guide

## 📋 Table of Contents
1. [Implementation Overview](#implementation-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [Troubleshooting Checklist](#troubleshooting-checklist)
5. [Common Errors & Solutions](#common-errors--solutions)
6. [Testing Guide](#testing-guide)

---

## Implementation Overview

### What We Built

A complete user authentication system that:
- ✅ Uses Firebase for authentication (Email, Google, GitHub)
- ✅ Stores user data in MongoDB Atlas
- ✅ Automatically creates user records on signup/social login
- ✅ Prevents duplicate users
- ✅ Provides CRUD API endpoints

### Tech Stack
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Authentication:** Firebase Auth
- **Database:** MongoDB Atlas
- **API:** Next.js API Routes

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   USER                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Sign Up     │  │  Sign In     │  │  Dashboard   │       │
│  │  Page        │  │  Page        │  │  Page        │       │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘       │
│         │                  │                                │
│         └──────────┬───────┘                                │
│                    ▼                                        │
│         ┌──────────────────────┐                            │
│         │  Firebase Auth       │                            │
│         │  (Email/Google/      │                            │
│         │   GitHub)            │                            │
│         └──────────┬───────────┘                            │
└────────────────────┼────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (API Routes)                     │
│                                                             │
│  POST /api/users                                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Receive user data (uid, email, name, etc.)      │     │
│  │ 2. Check if user exists (by uid)                   │     │
│  │ 3. If exists: Return existing user                 │     │
│  │ 4. If not: Create new user document                │     │
│  │ 5. Return user data                                │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  GET /api/users?uid=xxx                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Receive uid from query params                   │     │
│  │ 2. Find user in database                           │     │
│  │ 3. Return user data or 404                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  PUT /api/users                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Receive uid and update data                     │     │
│  │ 2. Update user document                            │     │
│  │ 3. Return updated user                             │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│                    ▼                                        │
│         ┌──────────────────────┐                            │
│         │  MongoDB Connection  │                            │
│         │  (lib/mongodb.ts)    │                            │
│         └──────────┬───────────┘                            │
└────────────────────┼────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Atlas                             │
│                                                             │
│  Database: nexthire                                         │
│  Collection: users                                          │
│                                                             │
│  Document Structure:                                        │
│  {                                                          │
│    uid: "firebase_uid",                                     │
│    email: "user@example.com",                               │
│    name: "User Name",                                       │
│    provider: "email|google|github",                         │
│    role: "user",                                            │
│    createdAt: Date,                                         │
│    updatedAt: Date,                                         │
│    ...                                                      │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Implementation

### Step 1: MongoDB Connection Utility

**File:** `lib/mongodb.ts`

```typescript
import { MongoClient } from 'mongodb';

// Validate environment variable
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Development: Use global variable for connection pooling
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Production: Create new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

**Why this approach?**
- ✅ Connection pooling in development (reuses connection)
- ✅ Prevents "too many connections" error
- ✅ Optimized for Next.js hot reload
- ✅ Production-ready

---

### Step 2: API Route for User Management

**File:** `app/api/users/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// CREATE or CHECK USER
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, name, provider, photoURL } = body;

    // Validation
    if (!uid || !email) {
      return NextResponse.json(
        { error: 'UID and email are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('nexthire');
    const usersCollection = db.collection('users');

    // Check if user exists
    const existingUser = await usersCollection.findOne({ uid });

    if (existingUser) {
      // User already exists, return it
      return NextResponse.json(
        { message: 'User already exists', user: existingUser },
        { status: 200 }
      );
    }

    // Create new user
    const newUser = {
      uid,
      email,
      name: name || email.split('@')[0],
      provider: provider || 'email',
      photoURL: photoURL || null,
      role: 'user',
      
      // Personal Information
      age: null,
      phone: null,
      address: null,
      city: null,
      country: null,
      bio: null,
      
      // Professional Information
      skills: [],
      experience: null,
      education: null,
      
      // Social Links
      linkedIn: null,
      github: null,
      portfolio: null,
      
      // Account Status
      isActive: true,
      isVerified: false,
      
      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: { ...newUser, _id: result.insertedId } 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}

// GET USER by UID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json(
        { error: 'UID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('nexthire');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ uid });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user', details: error.message },
      { status: 500 }
    );
  }
}

// UPDATE USER
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, ...updateData } = body;

    if (!uid) {
      return NextResponse.json(
        { error: 'UID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('nexthire');
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { uid },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = await usersCollection.findOne({ uid });

    return NextResponse.json(
      { message: 'User updated successfully', user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user', details: error.message },
      { status: 500 }
    );
  }
}
```

**API Endpoints:**
- `POST /api/users` - Create or check user
- `GET /api/users?uid=xxx` - Get user by UID
- `PUT /api/users` - Update user data

---

### Step 3: Frontend Integration (Sign Up)

**File:** `app/(main)/sign-up/page.tsx`

```typescript
const saveUserToDatabase = async (user: any, provider: string, userName?: string) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: userName || user.displayName || user.email?.split('@')[0],
        provider: provider,
        photoURL: user.photoURL,
      }),
    });

    const data = await response.json();
    console.log('User saved to MongoDB:', data);
    return data;
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
  }
};

const handleSignUp = async () => {
  // Firebase authentication
  const res = await createUserWithEmailAndPassword(email, password);
  
  if (res?.user) {
    // Save to MongoDB
    await saveUserToDatabase(res.user, 'email', name);
    
    alert("Account created successfully!");
    router.push("/sign-in");
  }
};
```

**Flow:**
1. User fills signup form
2. Firebase creates auth account
3. Get Firebase user object (uid, email, etc.)
4. Call `/api/users` to save in MongoDB
5. Redirect to sign-in page

---

### Step 4: Frontend Integration (Sign In)

**File:** `app/(main)/sign-in/page.tsx`

```typescript
const handleSignIn = async () => {
  const res = await signInWithEmailAndPassword(email, password);
  
  if (res?.user) {
    // Check/save user in MongoDB
    await saveUserToDatabase(res.user, 'email');
    router.push("/dashboard");
  }
};

const handleGoogleSignIn = async () => {
  const res = await signInWithGoogle();
  
  if (res?.user) {
    // Automatically check/save user
    await saveUserToDatabase(res.user, 'google');
    router.push("/dashboard");
  }
};
```

**Flow:**
1. User signs in with Firebase
2. Get Firebase user object
3. Call `/api/users` to check/save in MongoDB
4. If user exists: Skip creation
5. If new user: Create in MongoDB
6. Redirect to dashboard

---

## Troubleshooting Checklist

### ✅ Pre-Flight Checklist

Before starting, verify:

- [ ] Node.js 18+ installed
- [ ] MongoDB Atlas account created
- [ ] Firebase project created
- [ ] `.env.local` file exists in project root
- [ ] All dependencies installed (`npm install`)

---

### 🔍 MongoDB Connection Checklist

#### 1. Environment Variables

- [ ] `.env.local` file exists in project root
- [ ] `MONGODB_URI` variable is present
- [ ] No line breaks in `MONGODB_URI` value
- [ ] No extra spaces before/after the URI
- [ ] Password is URL-encoded if it contains special characters

**Check command:**
```bash
cat .env.local | grep MONGODB_URI
```

**Expected output (single line):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexthire?retryWrites=true&w=majority
```

---

#### 2. MongoDB Atlas Configuration

- [ ] Cluster is created and running (green "Active" status)
- [ ] Database user is created with correct username/password
- [ ] Database user has "Atlas Admin" or "Read and write to any database" role
- [ ] Network Access allows your IP (or 0.0.0.0/0 for development)
- [ ] Cluster URL is correct (not using placeholder like `cluster0.mongodb.net`)

**How to verify:**
1. Go to https://cloud.mongodb.com/
2. Check cluster status (should be green)
3. Security → Database Access → Verify user exists
4. Security → Network Access → Verify IP is whitelisted

---

#### 3. Connection String Format

- [ ] Starts with `mongodb+srv://`
- [ ] Contains username and password
- [ ] Has cluster URL with unique identifier (e.g., `cluster0.abc123.mongodb.net`)
- [ ] Includes database name before `?` (e.g., `/nexthire?`)
- [ ] Has query parameters (`retryWrites=true&w=majority`)

**Correct format:**
```
mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER-URL]/[DATABASE]?retryWrites=true&w=majority
```

**Example:**
```
mongodb+srv://nexthire_db_admin:myPassword123@nexthire-cluster.6bacgya.mongodb.net/nexthire?retryWrites=true&w=majority
```

---

#### 4. Development Server

- [ ] Development server is running (`npm run dev`)
- [ ] Server restarted after changing `.env.local`
- [ ] No errors in terminal
- [ ] Port 3000 is not blocked by firewall

**Restart command:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

#### 5. API Route

- [ ] File exists: `app/api/users/route.ts`
- [ ] File exports `POST`, `GET`, `PUT` functions
- [ ] No syntax errors in the file
- [ ] Imports `clientPromise` from `lib/mongodb.ts`

**Test API:**
```bash
curl http://localhost:3000/api/users?uid=test
```

---

#### 6. MongoDB Connection File

- [ ] File exists: `lib/mongodb.ts`
- [ ] Imports `MongoClient` from `mongodb`
- [ ] Checks for `process.env.MONGODB_URI`
- [ ] Exports `clientPromise`

**Test connection:**
```bash
node debug-mongodb.js
```

---

### 🐛 Common Errors & Solutions

#### Error 1: `querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net`

**Cause:** Incorrect cluster URL in connection string

**Solutions:**
1. ✅ Get correct cluster URL from MongoDB Atlas
2. ✅ Replace placeholder `cluster0.mongodb.net` with actual URL
3. ✅ Ensure cluster identifier is included (e.g., `cluster0.abc123.mongodb.net`)
4. ✅ Restart development server

**How to fix:**
```bash
# 1. Go to MongoDB Atlas
# 2. Database → Connect → Connect your application
# 3. Copy connection string
# 4. Update .env.local
# 5. Restart server
```

---

#### Error 2: `MongoServerError: bad auth: Authentication failed`

**Cause:** Incorrect username or password

**Solutions:**
1. ✅ Verify username in MongoDB Atlas (Database Access)
2. ✅ Reset password if needed
3. ✅ Update `.env.local` with correct credentials
4. ✅ URL-encode password if it has special characters
5. ✅ Restart development server

**Password encoding:**
```
@ → %40
: → %3A
/ → %2F
? → %3F
# → %23
```

---

#### Error 3: `MongoServerError: IP address not whitelisted`

**Cause:** Your IP address is not allowed to connect

**Solutions:**
1. ✅ Go to MongoDB Atlas → Network Access
2. ✅ Click "Add IP Address"
3. ✅ Select "Allow Access from Anywhere" (0.0.0.0/0)
4. ✅ Or add your specific IP address
5. ✅ Wait 1-2 minutes for changes to apply

---

#### Error 4: `Please add your MongoDB URI to .env.local`

**Cause:** `MONGODB_URI` not found in environment variables

**Solutions:**
1. ✅ Check `.env.local` file exists in project root
2. ✅ Verify `MONGODB_URI` variable is present
3. ✅ Check for typos in variable name
4. ✅ Restart development server

---

#### Error 5: User created but not visible in MongoDB Atlas

**Cause:** Looking at wrong database or collection

**Solutions:**
1. ✅ Refresh MongoDB Atlas dashboard
2. ✅ Check correct database: `nexthire`
3. ✅ Check correct collection: `users`
4. ✅ Wait a few seconds and refresh
5. ✅ Verify API call was successful (check browser console)

**How to check:**
```
MongoDB Atlas → Database → Browse Collections → nexthire → users
```

---

#### Error 6: `Failed to create user` with no details

**Cause:** Generic error, need more information

**Solutions:**
1. ✅ Check browser console (F12) for detailed error
2. ✅ Check terminal where `npm run dev` is running
3. ✅ Run debug script: `node debug-mongodb.js`
4. ✅ Check MongoDB Atlas logs

---

### 🧪 Testing Guide

#### Test 1: Connection Test

```bash
node debug-mongodb.js
```

**Expected output:**
```
✅ Successfully connected to MongoDB!
✅ Database "nexthire" accessible
🎉 Your MongoDB connection is working!
```

---

#### Test 2: API Test (POST)

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test_123",
    "email": "test@example.com",
    "name": "Test User",
    "provider": "email"
  }'
```

**Expected output:**
```json
{
  "message": "User created successfully",
  "user": {
    "uid": "test_123",
    "email": "test@example.com",
    "name": "Test User",
    ...
  }
}
```

---

#### Test 3: API Test (GET)

```bash
curl http://localhost:3000/api/users?uid=test_123
```

**Expected output:**
```json
{
  "user": {
    "uid": "test_123",
    "email": "test@example.com",
    ...
  }
}
```

---

#### Test 4: Frontend Test

1. Open http://localhost:3000/sign-up
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123
3. Click "Sign Up"
4. Check browser console (F12)
5. Should see: `User saved to MongoDB: {...}`
6. Check MongoDB Atlas → nexthire → users

---

#### Test 5: Social Login Test

1. Open http://localhost:3000/sign-in
2. Click "Google" button
3. Complete Google OAuth
4. Check browser console
5. Check MongoDB Atlas for new user

---

### 📊 Verification Checklist

After implementation, verify:

- [ ] `node debug-mongodb.js` shows success
- [ ] API POST creates user in MongoDB
- [ ] API GET retrieves user from MongoDB
- [ ] Email/Password signup saves user
- [ ] Email/Password login works
- [ ] Google login saves user
- [ ] GitHub login saves user
- [ ] Duplicate users are prevented
- [ ] User data visible in MongoDB Atlas
- [ ] No errors in browser console
- [ ] No errors in terminal

---

### 🔧 Debug Commands

```bash
# Test MongoDB connection
node debug-mongodb.js

# Check environment variables
cat .env.local | grep MONGODB_URI

# Test API endpoint
curl http://localhost:3000/api/users?uid=test

# Check if server is running
curl http://localhost:3000

# View server logs
# (Check terminal where npm run dev is running)
```

---

### 📞 Getting Help

If you're still stuck:

1. **Check Documentation:**
   - `docs/COMPLETE_SETUP_GUIDE.md`
   - `docs/MONGODB_INTEGRATION_BANGLA.md`
   - `docs/ENV_SETUP_GUIDE.md`

2. **Run Debug Script:**
   ```bash
   node debug-mongodb.js
   ```

3. **Check Logs:**
   - Browser console (F12)
   - Terminal (where npm run dev runs)
   - MongoDB Atlas logs

4. **Common Issues:**
   - Restart development server
   - Check `.env.local` for typos
   - Verify MongoDB Atlas configuration
   - Check network/firewall settings

---

## 🎯 Quick Reference

### File Structure
```
project/
├── .env.local                    # Environment variables
├── lib/
│   └── mongodb.ts                # MongoDB connection
├── app/
│   ├── api/
│   │   └── users/
│   │       └── route.ts          # User API endpoints
│   └── (main)/
│       ├── sign-up/
│       │   └── page.tsx          # Sign up page
│       └── sign-in/
│           └── page.tsx          # Sign in page
└── docs/
    └── MONGODB_TROUBLESHOOTING_AND_IMPLEMENTATION.md  # This file
```

### Key Files

| File | Purpose |
|------|---------|
| `lib/mongodb.ts` | MongoDB connection with pooling |
| `app/api/users/route.ts` | CRUD API for users |
| `app/(main)/sign-up/page.tsx` | User registration |
| `app/(main)/sign-in/page.tsx` | User login |
| `.env.local` | Environment variables |

### Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexthire?retryWrites=true&w=majority
```

### API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/users` | Create/check user |
| GET | `/api/users?uid=xxx` | Get user by UID |
| PUT | `/api/users` | Update user |

---

**Created by:** NextHire Development Team  
**Last Updated:** 2024  
**Version:** 1.0.0

---

## ✅ Implementation Complete!

If you followed this guide and all checklists pass, your MongoDB integration is working correctly! 🎉
