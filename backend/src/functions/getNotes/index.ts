import "../registerAliases";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { NoteService } from "@services/NoteService";

export async function getNotes(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const service = new NoteService();
  const notes = await service.listNotes();
  return {
    status: 200,
    jsonBody: {
                success: true,
                count: notes.length,
                data: notes
            }
  };

}

// app.http("getNotes", {
//   methods: ["GET"],
//   authLevel: "anonymous",
//   handler: getNotes,
// });