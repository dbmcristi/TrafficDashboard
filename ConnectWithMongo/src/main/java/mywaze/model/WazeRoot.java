package mywaze.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("wazeItems")
public class WazeRoot {
    public ArrayList<Alert> alerts;
    public long endTimeMillis;
    public ArrayList<Irregularity> irregularities;
    public long startTimeMillis;
    public String startTime;
    public String endTime;
    public ArrayList<Jam> jams;

    @Override
    public String toString() {
        return "WazeRoot{" +
                ", alerts=" + alerts +
                ", endTimeMillis=" + endTimeMillis +
                ", irregularities=" + irregularities +
                ", startTimeMillis=" + startTimeMillis +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", jams=" + jams +
                '}';
    }
}