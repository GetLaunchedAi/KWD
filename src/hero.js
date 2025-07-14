const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
        for (const item of faqItems) {
            const onClick = () => {
            item.classList.toggle('active')
        }
        item.addEventListener('click', onClick)
        }
                                
document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('pageReloaded')) {
    sessionStorage.setItem('pageReloaded', 'true');
    location.reload();
  }
const video = document.querySelector('.laptop-video');

    if (video) {
      video.muted = true; // Safari sometimes needs this set via JS too
      video.setAttribute('playsinline', ''); // Enforce playsinline
      video.play().catch((error) => {
        console.warn('Autoplay blocked:', error);

        // Optional: Retry on user interaction as fallback
        const retryPlay = () => {
          video.play().catch(err => console.error('Manual play failed:', err));
          document.removeEventListener('click', retryPlay);
        };

        document.addEventListener('click', retryPlay);
      });
    }

});

const mainAnimation = lottie.loadAnimation({
  container: document.getElementById('lottie-scroll-animation'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://cdn.prod.website-files.com/682d42bc53d9098749763dd3/682d60e07098c1abdaaad23f_mockup1-lottie.json'
});



const scrollSection = document.querySelector('.scroll-section');
const stickyWrapper = document.getElementById('sticky-wrapper');
const video = document.querySelector('.laptop-video');

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
// window.addEventListener('resize', () => {
//   mainAnimation.resize()
// })
    mainAnimation.goToAndStop(20, true);

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const start = scrollSection.offsetTop;
  const end = start + scrollSection.offsetHeight - window.innerHeight;
  const rawProgress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
  const easedProgress = easeOutQuad(rawProgress);

  // Animate the Lottie frame
  let frame = (easedProgress * mainAnimation.totalFrames) + 20;

  console.log(easedProgress, mainAnimation.totalFrames, easedProgress * mainAnimation.totalFrames)
  if(frame < 133) {
    mainAnimation.goToAndStop(frame - 0.1, true);
  } else {
    mainAnimation.goToAndStop(130 - 0.1, true);
  }


  // Fade in the video after 80%
  const fadeInStart = 0.35;
  const fadeInEnd = 0.7;
  let opacity = 0;
  if (rawProgress >= fadeInStart) {
    opacity = (rawProgress - fadeInStart) / (fadeInEnd - fadeInStart);
  }
  video.style.opacity = Math.min(Math.max(opacity, 0), 1);

  // Let sticky-wrapper stop being sticky but remain visible
//   if (rawProgress >= 1) {
//     stickyWrapper.classList.add('scrolled-past');
//   } else {
//     stickyWrapper.classList.remove('scrolled-past');
//   }

});

// Autoplay youtube video

class CS_GalleryFilter {
	filtersSelector = ".cs-button";
	cardSelector = ".cs-card";
	activeClass = "cs-active";
	hiddenClass = "cs-hidden";

	constructor() {
		this.$card = document.querySelectorAll(this.cardSelector);
		const $filters = document.querySelectorAll(this.filtersSelector);

		this.onClick($filters[0]);

		for (const $filter of $filters) {
			$filter.addEventListener("click", () => this.onClick($filter));
		}
	}

	onClick($filter) {
		this.filter($filter.dataset.filter);

		const { activeClass } = this;

		this.$activeFilter?.classList.remove(activeClass);
		$filter.classList.add(activeClass);

		this.$activeFilter = $filter;
	}

	filter(filter) {
		const showAll = filter == "all";
		const { hiddenClass } = this;

		for (const $gallery of this.$card) {
			const show = showAll || $gallery.dataset.category == filter;
			$gallery.classList.toggle(hiddenClass, !show);
		}
	}
}

new CS_GalleryFilter();
                                