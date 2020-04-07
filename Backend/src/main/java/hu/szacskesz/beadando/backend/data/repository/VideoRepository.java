package hu.szacskesz.beadando.backend.data.repository;

import hu.szacskesz.beadando.backend.data.model.VideoEntity;
import hu.szacskesz.beadando.backend.data.model.VideoEntityStatusEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends CrudRepository<VideoEntity, Long> {

    List<VideoEntity> findAll();

    List<VideoEntity> findAllByStatus(VideoEntityStatusEnum videoEntityStatusEnum);
}
