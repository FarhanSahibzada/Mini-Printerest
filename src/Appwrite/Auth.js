import conf from "../configure/config.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    Client = new Client();
    account;
    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.Projectid)
        this.account = new Account(this.Client)
    }
    async CreateAccount({ email, password, name }) {
        try {
            const useraccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (useraccount) {
                return this.LoginAccount({ email, password })
            } else {
                return useraccount;
            }
        } catch (error) {
            console.log(error)
        }
    };
    async LoginAccount({ email, password }) {
        try {
            return this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log(error)
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error)

        }
    }
}

const authService = new Authservice()

export default authService;

