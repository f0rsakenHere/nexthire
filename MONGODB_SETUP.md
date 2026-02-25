# MongoDB Integration Setup

## Overview
This project uses MongoDB to store user authentication data from Firebase Auth.

## Database Structure

### Database Name: `nexthire`

### Collection: `users`

#### User Schema:
```javascript
{
  uid: String,           // Firebase UID (unique)
  email: String,         // User email
  name: String,          // User full name
  provider: String,      // Auth provider: 'email', 'google', 'github'
  photoURL: String,      // Profile photo URL (optional)
  role: String,          // User role (default: 'user')
  createdAt: Date,       // Account creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

## How It Works

### Sign Up Flow:
1. User signs up via Firebase (email/password, Google, or GitHub)
2. After successful Firebase authentication, user data is sent to `/api/users` POST endpoint
3. API checks if user already exists in MongoDB (by `uid`)
4. If new user, creates a document in the `users` collection
5. If existing user, returns existing user data

### Sign In Flow:
1. User signs in via Firebase
2. After successful authentication, user data is checked/saved in MongoDB
3. For social logins (Google/GitHub), the system automatically:
   - Checks if user exists in database
   - If not, creates a new user record
   - If yes, skips creation and continues

## API Endpoints

### POST /api/users
Create or check existing user
```json
{
  "uid": "firebase_user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "provider": "google",
  "photoURL": "https://..."
}
```

### GET /api/users?uid=firebase_user_id
Fetch user by Firebase UID

## Environment Variables

Required in `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/nexthire?retryWrites=true&w=majority
```

## Files Modified

1. `.env.local` - Added MONGODB_URI
2. `.env.example` - Added MONGODB_URI template
3. `lib/mongodb.ts` - MongoDB connection utility
4. `app/api/users/route.ts` - User API endpoints
5. `app/(main)/sign-up/page.tsx` - Added MongoDB integration
6. `app/(main)/sign-in/page.tsx` - Added MongoDB integration with social auth

## Testing

1. Sign up with email/password - User should be saved to MongoDB
2. Sign in with Google - User should be checked/saved to MongoDB
3. Sign in with GitHub - User should be checked/saved to MongoDB
4. Check MongoDB Atlas dashboard to verify user documents

## Notes

- MongoDB connection uses connection pooling for performance
- Duplicate users are prevented by checking `uid` before insertion
- Social login automatically handles user creation on first login
- All timestamps are stored in UTC
