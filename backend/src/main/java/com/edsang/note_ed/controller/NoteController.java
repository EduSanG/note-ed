package com.edsang.note_ed.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.edsang.note_ed.model.Note;
import com.edsang.note_ed.service.NoteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/notes")
@Validated
@CrossOrigin
public class NoteController {

    @Autowired
    NoteService service;
    
    @GetMapping
    public List<Note> getNotes() {
        return service.getNotes();
    }

    @GetMapping("/archived")
    public List<Note> getArchivedNotes() {
        return service.getArchivedNotes();
    }

    @GetMapping("/{noteId}")
    public Note getNoteById(int noteId){
        return service.getNoteById(noteId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Note addNote (@Valid @RequestBody Note note) {
        return service.addNote(note);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateNote(@Valid @RequestBody Note note) {
        service.updateNote(note);
    }

    @PutMapping("/bulk")
    public void bulkUpdateNotes(@Valid @RequestBody Note[] notes) {
        
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(@Valid @RequestBody Note note) {
        service.deleteNote(note);
    }
}