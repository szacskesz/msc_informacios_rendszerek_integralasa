package hu.szacskesz.beadando.backend.service.api.component;

import hu.szacskesz.beadando.backend.service.api.exception.VideoNotFoundException;
import hu.szacskesz.beadando.backend.service.api.model.CreateVideoDto;
import hu.szacskesz.beadando.backend.service.api.model.FullVideoDto;
import hu.szacskesz.beadando.backend.service.api.model.UpdateVideoDto;

import java.util.List;

public interface VideoService {

    FullVideoDto createVideo(CreateVideoDto createVideoDto);

    void updateVideo(UpdateVideoDto updateVideoDto) throws VideoNotFoundException;

    void rentVideo(long videoId) throws VideoNotFoundException;

    void returnVideo(long videoId) throws VideoNotFoundException;

    void discardVideo(long videoId) throws VideoNotFoundException;

    FullVideoDto getVideo(long videoId) throws VideoNotFoundException;

    List<FullVideoDto> getAllVideo();

    List<FullVideoDto> getAllAvailableVideo();

    List<FullVideoDto> getAllRentedVideo();

    List<FullVideoDto> getAllDiscardedVideo();
}
