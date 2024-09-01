import { useContext, useState } from "react"
import { 
    ArchivedContext, 
    ArchivedDispatchContext, 
    EditorContext, 
    NotesContext, 
    SelectedContext, 
    TagsContext, 
    searchContext, 
    searchDispatchContext 
} from "../contexts"
import Icon from "./ui/Icon"


export default function MenuBar () {

    const archived = useContext(ArchivedContext)
    const dispatchArchived = useContext(ArchivedDispatchContext)

    const editorText = useContext(EditorContext)
    const notes = useContext(NotesContext)
    const activeId = useContext(SelectedContext)
    const activeNote = notes.find(n => n.noteId == activeId)

    const upToDate = activeNote == undefined || activeNote.note == editorText

    const searchText = useContext(searchContext)
    const setSearchText = useContext(searchDispatchContext)

    const [showOptions, setShowOptions] = useState(false)
    const tagList = useContext(TagsContext)

    const handleSelection = (selection: string) => {
        setSearchText && setSearchText(selection)
    }
    

    return <div className="bg-slate-50 p-2 flex flex-row gap-1 justify-between">
        <div className="flex flex-row gap-1">
            <RadioButton label="Active" checked={!archived} onClick={() => dispatchArchived && dispatchArchived(false)}/>
            <RadioButton label="Archived" checked={archived} onClick={() => dispatchArchived && dispatchArchived(true)} />
        </div>
        <div className="flex-1">
            <div className="py-1 px-2 flex justify-end overflow-visible relative">
                <input 
                    placeholder="Search by tag"
                    className="bg-slate-300 outline-none border-4 border-slate-300 w-72"
                    type="search"
                    onFocus={() => setShowOptions(true)}
                    onBlur={() => setShowOptions(false)}
                    value={searchText}
                    onChange={(e) => setSearchText && setSearchText(e.target.value)}
                />
                <button
                    className="flex justify-center items-center p-1 bg-slate-300 "
                    disabled={true}
                >
                    <Icon name="search" />
                </button>
                {showOptions && <div className="absolute w-80 right-2 top-10 z-20">
                    {searchText && tagList.filter(t => t.includes(searchText)).map((tag, i) => {
                        return <div 
                            className="bg-slate-100 hover:text-white hover:bg-blue-500 active:bg-blue-600 p-2" 
                            key={`tag-search-${i}`}
                            onMouseDown={() => handleSelection(tag)}
                        >{tag}</div>
                    })}
                </div>}
            </div>
        </div>
        <div className="flex items-center pr-2">
            <p className={upToDate? 'text-blue-500' : 'text-red-500'}>{upToDate? 'All changes saved': 'Unsaved changes'}</p>
        </div>
    </div>
}

const RadioButton = ({label, checked, onClick} : {label: string, checked: boolean, onClick: () => void}) => {
    return <label className="radioLabel">{label}
        <input type="radio" name="radio" checked={checked} onChange={onClick}/>
    </label>
}