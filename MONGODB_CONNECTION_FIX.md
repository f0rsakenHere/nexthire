# MongoDB Connection Fix - Quick Guide

## 🚨 Error You're Seeing:
```
querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net
```

This means your MongoDB connection string is incorrect or incomplete.

---

## ✅ Solution: Get Your Actual MongoDB Atlas Connection String

### Step 1: Go to MongoDB Atlas
1. Open https://cloud.mongodb.com/
2. Log in with your account

### Step 2: Get Connection String
1. Click on **"Database"** in the left sidebar
2. Find your cluster (probably named "Cluster0")
3. Click the **"Connect"** button
4. Select **"Connect your application"**
5. Choose:
   - **Driver:** Node.js
   - **Version:** 5.5 or later
6. **Copy the connection string** - it will look like:
   ```
   mongodb+srv://nexthire_db_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 3: Modify the Connection String

Your connection string will have a format like this:
```
mongodb+srv://nexthire_db_admin:<password>@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority
```

**Important Changes:**
1. Replace `<password>` with your actual password: `ylyYtC6Mqiur6O5Q`
2. Add `/nexthire` before the `?` to specify database name
3. The `XXXXX` part is your cluster's unique identifier (like `ab1cd2` or `xyz123`)

**Final format should be:**
```
mongodb+srv://nexthire_db_admin:ylyYtC6Mqiur6O5Q@cluster0.XXXXX.mongodb.net/nexthire?retryWrites=true&w=majority
```

### Step 4: Update .env.local

Replace the `MONGODB_URI` line in your `.env.local` file with the corrected connection string.

**Example:**
```env
MONGODB_URI=mongodb+srv://nexthire_db_admin:ylyYtC6Mqiur6O5Q@cluster0.ab1cd2.mongodb.net/nexthire?retryWrites=true&w=majority
```

---

## 🔍 How to Find Your Cluster Identifier

The cluster identifier is the part after `@cluster0.` and before `.mongodb.net`

**Examples:**
- `cluster0.ab1cd2.mongodb.net` → identifier is `ab1cd2`
- `cluster0.xyz123.mongodb.net` → identifier is `xyz123`
- `cluster0.m10aa.mongodb.net` → identifier is `m10aa`

---

## 📝 Complete Example

If your MongoDB Atlas shows:
```
mongodb+srv://nexthire_db_admin:<password>@cluster0.m10aa.mongodb.net/?retryWrites=true&w=majority
```

Your final `.env.local` should have:
```env
MONGODB_URI=mongodb+srv://nexthire_db_admin:ylyYtC6Mqiur6O5Q@cluster0.m10aa.mongodb.net/nexthire?retryWrites=true&w=majority
```

---

## ⚠️ Common Mistakes to Avoid

1. ❌ Don't leave `<password>` - replace it with actual password
2. ❌ Don't use `cluster0.mongodb.net` - you need the full cluster URL
3. ❌ Don't forget to add `/nexthire` before the `?`
4. ❌ Don't add extra spaces or line breaks

---

## 🧪 Test Your Connection

After updating `.env.local`:

1. **Restart your development server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Start again
   npm run dev
   ```

2. **Try signing up again:**
   - Go to http://localhost:3000/sign-up
   - Fill the form
   - Click "Sign Up"

3. **Check for success:**
   - You should see "Account created successfully!"
   - Check MongoDB Atlas → Database → Browse Collections → users
   - You should see your new user document

---

## 🔧 Alternative: Create New Cluster

If you can't find your cluster or connection string:

1. **Create a new cluster:**
   - MongoDB Atlas → Database → Create
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

2. **Create database user:**
   - Security → Database Access → Add New Database User
   - Username: `nexthire_db_admin`
   - Password: `ylyYtC6Mqiur6O5Q` (or generate new one)
   - Role: Atlas Admin
   - Add User

3. **Allow network access:**
   - Security → Network Access → Add IP Address
   - Allow Access from Anywhere (0.0.0.0/0)
   - Confirm

4. **Get connection string:**
   - Follow Step 2 above

---

## 📞 Still Having Issues?

### Check These:

1. **MongoDB Atlas Dashboard:**
   - Is your cluster running? (should show green "Active")
   - Is your database user created?
   - Is IP address whitelisted?

2. **Password Special Characters:**
   If your password has special characters, URL encode them:
   ```
   @ → %40
   : → %3A
   / → %2F
   ? → %3F
   # → %23
   [ → %5B
   ] → %5D
   ```

3. **Network Issues:**
   - Try from different network
   - Check firewall settings
   - Disable VPN temporarily

---

## ✅ Success Indicators

When connection is successful, you'll see:
- ✅ No errors in terminal
- ✅ "User created successfully!" message
- ✅ User document in MongoDB Atlas
- ✅ Console log: "User saved to MongoDB: {message: 'User created successfully', ...}"

---

## 🎯 Quick Checklist

- [ ] Got connection string from MongoDB Atlas
- [ ] Replaced `<password>` with actual password
- [ ] Added `/nexthire` before `?`
- [ ] Copied full cluster URL (with unique identifier)
- [ ] Updated `.env.local` file
- [ ] Restarted development server
- [ ] Tested sign up
- [ ] Verified user in MongoDB Atlas

---

**Need the exact connection string format?**

```env
MONGODB_URI=mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER-URL]/[DATABASE-NAME]?retryWrites=true&w=majority
```

Replace:
- `[USERNAME]` → `nexthire_db_admin`
- `[PASSWORD]` → `ylyYtC6Mqiur6O5Q`
- `[CLUSTER-URL]` → Your cluster URL from Atlas (e.g., `cluster0.ab1cd2.mongodb.net`)
- `[DATABASE-NAME]` → `nexthire`

---

**Once you update the connection string, the error will be fixed! 🎉**
