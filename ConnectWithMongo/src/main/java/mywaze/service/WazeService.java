package mywaze.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import mywaze.dto.Root;
import mywaze.mapper.WazeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WazeService {
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    WazeMapper wazeMapper;
    @Autowired
    private ItemService service;
    public void saveWazeFile(String result) {
        try {
            Root val = objectMapper.readValue(result, Root.class);
            var wazeroot = wazeMapper.toModel(val);
            service.save(wazeroot);
            service.findAll();
        } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
        }
    }

}
