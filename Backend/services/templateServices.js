import template from "../models/template.js"
import { errorMessage } from "../utils/errorMessages.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";

const createTemplate = (req, res) => {
    const newTemplate = template(req.body);
    newTemplate.save((error) => {
        error ? 
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.CREATED)
                .json(jsonResponse(true, newTemplate));
    });
}

const updateTemplate = (req, res) => {
    const filter = { _id: req.query.id || 'inavlidId' };
    const getUpdatedData = { new: true };

    template.findOneAndUpdate(filter, req.body, getUpdatedData, (error, updatedTemplate) => {
        !updatedTemplate ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, updatedTemplate, errorMessage.TEMPLATE_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, updatedTemplate));
    });       
}

const findTemplates = (req, res) => {
    const filter = {};
    const { id, name, folder, published } = req.query;
        id && (filter._id = id); 
        name && (filter.name = name); 
        folder && (filter.folder = folder); 
        published && (filter.published = published); 

        template.find(filter, (error, templates) => {
        error ? 
            res.status(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, templates));
        })
}

const deleteTemplate = (req, res) => {
    const filter = { _id: req.query.id || 'inavlidId' };

    template.findOneAndDelete(filter, (error, deletedTemplate) => {
        !deletedTemplate ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, deletedTemplate, errorMessage.TEMPLATE_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, deletedTemplate));
    });       
}

export {createTemplate, findTemplates, updateTemplate, deleteTemplate};