const mongoose = require("mongoose");

const COLLECTION_NAME = "productsMovie";
const DOCUMENT_NAME = "ProductMovie";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: { type: String }, //ten phim
    vote_average: { type: Number }, //vote cua phim
    release_date: { type: Date }, //ngay
    overview: { type: String }, //noi dung them
    video: { type: String },  //video
    video_trailler: { type: String },  //video trailler
    typeMovie: { type: [String] },  //the loai phim
    backdrop_path: { type: String }, //arnh nen cua phim
    poster: { type: String }, // poster phim
    role_movie: { type: Number, default: 1, enum: [1, 2] }, //quyen phim duoc xem
    popularity : {type : Number}
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
module.exports = mongoose.model(DOCUMENT_NAME, ProductSchema);
