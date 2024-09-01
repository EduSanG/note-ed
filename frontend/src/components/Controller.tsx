import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import { 
    NotesContext, 
    SelectedContext, 
    SelectedDispatchContext, 
    NoteCreateContext, 
    NoteDeleteContext, 
    NoteLoadContext, 
    NoteUpdateContext, 
    ArchivedContext, 
    ArchivedDispatchContext, 
    EditorContext, 
    EditorDispatchContext,
    TagsContext,
    TagsDispatchContext,
    TagsLoadContext,
    searchContext,
    searchDispatchContext
} from "../contexts";
import TagEditorProvider from "./TagEditorProvider";
import { notesReducer, selectedReducer, archivedReducer, editorReducer, tagListReducer, searchTextReducer } from "../reducers";
import { Note } from "../schema";
import { requestInsert, requestNotes, requestDelete, requestUpdate, requestTags } from "../network";

export const AppContext = createContext(null);

export default function Controller ({children} : PropsWithChildren) {

    const [notes, dispatchNotes] = useReducer(notesReducer, [] as Note[])
    const [selected, dispatchSelected] = useReducer(selectedReducer, -1)
    const [showArchived, dispatchArchived] = useReducer(archivedReducer, false)
    const [editorText, dispatchEditorText] = useReducer(editorReducer, '')
    const [tagList, dispatchTagList] = useReducer(tagListReducer, [] as string[])
    const [searchText, dispatchSearchText] = useReducer(searchTextReducer, '')

    const loadNotes = () => {
        requestNotes()
        .then(res => dispatchNotes({type: 'reload', notes: res}))
    }

    const addNote = () => {
        requestInsert()
        .then(res => dispatchNotes({type: 'added', notes: [res]}))
    }

    const updateNote = (note: Note) => {
        requestUpdate(note)
        .then(() => dispatchNotes({type: 'updated', notes: [note]}))
    }

    const deleteNote = (note: Note) => {
        requestDelete(note)
        .then(() => dispatchNotes({type: 'delete', notes: [note]}))
    }

    const loadTags = () => {
        requestTags()
        .then(res => dispatchTagList(res))
    }



    //Initial Data loading
    useEffect(() => {loadNotes(); loadTags()}, [])

    return (
        <NotesContext.Provider value={notes}>
            <SelectedContext.Provider value={selected}>
                <SelectedDispatchContext.Provider value={dispatchSelected}>
                    <NoteCreateContext.Provider value={addNote}>
                        <NoteDeleteContext.Provider value={deleteNote}>
                            <NoteUpdateContext.Provider value={updateNote}>
                                <NoteLoadContext.Provider value={loadNotes}>
                                    <ArchivedContext.Provider value={showArchived}>
                                        <ArchivedDispatchContext.Provider value={dispatchArchived}>
                                            <EditorContext.Provider value={editorText}>
                                                <EditorDispatchContext.Provider value={dispatchEditorText}>
                                                    <TagsContext.Provider value={tagList}>
                                                        <TagsDispatchContext.Provider value={dispatchTagList}>
                                                            <searchContext.Provider value={searchText} >
                                                                <searchDispatchContext.Provider value={dispatchSearchText}>
                                                                    <TagsLoadContext.Provider value={loadTags}>
                                                                    <TagEditorProvider>
                                                                        {children}
                                                                    </TagEditorProvider>
                                                                    </TagsLoadContext.Provider>
                                                                </searchDispatchContext.Provider>
                                                            </searchContext.Provider>
                                                        </TagsDispatchContext.Provider>
                                                    </TagsContext.Provider>
                                                </EditorDispatchContext.Provider>
                                            </EditorContext.Provider>
                                        </ArchivedDispatchContext.Provider>
                                    </ArchivedContext.Provider>
                                </NoteLoadContext.Provider>
                            </NoteUpdateContext.Provider>
                        </NoteDeleteContext.Provider>
                    </NoteCreateContext.Provider>
                </SelectedDispatchContext.Provider>
            </SelectedContext.Provider>
        </NotesContext.Provider>
    )
}