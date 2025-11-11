export interface Note {
    id: string;
    name: string;
    message: string;
    country: string;
    city: string;
    timestamp: string;
}

export function createNote(data: Partial<Note>): Note {
  const errors: string[] = [];

  // Basic required fields
    if (!data.name || data.name.trim() === "") errors.push("Name is required.");
    if (!data.message || data.message.trim() === "") errors.push("Message cannot be empty.");
    if (!data.country || data.country.trim() === "") errors.push("Country is required.");
    if (!data.city || data.city.trim() === "") errors.push("City is required.");

    if (data.message && data.message.length > 500)
    errors.push("Message must not exceed 500 characters.");
    if (data.name && data.name.length > 50)
    errors.push("Name must not exceed 50 characters.");

     if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    (error as any).validationErrors = errors;
    throw error;
  }

  return {
    id: data.id || crypto.randomUUID(),
    name: data.name!.trim(),
    message: data.message!.trim(),
    country: data.country!.trim(),
    city: data.city!.trim(),
    timestamp: new Date().toISOString(),
  };
}

