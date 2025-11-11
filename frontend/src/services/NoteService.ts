import {Note} from '../../types';

export const getNotes = async (): Promise<Note[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch notes: ${res.statusText}`);
  }

  return res.json();
};


export const analyzeNote = async (message: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyzeNote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Failed to analyze note");
  return res.json(); 
};

export const createNote = async (note: Note) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createNote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

