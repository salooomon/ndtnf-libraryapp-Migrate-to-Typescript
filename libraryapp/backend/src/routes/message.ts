import express from "express";

const apiMessagesRouter = express.Router();

const {
    sendMessage,
    getMessage
} = require('../regulator/messageApi');

apiMessagesRouter.get('/:id', getMessage);
apiMessagesRouter.post('/', sendMessage);

export default apiMessagesRouter;