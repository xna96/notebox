import { NoteRepository } from "../repositories/NoteRepository";
import { createNote, Note } from "../models/Note";

export class NoteService {
  private repository: NoteRepository;

  constructor() {
    this.repository = new NoteRepository();
  }

//   List all notes
    async listNotes(): Promise<Note[]> {
    return await this.repository.getAll();
  }

//   New Note 
 async createNote(data: any): Promise<Note> {
    const note = createNote(data); // validation + domain rules
    await this.repository.add(note);
    return note;
  }

//   get note by id
   async getNoteById(id: string): Promise<Note | null> {
    return await this.repository.findById(id);
  }

// delete note by id
  async deleteNoteById(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
