import mongoose from "mongoose";
import getConfig from "../../getConfig";
import DataBaseClientInterface, { DBSetOptions, DBUpdateOptions } from "../../types/database/DataBaseClient";
import ModelNames from "../../types/database/ModelNames";
import DataBaseEntrySchema from "../../types/database/DataBaseEntrySchema";

export default class DataBaseClient implements DataBaseClientInterface {
  async get(modelName: ModelNames, entryId: string): Promise<any> {
    const dbConnection = await connectToDB();

    if (!dbConnection) {
      return;
    }

    try {
      const EntryModel = dbConnection.model(modelName.toString(), DataBaseEntrySchema);
      const databaseEntry = await EntryModel.findOne({ id: entryId }).exec();

      if (!databaseEntry) {
        console.log("Could not find entry with the ID: " + entryId);
        return;
      }

      return JSON.parse(databaseEntry.data);
    } catch (e) {
      console.log("Error finding data with ID: " + entryId);
    } finally {
      dbConnection.close();
    }
  }

  async set(modelName: ModelNames, entryId: string, { data, ttl }: DBSetOptions): Promise<boolean> {
    const dbConnection = await connectToDB();

    if (!dbConnection) {
      return false;
    }

    try {
      if (typeof data === "undefined" || data === null) {
        console.log("Data is empty");
        return false;
      }

      if (!(await dbConnection.model(modelName.toString(), DataBaseEntrySchema).findOne({ id: entryId }).exec())) {
        console.log("Entry already exists");
        return false;
      }

      const dataJSONString = JSON.stringify(data);

      const schema = ttl
        ? DataBaseEntrySchema.add({ createdAt: { type: Date, default: Date.now(), index: { expires: ttl } } })
        : DataBaseEntrySchema;

      const EntryModel = dbConnection.model(modelName.toString(), schema);
      const entry = new EntryModel({
        id: entryId,
        data: dataJSONString
      });

      await entry.save();

      return true;
    } catch (e) {
      console.log("Error saving data \n" + e);
      return false;
    } finally {
      dbConnection.close();
    }
  }

  async update(modelName: ModelNames, entryId: string, { data, upsert }: DBUpdateOptions): Promise<boolean> {
    const dbConnection = await connectToDB();

    if (!dbConnection) {
      return false;
    }

    try {
      if (typeof data === "undefined" || data === null) {
        console.log("Data is empty");
        return false;
      }

      const dataJSONString = JSON.stringify(data);

      const EntryModel = dbConnection.model(modelName.toString(), DataBaseEntrySchema);
      const { acknowledged } = await EntryModel.replaceOne(
        { id: entryId },
        {
          id: entryId,
          data: dataJSONString
        },
        { upsert: upsert ?? false }
      );

      return acknowledged;
    } catch (e) {
      console.log("Error updating data \n" + e);
      return false;
    } finally {
      dbConnection.close();
    }
  }

  async delete(modelName: ModelNames, entryId: string): Promise<boolean> {
    const dbConnection = await connectToDB();

    if (!dbConnection) {
      return false;
    }

    try {
      const EntryModel = dbConnection.model(modelName.toString(), DataBaseEntrySchema);

      // Return if deleted count equals 0 (AKA failed to find entry to delete)
      if (!(await EntryModel.deleteOne({ id: entryId })).deletedCount) {
        return false;
      }

      return true;
    } catch (e) {
      console.log("Error trying to delete entry with ID: " + entryId);
      return false;
    } finally {
      dbConnection.close();
    }
  }
}

async function connectToDB(): Promise<mongoose.Connection | undefined> {
  const config = getConfig().databaseConfig;
  const username = encodeURIComponent(config.username);
  const password = encodeURIComponent(config.password);

  const dbURL = `mongodb+srv://${username}:${password}@fantasy-db.3vq9e.mongodb.net/?retryWrites=true&w=majority&appName=fantasy-db`;

  try {
    return mongoose.createConnection(dbURL).asPromise();
  } catch (e) {
    console.log("Failed to connect to database \n" + e);
    return;
  }
}
