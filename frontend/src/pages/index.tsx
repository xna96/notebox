import Header from "@/components/Header";
import NotesGrid from "@/components/NoteGrid";
import { useState } from "react";
import type { Note } from "@/../types";

export default function HomePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleNoteAdded = () => {
  setRefreshTrigger((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNoteAdded={handleNoteAdded}/>

      {/* The rest of your page (notes, scroll area, etc.) */}
      <main className="min-h-screen bg-white">
      
      <NotesGrid refreshTrigger={refreshTrigger}/>
    </main>
    </div>
  );
}