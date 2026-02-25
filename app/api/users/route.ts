/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            uid,
            email,
            name,
            provider,
            photoURL,
            age,
            phone,
            address,
            city,
            country,
            bio,
            skills,
            experience,
            education,
            linkedIn,
            github,
            portfolio
        } = body;

        if (!uid || !email) {
            return NextResponse.json(
                { error: 'UID and email are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        // Create Database
        const db = client.db('nexthire');
        const usersCollection = db.collection('users');

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ uid });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists', user: existingUser },
                { status: 200 }
            );
        }

        // Create new user with all fields
        const newUser = {
            uid,
            email,
            name: name || email.split('@')[0],
            provider: provider || 'email',
            photoURL: photoURL || null,
            role: 'user',

            // Personal Information
            age: age || null,
            phone: phone || null,
            address: address || null,
            city: city || null,
            country: country || null,
            bio: bio || null,

            // Professional Information
            skills: skills || [],
            experience: experience || null,
            education: education || null,

            // Social Links
            linkedIn: linkedIn || null,
            github: github || null,
            portfolio: portfolio || null,

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
            { message: 'User created successfully', user: { ...newUser, _id: result.insertedId } },
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

        // Update user with new data
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
