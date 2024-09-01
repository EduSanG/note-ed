import { Note } from "./schema";

export function notesReducer(Notes: Note[], action: {type: string, notes: Note[]}) {
    switch (action.type) {
        case 'added': {
            return [... Notes, ...action.notes]
        }
        case 'updated': {
            return Notes.map(n => n.noteId == action.notes[0].noteId? action.notes[0] : n)
        }
        case 'delete': {
            return Notes.filter(n => n.noteId != action.notes[0].noteId)
        }
        case 'reload': {
            return action.notes
        }
        default: {
            throw Error('Unknown action: ' + action.type)
        }
    }
}

export function selectedReducer(_index: number, action: number) {
    return action
}

export function archivedReducer(_archived: boolean, action: boolean) {
    return action
}

export function editorReducer(_text: string, action: string) {
    return action
}

export function tagListReducer(_list: string[], action: string[]) {
    return action
}

export function searchTextReducer(_text: string, action: string) {
    return action
}