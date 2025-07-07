import conf from "../configure/config.js";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
    Client = new Client();
    Databases;
    bucket;
    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.Projectid)

        this.Databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)
    }
    async CreatePost({ title, content, slug, featuredImage, Status, userId }) {
        try {
            return await this.Databases.createDocument(
                conf.Databaseid,
                conf.Collectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    Status,
                    userId
                }
            )
        } catch (error) {
            console.log('createpost error : ', error)
        }
    }
    async UpdatePost(slug, { title, content, featuredImage, Status, }) {
        try {
            const update = await this.Databases.updateDocument(
                conf.Databaseid,
                conf.Collectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    Status,
                }
            )
            return update
        } catch (error) {
            console.log( "updatepost error : " ,error)
        }
    }

    async DeletPost(slug) {
        try {
            const delet = await this.Databases.deleteDocument(
                conf.Databaseid,
                conf.Collectionid,
                slug,

            )
            return delet
        } catch (error) {
            console.log(error)
        }
    }
    async Getpost(slug) {
        try {

            const result = await this.Databases.getDocument(
                conf.Databaseid,
                conf.Collectionid,
                slug
            )
            
            return result
        } catch (error) {
            console.log(error)

        }

    }
    
    async getDocments() {
        try {
            const documents =  await this.Databases.listDocuments(
                conf.Databaseid,
                conf.Collectionid,

                [
                    Query.equal('Status', 'Active')
                ]
            )
           
            return documents

        } catch (error) {
            console.error("Error fetching documents:", error)

        }
    }
    async Getallimages() {
        try {
            const query = await this.Databases.listDocuments(
                conf.Databaseid,
                conf.Collectionid,
            );

            const imagelink = query.documents.map((doc) => doc.image)

            return imagelink
        } catch (error) {
            console.log(error)

        }
    }
    // file uploading functions

    async Fileuploading(file) {
        try {
            return  await this.bucket.createFile(
                conf.Bucketid,
                ID.unique(),
                file,
            )

   
        } catch (error) {
            console.log( "fileuploading error" ,error)
            return false
        }
    }
    async Deletfile(fileid) {
        try {
            return await this.bucket.deleteFile(
                conf.Bucketid,
                fileid
            )
            
        } catch (error) {
            console.log(error)

            return false
        }
    }

    Getfilepreview(fileid) {
        return this.bucket.getFileView(
            conf.Bucketid,
            fileid,
        )
    }
}

const service = new Service()

export default service;

