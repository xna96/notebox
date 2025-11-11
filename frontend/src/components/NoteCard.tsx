import { useEffect, useState } from "react";
import { getNotes } from "@/services/NoteService";
import { Note, NoteMessage } from "@/../types/index";

interface NoteCardProps {
    note: Note;
    notemessage: NoteMessage;
}

export default function NoteCard({ note, notemessage }: NoteCardProps) {
  return (
    <div
      className="relative flex flex-col justify-center items-center text-center text-white w-[300px] h-[280px]  p-4 
      shadow-lg rounded-tl-[50px_30px] rounded-tr-[30px_50px] 
                rounded-bl-[30px_50px] rounded-br-[50px_30px] transition-transform duration-300 hover:scale-105"
      style={{
        backgroundColor: notemessage.color || "#B0BEC5",
        
      }}
    >
      <p className="text-base font-light leading-snug px-3">{note.message}</p>

      <div className="absolute bottom-10 right-6 text-right">
        <p className="text-md font-semibold">-{note.name}</p>
        <p className="text-xs opacity-80">
          {note.country}, {note.city}
        </p>
      </div>

      <span className="absolute bottom-2 right-3 text-[10px] rotate-[20deg] opacity-80">
        {new Date(note.timestamp).toLocaleDateString() + " " + new Date(note.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
}