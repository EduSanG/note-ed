package com.edsang.note_ed.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.edsang.note_ed.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    
    @Query("SELECT DISTINCT t.tagValue FROM Tag t")
    List<String>findDistinct();

}
