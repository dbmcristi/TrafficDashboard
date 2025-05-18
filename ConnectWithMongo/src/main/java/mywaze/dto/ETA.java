package mywaze.dto;

import mywaze.model.Location;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.io.Serializable;
import java.util.Date;

public class ETA  implements Serializable {
    public String type;
    public String subtype;
    public Location location;
    public String date;

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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "ETA{" +
                "type='" + type + '\'' +
                ", subtype='" + subtype + '\'' +
                ", location=" + location.toString() +
                ", date=" + date +
                '}';
    }
}
