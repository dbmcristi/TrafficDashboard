package mywaze.locationsdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mywaze.model.Line;

import java.util.ArrayList;


@AllArgsConstructor
@NoArgsConstructor
public class JamLocation {
    public String street;
    public String city;
    public ArrayList<Line> line;

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

    public ArrayList<Line> getLine() {
        return line;
    }

    public void setLine(ArrayList<Line> line) {
        this.line = line;
    }

    @Override
    public String toString() {
        return "JamLocation{" +
                "streetName='" + street + '\'' +
                ", city='" + city + '\'' +
                ", line=" + line +
                '}';
    }
}
