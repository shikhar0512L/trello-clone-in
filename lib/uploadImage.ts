import {ID,storage} from '@/appwrite';

const uploadImage = async(file:File) => {
    if(!file)return;

    const fileUploaded=await storage.createFile('6478391f8862e4bef77b',ID.unique(),file)
    return fileUploaded;
};

export default uploadImage;