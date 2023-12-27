import {Client,Databases,Account,ID,Storage} from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_CLIENT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export {client,account,databases,storage,ID};