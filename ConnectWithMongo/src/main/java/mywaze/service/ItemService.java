package mywaze.service;


import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;

import mywaze.model.WazeRoot;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.Conventions;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.mongodb.client.model.Filters.*;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

@Service
public class ItemService {
    @Autowired
    private MongoTemplate mt;

    //    public void save(String val1, String val2, String val3) {
//        mt.save(new GroceryItem(val1, val2, 1, val3));
//    }
//
//    public void findAll() {
//        System.out.println(mt.findAll(GroceryItem.class).stream().collect(Collectors.toSet()));
//    }
    public void save(WazeRoot wazeRoot) {
        mt.save(wazeRoot);
    }

    public void findAll() {
     mt.findAll(WazeRoot.class).stream().collect(Collectors.toList());
    }

    public List<WazeRoot> findAllLocation() {
        Query query = new Query();
        query.fields()
                .include("alerts.street")
                .include("alerts.city")
                .include("alerts.location")
                .include("alerts.type")
                .include("alerts.subtype")
                .include("jams.line")
                .include("jams.street")
                .include("jams.city")
        ;
        List<WazeRoot> list = mt.find(query, WazeRoot.class);
        return list;
    }

    public WazeRoot findLast() {

        Sort sort = Sort.by("startTime").descending();

        Query query = new Query();
        query
                .with(sort)
                .limit(1)
                .fields()
                .include("alerts.street")
                .include("alerts.city")
                .include("alerts.location")
                .include("alerts.type")
                .include("alerts.subtype")
                .include("jams.line")
                .include("jams.street")
                .include("jams.city")
        ;
        WazeRoot root = mt.find(query, WazeRoot.class).get(0);
        return root;
    }

    /***
     * argumentele o sa vina din query params
     * @param begin
     * @param end
     * @return
     */
    public List<WazeRoot> findByDate(String begin, String end) {
        Criteria criteria1 = Criteria.where("startTime")
                .gte(begin+" 00:00");

        Criteria criteria2 = Criteria.where("startTime")
                .lte(end+" 23:59");

        Query query = new Query();
        query
                .addCriteria(criteria1.andOperator(criteria2))
                .fields()
                .include("alerts.street")
                .include("alerts.city")
                .include("alerts.location")
                .include("alerts.type")
                .include("alerts.subtype")
                .include("jams.line")
                .include("jams.street")
                .include("jams.city")
        ;
        return mt.find(query, WazeRoot.class);
    }

}
