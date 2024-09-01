import { Note as NoteType } from "../../schema"
import Icon from "./Icon"
import { NoteDeleteContext, NoteUpdateContext, SelectedDispatchContext } from "../../contexts"
import { useContext } from "react"
import { TagsModalContext } from "../TagEditorProvider"

export default function Note ({
    note
}: {
    note: NoteType
}) {

    const dispatchSelected = useContext(SelectedDispatchContext)
    const deleteNote = useContext(NoteDeleteContext)
    const updateNote = useContext(NoteUpdateContext)

    const openTagBox = useContext(TagsModalContext)

    const toogleArchived = (arch: boolean) => {
        updateNote({...note, archived: !arch})
    }

    return <div 
    onClick={() => dispatchSelected && dispatchSelected(note.noteId)} 
    className="bg-yellow-200 overflow-hidden flex flex-col w-48 h-48 relative hover:bg-yellow-300 active:bg-yellow-400 transition ease-out duration-100 has-[button:active]:bg-yellow-300">
        <div className="flex flex-row gap-1 justify-end p-1 pb-0">
            
            <button
            className="bg-transparent text-slate-400 rounded-full hover:bg-blue-500 hover:text-slate-50 active:bg-blue-700 p-1 flex items-center transition-all ease-out duration-300"
            title={note.archived? 'Unarchive':'Archive'}
            onClick={() => toogleArchived(note.archived)}>
                <Icon name={note.archived? 'Unarchive':'Archive'}/>
            </button>
            
            <button
            className="bg-transparent text-slate-400 rounded-full hover:bg-red-600 hover:text-slate-50 active:bg-red-800 p-1 flex items-center transition-all ease-out duration-300"
            title="Delete note"
            onClick={() => deleteNote(note)}>
                <Icon name="delete"/>
            </button>
            
        </div>
        <div className="px-2 flex-1">
            <p className="line-clamp-5">{note.note}</p>
        </div>
        <div className="h-8 bg-black opacity-60 flex items-center">
            <div className="flex-1"></div>
            <div className="p-1">
                <button 
                title="Edit Tags" 
                className="flex items-center text-white hover:bg-yellow-600 active:bg-yellow-700 rounded-sm transition ease-in-out"
                onClick={() => openTagBox()}>
                    <Icon name="sell" />
                </button>    
            </div>
        </div>
    </div>
}