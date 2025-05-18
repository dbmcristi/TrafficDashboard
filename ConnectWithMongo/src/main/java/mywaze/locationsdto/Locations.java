package mywaze.locationsdto;

import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
public class Locations {
    public List<AlertLocation> alertLocations;
    public List<JamLocation> jamLocations;

    public List<AlertLocation> getAlertLocations() {
        return alertLocations;
    }

    public void setAlertLocations(List<AlertLocation> alertLocations) {
        this.alertLocations = alertLocations;
    }

    public List<JamLocation> getJamLocations() {
        return jamLocations;
    }

    public void setJamLocations(List<JamLocation> jamLocations) {
        this.jamLocations = jamLocations;
    }
}