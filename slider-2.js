document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const currentSlideElement = document.querySelector('.current-slide');
    const totalSlidesElement = document.querySelector('.total-slides');
    const autoPlayToggle = document.getElementById('autoPlayToggle');
    const autoPlayIcon = autoPlayToggle.querySelector('i');
    const autoPlayText = autoPlayToggle.querySelector('span');

    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 seconds
    let isAutoPlay = true;

    // Set total slides count
    totalSlidesElement.textContent = slides.length;

    // Initialize slider
    function initSlider() {
        updateSlider();
        startAutoSlide();
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }

    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Update slider visuals and counter
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');

        // Update slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // Update slide counter
        currentSlideElement.textContent = currentSlide + 1;

        // Reset progress bar
        progressBar.style.width = '0%';
    }

    // Start auto-slide with synced progress bar
    function startAutoSlide() {
        let width = 0;
        const interval = 50;
        const increment = 100 / (slideDuration / interval);

        slideInterval = setInterval(() => {
            if (!isAutoPlay) return;

            width += increment;
            progressBar.style.width = `${width}%`;

            if (width >= 100) {
                nextSlide();
                width = 0;
                progressBar.style.width = '0%';
            }
        }, interval);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        if (isAutoPlay) startAutoSlide();
    }

    function toggleAutoPlay() {
        isAutoPlay = !isAutoPlay;

        if (isAutoPlay) {
            autoPlayIcon.className = 'fas fa-pause';
            autoPlayText.textContent = 'Pause Auto-Play';
            startAutoSlide();
        } else {
            autoPlayIcon.className = 'fas fa-play';
            autoPlayText.textContent = 'Play Auto-Play';
            stopAutoSlide();
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    autoPlayToggle.addEventListener('click', toggleAutoPlay);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoPlay();
        }
    });

    // Start everything
    initSlider();
});

// back to top

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

