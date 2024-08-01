import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    authors: {
        type: String,
        require: true
    },
    fileCover: {
        type: String,
        require: true
    },
    fileName: {
        type: String,
        require: true
    },
    fileBook: {
        type: String,
        require: null
    }
})

const Book = mongoose.model("Book", bookSchema);

export default Book