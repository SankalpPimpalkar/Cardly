import { Client, Account, ID, Databases, Storage, Query } from 'appwrite'
import { APPWRITE_CONFIG } from '../config';

class APPWRITE {
    client = new Client()
    account;
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(APPWRITE_CONFIG.endpoint)
            .setProject(APPWRITE_CONFIG.projectId);

        this.account = new Account(this.client);
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async CREATE_ACCOUNT({ name, username, email, password }) {
        try {
            const account = await this.account.create(ID.unique(), email, password, name);

            if (!account) {
                throw new Error("Failed to create user")
            }

            const existingUser = await this.database.listDocuments(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.usersCollectionId,
                [
                    Query.equal('email', email)
                ]
            )

            if (existingUser.total > 0) {
                throw new Error("User already exists with this email")
            }

            const user = await this.database.createDocument(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.usersCollectionId,
                account.$id,
                {
                    name,
                    email,
                    username: username.toLocaleLowerCase()
                }
            )

            if (!user) {
                throw new Error("Failed to create user")
            }

            return await this.LOGIN_ACCOUNT({ email, password })

        } catch (error) {
            console.log("CREATE ACCOUNT ERROR", error)
            throw error;
        }
    }

    async LOGIN_ACCOUNT({ email, password }) {
        try {
            const session = await this.account
                .createEmailPasswordSession(email, password);

            return {
                success: true,
                data: session
            }

        } catch (error) {
            console.log("LOGIN ACCOUNT ERROR", error)
            throw error;
        }
    }

    async GET_CURRENT_USER() {
        try {
            const session = await this.account.get()

            if (!session) {
                throw new Error("Session not found")
            }

            const user = await this.database.getDocument(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.usersCollectionId,
                session.$id
            )

            const avatar = this.bucket.getFileView(
                APPWRITE_CONFIG.profileBucketId,
                user.avatar_id
            )

            user.avatar_id = avatar

            return {
                success: true,
                data: user
            }

        } catch (error) {
            console.log("GET ACCOUNT ERROR", error)
            throw error;
        }
    }

    async LOGOUT_ACCOUNT() {
        try {
            await this.account.deleteSessions()

            return {
                success: true,
                data: null
            }

        } catch (error) {
            console.log("LOGOUT ACCOUNT ERROR", error)
            throw error;
        }
    }

    async UPDATE_PROFILE({ name, bio, password, oldPassword, avatar = '', links = [] }) {
        try {

            const updatedFields = {}
            if (typeof (avatar) == "string") {
                avatar = null;
            }

            if (password) {
                if (!oldPassword) {
                    throw new Error("Old Password is needed to update password")
                }

                await this.account.updatePassword(password, oldPassword)
            }

            const session = await this.account.get()

            const user = await this.database.getDocument(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.usersCollectionId,
                session.$id
            )

            if (avatar) {
                const file = await this.bucket.createFile(
                    APPWRITE_CONFIG.profileBucketId,
                    ID.unique(),
                    avatar
                )

                
                if (user.avatar_id) {
                    await this.bucket.deleteFile(
                        APPWRITE_CONFIG.profileBucketId,
                        user.avatar_id
                    )
                }

                updatedFields.avatar_id = file.$id
            }


            if (name != user.name) {
                updatedFields.name = name
            }

            if (bio != user.bio) {
                updatedFields.bio = bio
            }

            if (links != user.links) {
                updatedFields.links = links
            }

            const updatedProfile = await this.database.updateDocument(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.usersCollectionId,
                session.$id,
                updatedFields
            )

            return {
                success: true,
                data: updatedProfile
            }

        } catch (error) {
            console.log("UPDATE PROFILE ERROR", error)
            throw error;
        }
    }

    async GET_PROFILE({ username }) {
        try {

            const profile = await this.database.listDocuments(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.usersCollectionId,
                [
                    Query.equal('username', username)
                ]
            )

            const user = profile.documents[0]

            const avatar = this.bucket.getFileView(
                APPWRITE_CONFIG.profileBucketId,
                user.avatar_id
            )

            user.avatar_id = avatar

            return {
                success: true,
                data: user || null
            }

        } catch (error) {
            console.log("GET PROFILE ERROR", error)
            throw error;
        }
    }
}

const appwrite = new APPWRITE()
export default appwrite;