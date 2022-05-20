import user from "../models/user.js";
import jwt from "jsonwebtoken";
import { jsonResponse } from "../utils/serviceUtilities.js";
import http from "../utils/httpStatusCodes.js";
import { errorMessage } from "../utils/errorMessages.js";

const login = (req, res) => {
    const { email, password } = req.body;
    const filter = { email, password };

    user.find(filter, (error, users) => {
        if (error) {
            return res.status(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message));

        } else if (users.length > 0){
            const { id, role, email } = users[0];
            const authBody = { id, role, email };
            const accessToken = jwt.sign(authBody, process.env.AUTH_SECRET);
            res.status(http.OK).json(jsonResponse(true, {accessToken}));

        } else {
            res.status(http.AUTHENTICATION_FAIL).json(jsonResponse(false, null, errorMessage.AUTH_FAIL ));
        }
    });
}

export { login };