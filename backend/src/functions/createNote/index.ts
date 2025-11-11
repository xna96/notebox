import "../registerAliases";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { NoteService } from "@services/NoteService";

export async function createNote(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const service = new NoteService();
    const data = (request as any).req?.body;
    const note = await service.createNote(data);

    const responseBody = {
            success: true,
            data: note,
  };

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responseBody),
  };
    
}
