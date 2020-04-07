package hu.szacskesz.beadando.backend.service.impl.component;

import hu.szacskesz.beadando.backend.data.model.VideoEntity;
import hu.szacskesz.beadando.backend.data.model.VideoEntityStatusEnum;
import hu.szacskesz.beadando.backend.data.repository.VideoRepository;
import hu.szacskesz.beadando.backend.service.api.component.VideoService;
import hu.szacskesz.beadando.backend.service.api.exception.VideoNotFoundException;
import hu.szacskesz.beadando.backend.service.api.model.CreateVideoDto;
import hu.szacskesz.beadando.backend.service.api.model.FullVideoDto;
import hu.szacskesz.beadando.backend.service.api.model.UpdateVideoDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {

    private static final Logger log = LoggerFactory.getLogger(VideoService.class);

    @Autowired
    private VideoRepository videoRepository;

    @Override
    public FullVideoDto createVideo(CreateVideoDto createVideoDto) {
        VideoEntity videoEntity = new VideoEntity();
        videoEntity.setTitle(createVideoDto.getTitle());
        videoEntity.setSerial(createVideoDto.getSerial());
        videoEntity.setAcquisitionDate(createVideoDto.getAcquisitionDate());
        videoEntity.setStatus(VideoEntityStatusEnum.AVAILABLE);

        videoEntity = videoRepository.save(videoEntity);

        return mapVideoEntityToFullVideoDto(videoEntity);
    }

    @Override
    public void updateVideo(UpdateVideoDto updateVideoDto) throws VideoNotFoundException {
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(updateVideoDto.getId());
        if (optionalVideoEntity.isPresent()) {
            VideoEntity videoEntity = optionalVideoEntity.get();
            videoEntity.setTitle(updateVideoDto.getTitle());
            videoEntity.setSerial(updateVideoDto.getSerial());
            videoEntity.setAcquisitionDate(updateVideoDto.getAcquisitionDate());

            videoRepository.save(videoEntity);
        } else {
            throw new VideoNotFoundException("Video not found by the given id: " + updateVideoDto.getId());
        }
    }

    @Override
    public void rentVideo(long videoId) throws VideoNotFoundException {
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoId);
        if (optionalVideoEntity.isPresent()) {
            VideoEntity videoEntity = optionalVideoEntity.get();
            videoEntity.setStatus(VideoEntityStatusEnum.RENTED);

            videoRepository.save(videoEntity);
        } else {
            throw new VideoNotFoundException("Video not found by the given id: " + videoId);
        }
    }

    @Override
    public void returnVideo(long videoId) throws VideoNotFoundException {
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoId);
        if (optionalVideoEntity.isPresent()) {
            VideoEntity videoEntity = optionalVideoEntity.get();
            videoEntity.setStatus(VideoEntityStatusEnum.AVAILABLE);

            videoRepository.save(videoEntity);
        } else {
            throw new VideoNotFoundException("Video not found by the given id: " + videoId);
        }
    }

    @Override
    public void discardVideo(long videoId) throws VideoNotFoundException {
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoId);
        if (optionalVideoEntity.isPresent()) {
            VideoEntity videoEntity = optionalVideoEntity.get();
            videoEntity.setStatus(VideoEntityStatusEnum.DISCARDED);

            videoRepository.save(videoEntity);
        } else {
            throw new VideoNotFoundException("Video not found by the given id: " + videoId);
        }
    }

    @Override
    public FullVideoDto getVideo(long videoId) throws VideoNotFoundException {
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoId);
        if (optionalVideoEntity.isPresent()) {
            VideoEntity videoEntity = optionalVideoEntity.get();

            return mapVideoEntityToFullVideoDto(videoEntity);
        } else {
            throw new VideoNotFoundException("Video not found by the given id: " + videoId);
        }
    }

    @Override
    public List<FullVideoDto> getAllVideo() {
        List<VideoEntity> videoEntityList = this.videoRepository.findAll();

        return mapVideoEntityListToFullVideoDtoList(videoEntityList);
    }

    @Override
    public List<FullVideoDto> getAllAvailableVideo() {
        List<VideoEntity> videoEntityList = this.videoRepository.findAllByStatus(VideoEntityStatusEnum.AVAILABLE);

        return mapVideoEntityListToFullVideoDtoList(videoEntityList);
    }

    @Override
    public List<FullVideoDto> getAllRentedVideo() {
        List<VideoEntity> videoEntityList = this.videoRepository.findAllByStatus(VideoEntityStatusEnum.RENTED);

        return mapVideoEntityListToFullVideoDtoList(videoEntityList);
    }

    @Override
    public List<FullVideoDto> getAllDiscardedVideo() {
        List<VideoEntity> videoEntityList = this.videoRepository.findAllByStatus(VideoEntityStatusEnum.DISCARDED);

        return mapVideoEntityListToFullVideoDtoList(videoEntityList);
    }

    private List<FullVideoDto> mapVideoEntityListToFullVideoDtoList(List<VideoEntity> videoEntityList) {
        List<FullVideoDto> fullVideoDtoList = new ArrayList<FullVideoDto>();
        for(VideoEntity videoEntity : videoEntityList) {
            fullVideoDtoList.add(mapVideoEntityToFullVideoDto(videoEntity));
        }

        return fullVideoDtoList;
    }

    private FullVideoDto mapVideoEntityToFullVideoDto(VideoEntity videoEntity) {
        FullVideoDto fullVideoDto = new FullVideoDto();
        fullVideoDto.setId(videoEntity.getId());
        fullVideoDto.setTitle(videoEntity.getTitle());
        fullVideoDto.setSerial(videoEntity.getSerial());
        fullVideoDto.setAcquisitionDate(videoEntity.getAcquisitionDate());
        fullVideoDto.setStatus(videoEntity.getStatus());

        return fullVideoDto;
    }
}
