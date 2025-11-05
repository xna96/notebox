import { container } from "../utils/DatabaseClient";
import { Note } from "../models/Note";

export class NoteRepository {
  async getAll(): Promise<Note[]> {
    try {
      const { resources } = await container.items
        .query("SELECT * FROM c ORDER BY c.timestamp DESC")
        .fetchAll();

      return resources as Note[];
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw new Error("Failed to fetch notes from database");
    }
  }

    async findById(id: string): Promise<Note | null> {
    try {
      const { resource } = await container.item(id, id).read();
      return resource as Note || null;
    } catch (error) {
      console.error("Error fetching note by ID:", error);
      return null;
    }
  }

  
    async add(note: Note): Promise<void> {
    try {
      await container.items.create(note);
    } catch (error) {
      console.error("Error adding note:", error);
      throw new Error("Failed to add note to database");
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await container.item(id, id).delete();
      return true;
    } catch (error) {
      console.error("Error deleting note:", error);
      return false;
    }
  }

}
  