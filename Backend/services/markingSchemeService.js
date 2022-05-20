import markingScheme from "../models/markingScheme.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";
import { errorMessage } from "../utils/errorMessages.js";

const findMarkingSchemes = (req, res) => {
    const filter = {};
    const {id, name, published} = req.query;
        id && (filter._id = id); 
        name && (filter.name = name);
        published && (filter.published = published);

    markingScheme.find(filter, (error, markingSchemes) => {
        error ? 
            res.status(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, markingSchemes));
        })
}

const createMarkingScheme = (req, res) => {
    const newMarkingScheme = markingScheme(req.body);
    newMarkingScheme.save((error) => {
        error ? 
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.CREATED)
                .json(jsonResponse(true, newMarkingScheme));
    });
}

const updateMarkingScheme = (req, res) => {
    const filter = { _id: req.query.id || 'inavlidId' };
    const getUpdatedData = { new: true };

    markingScheme.findOneAndUpdate(filter, req.body, getUpdatedData, (error, updatedMarkingScheme) => {
        !updatedMarkingScheme ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, updatedMarkingScheme, errorMessage.MARKING_SCHEME_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, updatedMarkingScheme));
    });       
}

const deleteMarkingScheme = (req, res) => {
    const filter = { _id: req.query.id || 'inavlidId' };

    markingScheme.findOneAndDelete(filter, (error, deletedMarkingScheme) => {
        !deletedMarkingScheme ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, deletedMarkingScheme, errorMessage.MARKING_SCHEME_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, deletedMarkingScheme));
    });       
}

export { createMarkingScheme, updateMarkingScheme, deleteMarkingScheme, findMarkingSchemes };