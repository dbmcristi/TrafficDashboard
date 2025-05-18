package mywaze.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Document("ETAItems")
@CompoundIndex(def = "{'type': 1, 'subype': 1}")
@CompoundIndex(def = "{'location.x': 1, 'location.y': 1}")
public class ETA {
    public String type;
    public String subtype;
    public Location location;
    public Date date;

    public long time = System.currentTimeMillis();

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "ETA{" +
                "type='" + type + '\'' +
                ", subtype='" + subtype + '\'' +
                ", location=" + location +
                ", date=" + date +
                '}';
    }
}
