import Image from "next/image";
import { useEffect, useState} from "react";
import { createNote } from "@/services/NoteService";
import type { Note } from "@/../types";
import Link from "next/link";

interface HeaderProps {
  onNoteAdded: () => void;
}

export default function Header ({ onNoteAdded }: HeaderProps){

  const emotions = [ 
    { name: "Joy", color: "#ffd21f" },
    { name: "Sadness", color: "#3ddbe1" },
    { name: "Anger", color: "#ff3131" },
    { name: "Fear", color: "#5e17eb" },
    { name: "Love", color: "#ff66c4" },
    { name: "Surprise", color: "#8c52ff" },
    { name: "Neutral", color: "#ff751f" },
    { name: "Disgust", color: "#5170ff" },
  ];
  const [hovered, setHovered] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    message: "",
    city: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newNote: Note = {
      id: crypto.randomUUID(),
      name: form.name,
      message: form.message,
      city: form.city,
      country: form.country,
      timestamp: new Date().toISOString(),
    };

    try {
      await createNote(newNote);
      onNoteAdded(); 
      setForm({ name: "", message: "", city: "", country: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Failed to create note:", err);
      alert("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <header className="flex justify-between items-center px-8 py-6 w-full">
      <div className="flex items-center">
        <Link href="/" className="hover:scale-105 transition-transform duration-200">
        <Image
            src="/images/logo.png"
          alt="Global Note Logo"
      
          width={90}
          height={90}
          className="cursor-pointer select-none"
        /></Link>
      </div>

      <div className="flex gap-4 items-center">
        {emotions.map((emotion) => (
          <div
            key={emotion.name}
            onMouseEnter={() => setHovered(emotion.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform duration-300 hover:scale-125 cursor-default"
            style={{ backgroundColor: emotion.color }}
          >
            {hovered === emotion.name && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-md">
                {emotion.name}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className=" hover:bg-blue-900 hover:text-white border-solid border-blue-900 border-2 text-blue-900 font-bold px-6 py-2 rounded-full shadow-sm transition-transform active:scale-95"
      >
        ADD YOUR NOTE
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
              Add Your Note
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex flex-wrap gap-2">
                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="flex-1 min-w-[45%] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-yellow-300 font-bold py-2 rounded-md hover:bg-blue-800 transition"
              >
                {loading ? "Adding..." : "Submit Note"}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}