import { CosmosClient } from "@azure/cosmos";

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("COSMOS_DB_CONNECTION_STRING not found in environment variables");
}


export const cosmosClient = new CosmosClient(connectionString);
export const database = cosmosClient.database("NoteBoxDB");
export const container = database.container("Notes");