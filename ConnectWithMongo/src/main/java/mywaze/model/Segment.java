package mywaze.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Segment{
    public int fromNode;
    @JsonProperty("ID")
    public int iD;
    public int toNode;
    public boolean isForward;

    @Override
    public String toString() {
        return "Segment{" +
                "fromNode=" + fromNode +
                ", iD=" + iD +
                ", toNode=" + toNode +
                ", isForward=" + isForward +
                '}';
    }
}
