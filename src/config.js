
export const APPWRITE_CONFIG = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DB_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLL_ID,
    profileBucketId: import.meta.env.VITE_APPWRITE_PROFILES_BUCKET_ID
};
