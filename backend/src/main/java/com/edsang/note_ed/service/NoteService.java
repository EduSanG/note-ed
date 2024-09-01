package com.edsang.note_ed.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edsang.note_ed.model.Note;
import com.edsang.note_ed.repository.NoteRepository;

@Service
public class NoteService {
    
    @Autowired
    NoteRepository repo;

    public List<Note> getNotes() {
        return repo.findAll();
    }

    public Note getNoteById(int noteId) {
        return repo.findById(noteId).orElse(null);
    }

    public List<Note> getArchivedNotes() {
        return repo.findByArchived(true);
    }

    public Note addNote(Note note) {
        repo.save(note);
        return note;
    }

    public void updateNote(Note note) {
        repo.save(note);
    }

    public void deleteNote(Note note){
        repo.deleteById(note.getNoteId());
    }
}
