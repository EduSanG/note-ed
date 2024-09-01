export interface Note {
    noteId: number;
    note: string;
    archived: boolean;
    tags: Tag[];
}

export interface Tag {
    tagValue: string
}