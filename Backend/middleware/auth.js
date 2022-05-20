import jwt from "jsonwebtoken";
import { jsonResponse, decodeJwt } from "../utils/serviceUtilities.js";
import http from "../utils/httpStatusCodes.js";
import { errorMessage } from "../utils/errorMessages.js";

const authorize = (...eligibleRoles) => {
    return (req, res, next) => {
        const { role } = decodeJwt(req.headers.authentication);
        if (!eligibleRoles.includes(role)) return res.status(http.UNAUTHORIZED)
            .json(jsonResponse(false, null, errorMessage.UNAUTHORIZED));
        next();
    }
}

const authenticate = (req, res, next) => {
    const { authentication } = req.headers;
    if(!authentication) return res.status(http.AUTHENTICATION_FAIL)
        .json(jsonResponse(false, null, errorMessage.AUTH_FAIL)) 
              
    jwt.verify(authentication, process.env.AUTH_SECRET, (error, value) => {
        if (error) return res.status(http.AUTHENTICATION_FAIL)
            .json(jsonResponse(false, error, errorMessage.AUTH_FAIL)) 
        next();
    });
}

export {authenticate, authorize};