const mongoose = require("mongoose");
// const slug = require("mongoose-slug-generator");

const COLLECTION_NAME = "favorite";
const DOCUMENT_NAME = "Favorite";
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
  {
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User',require: true },
    idMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductMovie',require: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)
module.exports = mongoose.model(DOCUMENT_NAME, FavoriteSchema);