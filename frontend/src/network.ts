import axios from "axios";
import { Note } from "./schema";

const env = process.env.NODE_ENV

const requester = axios.create({
    baseURL: env === 'production'? '' : 'http://localhost:8080',
})

export async function requestNotes() {
    const data = (await requester.get('/notes')).data
    return data as Note[]
}

export async function requestInsert() {
    const response = await requester.post('/notes', {})
    return response.data as Note
}

export async function requestUpdate(note: Note) {
    await requester.put('/notes', note)
}

export async function requestDelete(note: Note) {
    requester.delete('/notes', {data: note})
}

export async function requestTags() {
    const data = (await requester.get('/tags')).data
    return data as string[]
}