import { Observe } from "../../assets/js/helpers/observe";
import { on } from 'delegated-events';

export class HeroVideo {
  static cssClass = "c-herovideo";

  constructor(el = null) {
    this.el = el;

    this.elInstance = el.querySelector(`.${HeroVideo.cssClass}__instance`);
    this.elVideoTpl = el.querySelector(
      `.${HeroVideo.cssClass}__instance-html-template`
    );

    this.isAutoplay = this.el.dataset.autoplay === "true";
    this.isYouTube = this.el.dataset.ytVidId !== undefined;

    if (this.isYouTube) {
      this.ytVideoId = this.el.dataset.ytVidId;
    }

    if (this.isAutoplay) {
      Observe.watch(
        Observe.handlers.InViewOnce,
        this.el,
        this.onViewChange.bind(this)
      );
    }
  }

  onViewChange(obsData) {
    const isInView = obsData.isIntersecting;

    if (isInView) {
      if (this.isAutoplay) {
        this.play();
      }
    }
  }

  play() {
    if (!this.isYouTube) {

      this.video = this.elVideoTpl.previousElementSibling;

      // Add if not exists
      if (!this.video.matches('video')) {

        // Add the video in DOM
        this.elVideoTpl.insertAdjacentHTML('beforebegin', this.elVideoTpl.textContent);
        this.video = this.elVideoTpl.previousElementSibling;

        // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event
        this.video.addEventListener('canplay', (e) => {
          this.el.classList.add(`${HeroVideo.cssClass}--state-canplay`);
          setTimeout(() => this.video.play(), 300);
        }, { once: true });

        this.video.addEventListener("playing", () => {
          this.el.classList.remove(`${HeroVideo.cssClass}--state-paused`);
          this.el.classList.add(`${HeroVideo.cssClass}--state-playing`);
        });

        this.video.addEventListener("pause", () => {
          this.el.classList.remove(`${HeroVideo.cssClass}--state-playing`);
          this.el.classList.add(`${HeroVideo.cssClass}--state-paused`);
        });

        // Autoplay for Safari iOS
        if (this.isAutoplay) {
          this.video.autoplay = true;
        }

      } else {
        this.video.play();
      }
    } else {
      if (!this.ytPlayer) {
        this.initYouTubeVideo();
      } else {
        this.handleYouTubePlayPause();
      }
    }
  }

  pause() {
    if (!this.video.paused) {
      this.video.pause();
    }
  }

  initYouTubeVideo() {
    this.ytPlayer = new window.YT.Player(this.elInstance, {
      videoId: this.ytVideoId,
      width: this.el.offsetWidth,
      height: this.el.offsetHeight,
      modestbranding: 1,
      autoplay: 0,
      loop: 0,
      playerVars: {
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          this.el.classList.add(`${HeroVideo.cssClass}--state-canplay`);
          this.el.classList.remove(`${HeroVideo.cssClass}--state-paused`);
          this.el.classList.add(`${HeroVideo.cssClass}--state-playing`);
        }
      },
    });
  }

  static onBoot() {

    on('click', `.${HeroVideo.cssClass}__btn--play`, (e) => {
      e.preventDefault();

      const elComponent = e.currentTarget.closest(`.${HeroVideo.cssClass}`);
      const _this = elComponent.instance;

      if (!_this.isYouTube) {
        if (_this.video !== undefined) {
          if (_this.video.paused) {
            _this.play();
          } else {
            _this.pause();
          }
        } else {
          _this.play();
        }
      } else {
        if (!_this.isYouTubeLoaded()) {
          _this.loadYouTubeApi();
        } else {
          if (!_this.ytPlayer) {
            _this.initYouTubeVideo();
          } else {
            _this.handleYouTubePlayPause();
          }
        }
      }
    });
  }

  isYouTubeLoaded() {
    return window.YT !== undefined;
  }

  handleYouTubePlayPause() {
    const state = this.ytPlayer.getPlayerState();
    if (state === window.YT.PlayerState.PLAYING) {
      this.ytPlayer.pauseVideo();
    } else {
      this.ytPlayer.playVideo();
    }
  }

  loadYouTubeApi() {
    if (!this.isYouTubeLoaded()) {
      window.onYouTubeIframeAPIReady = () => {
        setTimeout(() => {
          this.play();
        }, 100);
      };

      var s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.getElementsByTagName("head")[0].appendChild(s);
    }
  }
}
