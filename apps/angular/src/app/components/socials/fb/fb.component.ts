import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  akarIcon,
  akarChevronLeft,
  akarLinkOut,
} from '@ng-icons/akar-icons';
import { RouterModule } from '@angular/router';
import { SubHeadComponent } from '../sub-head.component/sub-head.component';

@Component({
  selector: 'mixtapemadness-socials',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    YouTubePlayerModule,
    FlexLayoutModule,
    NgIconComponent,
    SubHeadComponent
  ],
  providers: [provideIcons({
    akarIcon,
    akarChevronLeft,
    akarLinkOut
  })],
  templateUrl: './fb.component.html',
  styleUrls: ['../socials.component.scss'],
})
export class FBComponent implements AfterViewInit {
  @ViewChild('ytSubscribeContainer', { static: true }) ytSubscribeContainer: ElementRef | undefined;

  social = '';
  width = 'inherit' as any;
  height = 'auto' as any;
  currentVideoId = '';
  videos = [] as any[];

  playerVars = {
    // listType: 'playlist' as any,
    autoPlay: 1,
    controls: 0,
    iv_load_policy: 3,
  } as YT.PlayerVars;

  constructor(private _http: HttpClient, private _elementRef: ElementRef) {

    this._http.get('api/social/yt').subscribe(({ videos }: any) => {
      this.videos = videos;
      // this.playerVars.list = v.snippet.playlistId;
      // console.log(this.playerVars.list);
      // this.currentVideoId = v.snippet.resourceId.videoId;

      // this.currentVideoId = videos.shift().snippet.resourceId.videoId;
      // this.videos = videos.map((v: any) => v.snippet.resourceId.videoId);
      // this.playerVars.list = this.videos;
      // console.log('VIDEOS', this.videos);
    })
    // this.ytChannelUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._ytOriginal);
  }
  ngAfterViewInit(): void {
    const youtubeButton = this.getYouTubeButton();
    console.log(this.ytSubscribeContainer);
  }

  getYouTubeButton() {
    if (this.ytSubscribeContainer?.nativeElement) {
      const children = this.ytSubscribeContainer?.nativeElement.children;
      let youtubeButton;
      for(let i = 0; i < children.length; i++) {
        if (children[i].tagName.toLowerCase() === 'div'){
          youtubeButton = children[i];
          break;
        }
      }

      youtubeButton.nativeElement.onChange = () => {
        return this.getYouTubeButton();
      };
      console.log(youtubeButton);
      return youtubeButton;
    }
  }
  // https://www.youtube.com/embed/gM7YzpKLwOU?listType=playlist&autoPlay=1&controls=0&iv_load_policy=3&list=UUHw-oxqEFy_jZwXUvAORgog&enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A4200&widgetid=1
}
