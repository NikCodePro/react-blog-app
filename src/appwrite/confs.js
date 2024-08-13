import conf from "../configs/config";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client()
    databases
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
        this.databases = new Databases(this.client)
    }

    async createPost({ title, content, slug, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // file upload services

    async uploadFile(file) {
        try {
            return this.bucket.createFile(conf.appwriteBucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return this.bucket.deleteFile(conf.appwriteBucketID,
                fileID
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFilePreview(appwriteBucketID,
            fileID,
        )
    }

}


const service = new Service()

export default service