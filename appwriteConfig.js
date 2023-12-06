import { Client, Account, Databases } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "655e247509095961aeb8";

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client, "655e2ed85bb706d92824");

export default client;
