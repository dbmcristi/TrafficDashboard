package mywaze.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CauseAlert{
    public String country;
    public int reportRating;
    public String reportByMunicipalityUser;
    public int confidence;
    public int reliability;
    public String type;
    public String uuid;
    public int roadType;
    public int magvar;
    public String subtype;
    public String street;
    public Location location;
    public long pubMillis;

    @Override
    public String toString() {
        return "CauseAlert{" +
                "country='" + country + '\'' +
                ", reportRating=" + reportRating +
                ", reportByMunicipalityUser='" + reportByMunicipalityUser + '\'' +
                ", confidence=" + confidence +
                ", reliability=" + reliability +
                ", type='" + type + '\'' +
                ", uuid='" + uuid + '\'' +
                ", roadType=" + roadType +
                ", magvar=" + magvar +
                ", subtype='" + subtype + '\'' +
                ", street='" + street + '\'' +
                ", location=" + location +
                ", pubMillis=" + pubMillis +
                '}';
    }
}