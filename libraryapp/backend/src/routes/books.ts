import express from "express"

const apiBookRouter = express.Router();

const {
    getBooks,
    getBook,
    editeBook,
    createBook,
    deleteBook
} = require('../regulator/apiBooks');

apiBookRouter.get('/', getBooks);
apiBookRouter.get('/:id', getBook);
apiBookRouter.post('/' ,createBook);
apiBookRouter.put('/:id',editeBook);
apiBookRouter.delete('/:id', deleteBook);

export default apiBookRouter;
