package mywaze.dto;

import java.util.ArrayList;

public class Root{
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
                "alerts=" + alerts +
                ", endTimeMillis=" + endTimeMillis +
                ", irregularities=" + irregularities +
                ", startTimeMillis=" + startTimeMillis +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", jams=" + jams +
                '}';
    }

    public ArrayList<Alert> getAlerts() {
        return alerts;
    }

    public long getEndTimeMillis() {
        return endTimeMillis;
    }

    public ArrayList<Irregularity> getIrregularities() {
        return irregularities;
    }

    public long getStartTimeMillis() {
        return startTimeMillis;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public ArrayList<Jam> getJams() {
        return jams;
    }
}