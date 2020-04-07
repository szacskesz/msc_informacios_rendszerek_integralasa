import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { NotificationsService } from 'angular2-notifications';

import { VideoListDataSource } from './video-list-datasource';

// Models
import { Video } from '@models/video';
import { VideoStatusEnum } from '@models/video';

// Services
import { VideoService } from '@services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: VideoListDataSource;

  VIDEO_STATUS_ENUM_VALUES = Object.keys(VideoStatusEnum);

  constructor(
    private videoService: VideoService,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit() {
    this.dataSource = new VideoListDataSource(this.videoService, this.notificationsService);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  generalFilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.setGeneralFilter(filterValue.trim().toLowerCase());
  }

  statusFilterChanged(event: any) {
    const filterValue = event.value;
    const newFilterParsed = filterValue != null ? filterValue : '';
    this.dataSource.setStatusFilter(newFilterParsed);
  }

  statusChangedForVideo(video: Video, e: MatButtonToggleChange) {
    e.source.buttonToggleGroup.value = video.status;
    if (video.status !== e.value) {
      (video as any).loading = true;

      const successCB = () => {
        video.status = e.value;
        e.source.buttonToggleGroup.value = e.value;
        (video as any).loading = false;
      };

      const errorCB = (error) => {
        (video as any).loading = false;

        console.error(error);

        const title = 'Error';
        const content = 'Could not change video status.';
        const options = {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          animate: 'rotate'
        };

        this.notificationsService.error(title, content, options);
      };

      switch (e.value) {
        case VideoStatusEnum.AVAILABLE: {
          this.videoService.returnVideo(video).subscribe(successCB, errorCB);
          break;
        }
        case VideoStatusEnum.RENTED: {
          this.videoService.rentVideo(video).subscribe(successCB, errorCB);
          break;
        }
        case VideoStatusEnum.DISCARDED: {
          this.videoService.discardVideo(video).subscribe(successCB, errorCB);
          break;
        }
      }
    }
  }
}

