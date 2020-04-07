import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

// Components
import { HomeComponent } from '@components/home/home.component';
import { VideoListComponent } from '@components/video/video-list/video-list.component';
import { VideoCreateComponent } from '@components/video/video-create/video-create.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'video/create', component: VideoCreateComponent },
  { path: 'video/list', component: VideoListComponent },
  { path: 'video', redirectTo: 'video/list', pathMatch: 'full' },

  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
