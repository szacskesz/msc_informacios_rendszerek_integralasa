import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'take-while-alive';
import { takeWhileAlive } from 'take-while-alive';
import { NotificationsService } from 'angular2-notifications';

// Models
import { Video } from '@models/video';

// Services
import { VideoService } from '@services/video.service';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
@AutoUnsubscribe()
export class VideoCreateComponent {
  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private notificationsService: NotificationsService
  ) { }

  form = this.formBuilder.group({
    serial: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
    title: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
    acquisitionDate: [null, Validators.required]
  });

  onSubmit() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      const newVideo: Video = {
        id: null,
        serial: formData.serial,
        title: formData.title,
        acquisitionDate: formData.acquisitionDate,
        status: null
      };

      this.videoService.createVideo(newVideo).pipe(takeWhileAlive(this)).subscribe(
        (response) => {
          const title = 'Success';
          const content = 'Video created.';
          const options = {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            animate: 'rotate'
          };

          this.notificationsService.success(title, content, options);
        },
        (error) => {
          console.error(error);

          const title = 'Error';
          const content = 'Could not create video.';
          const options = {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            animate: 'rotate'
          };

          this.notificationsService.error(title, content, options);
        }
      );
    }
  }
}
