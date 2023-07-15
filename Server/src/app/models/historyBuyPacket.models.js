const mongoose = require("mongoose");

const COLLECTION_NAME = "historyBuyPacket";
const DOCUMENT_NAME = "User";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HistoryBuyPacketSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'users' }, // Sử dụng kiểu ObjectId và tham chiếu đến bảng "users"
    subscription: { type: Number },
    paymentDay: { type: Date },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
module.exports = mongoose.model(DOCUMENT_NAME, HistoryBuyPacketSchema);
