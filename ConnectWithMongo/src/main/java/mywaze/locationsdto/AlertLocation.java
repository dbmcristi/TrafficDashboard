package mywaze.locationsdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mywaze.dto.Location;
import mywaze.model.Line;

import java.util.ArrayList;


@AllArgsConstructor
@NoArgsConstructor
public class AlertLocation {
    public Location location;
    public String street;
    public String city;
    public String type;
    public String subtype;

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

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

    @Override
    public String toString() {
        return "AlertLocation{" +
                "location=" + location +
                ", street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", type='" + type + '\'' +
                ", subtype='" + subtype + '\'' +
                '}';
    }
}
