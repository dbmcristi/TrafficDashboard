package mywaze.mapper;

import mywaze.dto.Root;
import mywaze.locationsdto.AlertLocation;
import mywaze.locationsdto.JamLocation;
import mywaze.locationsdto.Locations;
import mywaze.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface WazeMapper {
    WazeRoot toModel(Root source);

    Alert toModel(mywaze.dto.Alert source);

    CauseAlert toModel(mywaze.dto.CauseAlert source);

    Irregularity toModel(mywaze.dto.Irregularity source);

    Jam toModel(mywaze.dto.Jam source);

    Line toModel(mywaze.dto.Line source);

    Location toModel(mywaze.dto.Location source);

    Segment toModel(mywaze.dto.Segment source);

    mywaze.dto.Alert toDto(Alert source);
    List<mywaze.dto.Alert> toDtoList(List<Alert> source);

    mywaze.dto.Root toDto(WazeRoot source);

    List<mywaze.dto.Root> toDtoRootList(List<WazeRoot> source);

    mywaze.dto.Jam toDto(Jam source);

    mywaze.dto.Line toDto(Line source);

    mywaze.dto.Location toDto(Location source);

    mywaze.dto.Segment toDto(Segment source);

    mywaze.dto.Irregularity toDto(Irregularity source);

    @Mapping(source="alerts", target="alertLocations")
    @Mapping(source="jams", target="jamLocations")
    Locations toLocationDto(WazeRoot source);

    List<Locations> toLocationListDto(List<WazeRoot> source);

    JamLocation toJamLocationDto(JamLocation source);

    AlertLocation toAlertLocationDto(Alert source);
}