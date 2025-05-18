package mywaze.service;

import mywaze.model.ETA;
import mywaze.model.WazeRoot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ETAService {
    @Autowired
    MongoTemplate mt;

    public ETA save(ETA eta) {
        return  mt.save(eta);
    }

    public List<ETA> findAll() {
     return mt.findAll(ETA.class);
    }

}
