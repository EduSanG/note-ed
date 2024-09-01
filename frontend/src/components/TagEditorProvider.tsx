import { PropsWithChildren, useContext, useState, createContext, useEffect } from "react";
import { NotesContext, SelectedContext, NoteUpdateContext, TagsLoadContext } from "../contexts";
import Icon from "./ui/Icon";
import { Note, Tag } from "../schema";

export const TagsModalContext = createContext<() => void>(() => {})

export default function TagEditorProvider ({ children } : PropsWithChildren) {

    const [hiddenBox, setHiddenBox] = useState(false)
    const [inputText, setInputText] = useState("")

    const showTags = () => setHiddenBox(true)
    const hideTags = () => {
        setTagList(currentNote?.tags)
        setHiddenBox(false)
    }

    const selectedId = useContext(SelectedContext)
    const currentNote = useContext(NotesContext).find(n => n.noteId === selectedId)

    const updateNote = useContext(NoteUpdateContext)
    const reloadTags = useContext(TagsLoadContext)
    const updateTags = (note: Note) => {
        updateNote(note)
        reloadTags()
        hideTags()
    }

    const [tagList, setTagList] = useState(currentNote?.tags)
    useEffect(() => setTagList(currentNote?.tags), [currentNote])

    const createTag = (tag: Tag) => {
        if(tag.tagValue.length == 0) return
        const tags = tagList || []
        setTagList([...tags, tag])
        setInputText("")
    }

    const deleteTag = (tag: Tag) => {
        const tags = tagList || []
        setTagList(tags.filter(t => t.tagValue != tag.tagValue))
    }

    return <div className="relative">
        <div className={`absolute top-0 right-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center ${hiddenBox? 'z-20' : '-z-10'}`}>
            <div className="bg-slate-50 h-1/3 w-96 z-30 flex flex-col">
                <div className="flex flex-row justify-between pt-1 px-2">
                    <p className="font-bold text-xl">Note Tags</p>
                    <button onClick={() => hideTags()}><Icon name="close" /></button>
                </div>
                <div className="border border-b-0 border-slate-400 my-1 mx-2" />
                <div className="flex-1">
                    <div className="flex flex-row flex-wrap gap-1 px-1">
                        {tagList && tagList.map((tag, i) => {
                            return <div key={`taglist-${i}`} className="flex flex-row align-middle font-bold bg-slate-300 pt-1 px-1 text-xl leading-none border border-slate-400 rounded-md">
                                <p className="select-none">{tag.tagValue}</p><button onClick={() => {deleteTag(tag)}}><Icon name="cancel" /></button>
                            </div>
                        })}
                    </div>
                </div>
                <div className="border border-b-0 border-slate-400 my-1 mx-2" />
                <div className="py-1 px-2 flex gap-1">
                    <input 
                        className="bg-slate-300 outline-none border-2 border-slate-300 flex-1" type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && createTag({tagValue: inputText})}
                    />
                    <button 
                        className="flex justify-center items-center p-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white transition ease-in-out"
                        onClick={() => createTag({tagValue: inputText})}
                    >
                        <Icon name="add" />
                    </button>
                </div>
                <div className="border border-b-0 border-slate-400 my-1 mx-2" />
                <div className="flex justify-end gap-2 p-1">
                    <button 
                        onClick={() => hideTags()} 
                        className="transition ease-in-out p-1 font-bold rounded-lg border border-slate-400 bg-slate-300 hover:bg-slate-400 active:bg-slate-500 active:text-slate-200"
                    >Cancel</button>
                    <button 
                        onClick={() => currentNote && tagList && updateTags({... currentNote, tags: [...tagList]})} 
                        className="transition ease-in-out p-1 font-bold rounded-lg border border-blue-500 text-slate-200 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                    >Save</button>
                </div>
            </div>
        </div>
        <TagsModalContext.Provider value={showTags}>{ children }</TagsModalContext.Provider>
    </div>
}