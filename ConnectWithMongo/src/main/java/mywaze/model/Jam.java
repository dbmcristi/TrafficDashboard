package mywaze.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Jam{
    public String country;
    public int level;
    public String city;
    public ArrayList<Line> line;
    public double speedKMH;
    public int length;
    public String turnType;
    public int uuid;
    public String endNode;
    public double speed;
    public ArrayList<Segment> segments;
    public int roadType;
    public int delay;
    public String street;
    public int id;
    public long pubMillis;
    public String blockingAlertUuid;

    @Override
    public String toString() {
        return "Jam{" +
                "country='" + country + '\'' +
                ", level=" + level +
                ", city='" + city + '\'' +
                ", line=" + line +
                ", speedKMH=" + speedKMH +
                ", length=" + length +
                ", turnType='" + turnType + '\'' +
                ", uuid=" + uuid +
                ", endNode='" + endNode + '\'' +
                ", speed=" + speed +
                ", segments=" + segments +
                ", roadType=" + roadType +
                ", delay=" + delay +
                ", street='" + street + '\'' +
                ", id=" + id +
                ", pubMillis=" + pubMillis +
                ", blockingAlertUuid='" + blockingAlertUuid + '\'' +
                '}';
    }
}
