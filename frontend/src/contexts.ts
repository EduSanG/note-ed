import { createContext, Dispatch } from "react"
import { Note } from "./schema"

export const NotesContext = createContext<Note[]>([])

export const NoteLoadContext = createContext<() => void>(() => {})
export const NoteUpdateContext = createContext<(note: Note) => void>(() => {})
export const NoteCreateContext = createContext<() => void>(() => {})
export const NoteDeleteContext = createContext<(note: Note) => void>(() => {})

export const SelectedContext = createContext<number>(-1)
export const SelectedDispatchContext = createContext<Dispatch<number> | null>(null)

export const ArchivedContext = createContext<boolean>(false)
export const ArchivedDispatchContext = createContext<Dispatch<boolean> | null>(null)

export const EditorContext = createContext<string>("")
export const EditorDispatchContext = createContext<Dispatch<string> | null>(null)

export const TagsContext = createContext<string[]>([])
export const TagsDispatchContext = createContext<Dispatch<string[]> | null>(null)
export const TagsLoadContext = createContext<() => void>(() => {})

export const searchContext = createContext<string>('')
export const searchDispatchContext = createContext<Dispatch<string> | null>(null)