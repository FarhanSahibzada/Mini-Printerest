
const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    Projectid : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    Collectionid : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    Databaseid : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    Bucketid : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}  


export default conf;
