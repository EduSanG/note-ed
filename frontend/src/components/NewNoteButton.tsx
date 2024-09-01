import { useContext } from "react";
import { NoteCreateContext } from "../contexts";
import Icon from "./ui/Icon";


export default function NewNoteButton () {
    
    const createNote = useContext(NoteCreateContext)

    return <button title="Create Note" onClick={() => createNote()} className="save-button bg-blue-500 text-slate-50 p-2 rounded-lg mr-4 shadow-2xl hover:scale-125 transition ease-in-out active:bg-blue-800"><Icon name="library_add" /></button>

}