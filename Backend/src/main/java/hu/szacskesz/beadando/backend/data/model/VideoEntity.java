package hu.szacskesz.beadando.backend.data.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "VideoEntity")
@Table(name = "t_video")
public class VideoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "serial_no", unique = true)
    private String serial;

    @Column(name = "title")
    private String title;

    @Column(name = "acquisition_date")
    private Date acquisitionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private VideoEntityStatusEnum status;
}
