import conf from "../configs/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
        this.account = new Account(this.client)
    }

    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), name, email, password)
            if (userAccount) {
                // call anothere method
                return this.login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
        return null;
    }

    async logoutAccount() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

}



const authService = new AuthService();



export default authService