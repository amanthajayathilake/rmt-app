import submissionType from "../models/submissionType.js"
import { errorMessage } from "../utils/errorMessages.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";

const createSubmissionType = (req, res) => {
    const newSubmissionType = submissionType(req.body);
    newSubmissionType.save((error) => {
        error ? 
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.CREATED)
                .json(jsonResponse(true, newSubmissionType));
    });
}

const updateSubmissionType = (req, res) => {
    const filter = { _id: req.query.id || 'inavlidId' };
    const getUpdatedData = { new: true };

    submissionType.findOneAndUpdate(filter, req.body, getUpdatedData, (error, updatedSubmissionType) => {
        !updatedSubmissionType ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, updatedSubmissionType, errorMessage.SUBMISSION_TYPE_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, updatedSubmissionType));
    });       
}

const findSubmissionTypes = (req, res) => {
    const filter = {};
    const { id, name, folder, status, published } = req.query;
        id && (filter._id = id); 
        name && (filter.name = name); 
        status && (filter.status = status); 
        folder && (filter.folder = folder); 
        published && (filter.published = published); 

        submissionType.find(filter, (error, submissionTypes) => {
        error ? 
            res.status(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, submissionTypes));
        })
}

const deleteSubmissionType = (req, res) => {
    const filter = { _id: req.query.id || 'inavlidId' };

    submissionType.findOneAndDelete(filter, (error, deletedSubmissionType) => {
        !deletedSubmissionType ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, deletedSubmissionType, errorMessage.SUBMISSION_TYPE_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, deletedSubmissionType));
    });       
}

export {createSubmissionType, findSubmissionTypes, updateSubmissionType, deleteSubmissionType};