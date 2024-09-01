import { ArchivedContext, NotesContext, searchContext } from "../contexts"
import { useContext } from "react"
import { Note } from "../schema"
import StickyNote  from "./ui/Note"

export default function NoteList () {

    const notes = useContext(NotesContext)
    const archived = useContext(ArchivedContext)
    const searchText = useContext(searchContext)

    const noteFilter = (n: Note) => {
        const archivedFilter = archived == n.archived
        if (!searchText.length) return archivedFilter
        return archivedFilter && n.tags.find(t => t.tagValue === searchText)
    }

    return <div className="flex flex-wrap justify-start gap-5 max-h-[65vh] overflow-auto">
        {notes.filter(noteFilter).map((note, index) => <StickyNote key={`Note-${index}`} note={note} />)}
    </div>
}