import { connectToDatabase } from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export const config = {
    api: {
        bodyParser: true,
    },
};

export async function PUT(req: NextRequest) {
    try {
        const { database } = await connectToDatabase();
        const groupsCollection = database.collection('groups');
        const usersCollection = database.collection('users');

        const { groupId, userId } = await req.json();

        // Validate input
        if (!groupId || !userId) {
            return NextResponse.json({ error: "Missing groupId or userId" }, { status: 400 });
        }
        if (!ObjectId.isValid(groupId) || !ObjectId.isValid(userId)) {
            return NextResponse.json({ error: "Invalid groupId or userId" }, { status: 400 });
        }

        // Fetch user data
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        const group = await groupsCollection.findOne({ _id: new ObjectId(groupId) });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if user is already a member (optional)
        // Implement logic to check if user is already a member

        // Update group
        const update = {
            $push: { groups: { groupId: groupId, groupName: group.groupName } } // Push entire user object
        };
        const result = await usersCollection.updateOne({ _id: new ObjectId(userId) }, update);

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: 'Failed to add user to group' }, { status: 500 });
        }

        return NextResponse.json({ message: "User added to group successfully" });
    } catch (e) {
        console.error('Error adding user to group:', e);
        return NextResponse.json({ error: 'Failed to add user to group' }, { status: 500 });
    }
}