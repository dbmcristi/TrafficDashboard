package mywaze.connectwithmongo;

import mywaze.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication(scanBasePackages = {"mywaze"})
@EnableMongoRepositories
//@EnableSwagger2
public class ConnectWithMongoApplication implements CommandLineRunner {

    @Autowired
    private ItemService service;

    public static void main(String[] args) {
        SpringApplication.run(ConnectWithMongoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}

