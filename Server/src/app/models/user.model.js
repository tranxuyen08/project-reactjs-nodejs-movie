const mongoose = require("mongoose");
// const slug = require("mongoose-slug-generator");

const COLLECTION_NAME = "users";
const DOCUMENT_NAME = "User";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    // id: { type: Number, autoIncrement: true, primaryKey: true },
    firstName: { type: String, require: true, require: true},
    lastName: { type: String,require: true , require: true},
    email: { type: String, unique: true , require: true},
    password: { type: String,require: true , require: true},
    role_admin: {type: Number, default:1, enum : [1,2]},
    role_subscription: {type: Number,  default:1, enum : [1,2]}, // default 1 xem phim mien phi
    role_active: {type: Number,  default:1, enum : [1,2]},
    avatar: {type: String, default: "./image/zyro-image (3).png"}
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, UserSchema);
