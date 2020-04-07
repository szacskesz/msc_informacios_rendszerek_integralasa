package hu.szacskesz.beadando.backend.service.api.exception;

public class VideoNotFoundException extends Exception {

    public VideoNotFoundException() {
        super();
    }

    public VideoNotFoundException(String message) {
        super(message);
    }

    public VideoNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public VideoNotFoundException(Throwable cause) {
        super(cause);
    }
}
