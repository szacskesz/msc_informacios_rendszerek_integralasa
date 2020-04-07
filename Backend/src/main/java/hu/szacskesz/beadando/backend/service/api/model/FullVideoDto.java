package hu.szacskesz.beadando.backend.service.api.model;

import hu.szacskesz.beadando.backend.data.model.VideoEntityStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FullVideoDto {

    private long id;

    private String serial;

    private String title;

    private Date acquisitionDate;

    private VideoEntityStatusEnum status;
}
