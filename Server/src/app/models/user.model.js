const mongoose = require("mongoose");
// const slug = require("mongoose-slug-generator");

const COLLECTION_NAME = "users";
const DOCUMENT_NAME = "User";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    // id: { type: Number, autoIncrement: true, primaryKey: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role_admin: {type: Number, default:1, enum : [1,2,3]},
    role_subscription: {type: Number,  default:1, enum : [1,2]}, // default 1 xem phim mien phi
    avatar: {type: String, default: "./image/zyro-image (3).png"}
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, UserSchema);
