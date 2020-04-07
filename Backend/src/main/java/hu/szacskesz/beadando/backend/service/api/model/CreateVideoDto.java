package hu.szacskesz.beadando.backend.service.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateVideoDto {

    @NotNull
    @NotEmpty
    private String serial;

    @NotNull
    @NotEmpty
    private String title;

    @NotNull
    private Date acquisitionDate;
}
