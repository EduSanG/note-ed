package com.edsang.note_ed.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.edsang.note_ed.model.Tag;
import com.edsang.note_ed.repository.TagRepository;

@Service
public class TagService {
    
    @Autowired
    TagRepository repository;

    public List<String> getTags() {
        return repository.findDistinct();
    }

}
