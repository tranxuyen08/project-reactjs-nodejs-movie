const mongoose = require("mongoose");

const COLLECTION_NAME = "comments";
const DOCUMENT_NAME = "Comment";

const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductMovie', required: true },
    titleComment: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, CommentsSchema);
