package com.edsang.note_ed.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edsang.note_ed.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer>{

    List<Note> findByArchived(boolean archived);
    
}