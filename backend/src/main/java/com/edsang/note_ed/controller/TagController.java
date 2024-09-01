package com.edsang.note_ed.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.edsang.note_ed.model.Tag;
import com.edsang.note_ed.service.TagService;

@RestController
@RequestMapping("/tags")
@Validated
@CrossOrigin
public class TagController {
    
    @Autowired
    TagService service;

    @GetMapping
    public List<String> getTags() {
        return service.getTags();
    }
}
