package hu.szacskesz.beadando.backend.web;

import hu.szacskesz.beadando.backend.service.api.component.VideoService;
import hu.szacskesz.beadando.backend.service.api.exception.VideoNotFoundException;
import hu.szacskesz.beadando.backend.service.api.model.CreateVideoDto;
import hu.szacskesz.beadando.backend.service.api.model.FullVideoDto;
import hu.szacskesz.beadando.backend.service.api.model.UpdateVideoDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("video")
@CrossOrigin
public class VideoController {

	private static final Logger log = LoggerFactory.getLogger(VideoController.class);

	@Autowired
	private VideoService videoService;

	@PostMapping("/create")
	public FullVideoDto create(@RequestBody @NotNull @Valid CreateVideoDto createVideoDto) {
		return this.videoService.createVideo(createVideoDto);
	}

	@PostMapping("/update")
	public void update(@RequestBody @NotNull @Valid UpdateVideoDto updateVideoDto) throws VideoNotFoundException {
		this.videoService.updateVideo(updateVideoDto);
	}

	@GetMapping("/rent/{id}")
	public void rent(@PathVariable @NotNull @Positive long id) throws VideoNotFoundException {
		this.videoService.rentVideo(id);
	}

	@GetMapping("/return/{id}")
	public void returnVideo(@PathVariable @NotNull @Positive long id) throws VideoNotFoundException {
		this.videoService.returnVideo(id);
	}

	@GetMapping("/discard/{id}")
	public void discard(@PathVariable @NotNull @Positive long id) throws VideoNotFoundException {
		this.videoService.discardVideo(id);
	}

	@GetMapping("/get/{id}")
	public FullVideoDto get(@PathVariable @NotNull @Positive long id) throws VideoNotFoundException {
		return this.videoService.getVideo(id);
	}

	@GetMapping("getAll")
	public List<FullVideoDto> getAll() {
		return this.videoService.getAllVideo();
	}

	@GetMapping("/getAllAvailable")
	public List<FullVideoDto> getAllAvailable() {
		return this.videoService.getAllAvailableVideo();
	}

	@GetMapping("/getAllRented")
	public List<FullVideoDto> getAllRented() {
		return this.videoService.getAllRentedVideo();
	}

	@GetMapping("/getAllDiscarded")
	public List<FullVideoDto> getAllDiscarded() {
		return this.videoService.getAllDiscardedVideo();
	}

	@ExceptionHandler({ VideoNotFoundException.class })
	public ResponseEntity<Object> handleVideoNotFoundException(VideoNotFoundException e) {
		log.warn("Handling VideoNotFoundException in controller.");

		return new ResponseEntity<Object>("Bad request!\nThe referenced Video is not found.", new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}
}


