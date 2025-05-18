package mywaze.dto;

import java.util.ArrayList;

public class Irregularity{
    public String country;
    public int nThumbsUp;
    public String updateDate;
    public int trend;
    public String city;
    public ArrayList<Line> line;
    public Object detectionDateMillis;
    public String type;
    public String endNode;
    public double speed;
    public int seconds;
    public String street;
    public int jamLevel;
    public int id;
    public int nComments;
    public boolean highway;
    public int delaySeconds;
    public int severity;
    public int driversCount;
    public int alertsCount;
    public int length;
    public Object updateDateMillis;
    public int nImages;
    public ArrayList<Alert> alerts;
    public String detectionDate;
    public double regularSpeed;
    public String startNode;
    public String causeType;
    public CauseAlert causeAlert;

    @Override
    public String toString() {
        return "Irregularity{" +
                "country='" + country + '\'' +
                ", nThumbsUp=" + nThumbsUp +
                ", updateDate='" + updateDate + '\'' +
                ", trend=" + trend +
                ", city='" + city + '\'' +
                ", line=" + line +
                ", detectionDateMillis=" + detectionDateMillis +
                ", type='" + type + '\'' +
                ", endNode='" + endNode + '\'' +
                ", speed=" + speed +
                ", seconds=" + seconds +
                ", street='" + street + '\'' +
                ", jamLevel=" + jamLevel +
                ", id=" + id +
                ", nComments=" + nComments +
                ", highway=" + highway +
                ", delaySeconds=" + delaySeconds +
                ", severity=" + severity +
                ", driversCount=" + driversCount +
                ", alertsCount=" + alertsCount +
                ", length=" + length +
                ", updateDateMillis=" + updateDateMillis +
                ", nImages=" + nImages +
                ", alerts=" + alerts +
                ", detectionDate='" + detectionDate + '\'' +
                ", regularSpeed=" + regularSpeed +
                ", startNode='" + startNode + '\'' +
                ", causeType='" + causeType + '\'' +
                ", causeAlert=" + causeAlert +
                '}';
    }
}
