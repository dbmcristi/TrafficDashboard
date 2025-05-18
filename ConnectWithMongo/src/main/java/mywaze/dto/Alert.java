package mywaze.dto;

public class Alert{
    public String country;
    public String city;
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
    public String reportDescription;

    @Override
    public String toString() {
        return "Alert{" +
                "country='" + country + '\'' +
                ", city='" + city + '\'' +
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
                ", reportDescription='" + reportDescription + '\'' +
                '}';
    }
}
