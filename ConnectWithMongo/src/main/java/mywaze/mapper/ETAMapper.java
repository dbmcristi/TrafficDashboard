package mywaze.mapper;

import mywaze.dto.ETA;
import mywaze.dto.Root;
import mywaze.locationsdto.RepresentationDto;
import mywaze.model.Alert;
import mywaze.model.WazeRoot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface ETAMapper {
    @Mapping(target = "date", dateFormat = "yyyy-MM-dd")
    mywaze.model.ETA toModel(ETA source);

    ETA toDto(mywaze.model.ETA source);


}
