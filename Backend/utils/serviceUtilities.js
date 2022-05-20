export const jsonResponse = (isSuccessful, responseData, error) => {
    return {
        isSuccessful: isSuccessful,
        responseData,
        errorMessage: error
    }
}

export const decodeJwt = (token) => {
    const tokenDecodablePart = token.split('.')[1];
    const decoded = Buffer.from(tokenDecodablePart, 'base64').toString();
    return JSON.parse(decoded);
}