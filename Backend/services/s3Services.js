import { getFilesMetaData, upload, download, deleteFromS3 } from '../aws-s3/s3.js';
import fs from "fs";
import util from 'util';
import http from '../utils/httpStatusCodes.js';
import { jsonResponse } from '../utils/serviceUtilities.js';
import { errorMessage } from '../utils/errorMessages.js';

const unlinkFile = util.promisify(fs.unlink);

const uploadFile = async (req, res) => {
    const file = req.file;
    const {folder, type} = req.query;
    const folderName = type ? 
        folder+'/'+type : folder;

    try {
        const result = await upload(folderName, file, type);
        unlinkFile(file.path)
        res.status(http.CREATED)
            .json(jsonResponse(true, result));
    } catch (error) {
        res.status(http.SERVER_ERROR)
            .json(jsonResponse(false, error, errorMessage.UPLOAD_FAIL));
    }
}

const getFile = async (req, res) => {
    const { folder ,type , key } = req.params;
    const fileKey = type ? 
        folder+'/'+type+'/'+key : folder+'/'+key;
    try {
        const readStream = await download(fileKey);
        readStream.pipe(res);
    } catch (error) {
        res.status(http.BAD_REQUEST)
            .json(jsonResponse(false, error));
    }
}

const deleteFile = async (req, res) => {
    const { folder ,type , key } = req.params;
    const fileKey = type ? 
        folder+'/'+type+'/'+key : folder+'/'+key;
    try {
        const result = await deleteFromS3(fileKey);
        res.status(http.OK)
            .json(jsonResponse(true, result));
    } catch (error) {
        res.status(http.SERVER_ERROR)
            .json(jsonResponse(false, error));
    }
}

const getFilesList = async (req, res) => {
    const { folder, type } = req.query;
    const folderName = type ? 
        folder+'/'+type : folder;
    try {
        const result = await getFilesMetaData(folderName);
        res.status(http.OK)
            .json(jsonResponse(true, result));
    } catch (error) {
        res.status(http.SERVER_ERROR)
            .json(jsonResponse(false, error, errorMessage.RETRIEVE_FILES_FAIL));
    }
}

export {uploadFile, getFilesList, getFile, deleteFile};