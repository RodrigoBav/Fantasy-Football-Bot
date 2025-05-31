import { Schema } from "mongoose";

const DataBaseEntrySchema = new Schema({
  id: { type: String, required: true },
  data: { type: String, required: true }
});

export default DataBaseEntrySchema;
