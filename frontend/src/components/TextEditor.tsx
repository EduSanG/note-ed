
import { SelectedContext, NotesContext, NoteUpdateContext, EditorContext, EditorDispatchContext } from "../contexts";
import { useContext, useEffect } from "react";
import Icon from "./ui/Icon";

export default function TextEditor() {

    const selected = useContext(SelectedContext)
    const note = useContext(NotesContext).find(n => n.noteId == selected)

    const innerText = useContext(EditorContext)
    const dispatchInnerText = useContext(EditorDispatchContext)
    const setInnerText = (text: string) => dispatchInnerText && dispatchInnerText(text)

    const updateNote = useContext(NoteUpdateContext)
    const saveNote = () => note && updateNote({...note, note: innerText})

    

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 's' && (navigator.userAgent.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            saveNote()
          }
    }

    useEffect(() => {
        setInnerText(note?.note || "")
    }, [selected])

    return <div className="h-full w-full relative">
        <textarea
            className="w-full h-full p-3 text-xl bg-yellow-50 focus:bg-yellow-200 hover:bg-yellow-100 active:bg-yellow-300 [resize:none] outline-none transition ease-out"
            value={innerText}
            disabled={note == undefined}
            placeholder="Select a note to edit or add a new one."
            onChange={e => setInnerText(e.target.value)}
            onBlur={saveNote}
            onKeyDown={handleKeyDown}
        />
        <button title="Save Changes" onClick={saveNote} className="save-button absolute bottom-10 right-6 bg-yellow-600 text-slate-50 p-2 rounded-lg mr-4 shadow-2xl hover:scale-125 transition ease-in-out active:bg-yellow-800"><Icon name="save" /></button>
    </div>
}