"use client";

import { useEffect, useState, useRef } from "react";
import NoteCard from "@/components/NoteCard";
import { getNotes, analyzeNote } from "@/services/NoteService";
import type { Note, NoteMessage } from "@/../types";

export default function NotesGrid({ refreshTrigger }: { refreshTrigger: boolean }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
   const scrollContainerRef = useRef<HTMLDivElement>(null);
  
   
  useEffect(() => {
    const fetchNotesWithColors = async () => {
      try {
      
        const notesData = await getNotes();

        const sortedNotes = [...notesData].sort(
          (a: Note, b: Note) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        const notesWithColors = await Promise.all(
          sortedNotes.map(async (note: Note) => {
            try {
              const analysis = await analyzeNote(note.message || "");
              return { ...note, color: analysis.color }; 
            } catch (err) {
              console.error(`Failed to analyze note ${note.id}`, err);
              return { ...note, color: "#B0BEC5" }; // fallback color
            }
          })
        );

        setNotes(notesWithColors);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotesWithColors();
  }, [refreshTrigger]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    scrollContainerRef.current?.scrollBy({
      left: e.deltaY,
      behavior: "smooth",
    });
  };

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
        Loading notes...
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
        No notes yet — be the first to add one!
      </div>
    );
  }

  return (
    
    <div
       ref={scrollContainerRef}
      onWheel={handleWheel}
      
      className="
        grid 
        grid-rows-2 
        grid-flow-col
        gap-10 
        overflow-x-auto 

        p-10 
        pt-4 
        snap-x 
        snap-mandatory 
        scrollbar-hide 
        min-h-[80vh]
      "
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          notemessage={{ id: note.id!, color: note.color ?? "#B0BEC5",}}
        />
      ))}
    </div>
  );
}

