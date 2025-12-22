 document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.nav-dot');
            const thumbnails = document.querySelectorAll('.thumbnail');
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
            const slideDuration = 8000; // Increased to 8 seconds
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
                resetAutoSlide();
            }
            
            // Go to previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlider();
                resetAutoSlide();
            }
            
            // Update slider position and active states
            function updateSlider() {
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentSlide].classList.add('active');
                
                // Update thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnails[currentSlide].classList.add('active');
                
                // Update slides
                slides.forEach(slide => slide.classList.remove('active'));
                slides[currentSlide].classList.add('active');
                
                // Update slide counter
                currentSlideElement.textContent = currentSlide + 1;
                
                // Reset progress bar
                progressBar.style.width = '0%';
            }
            
            // Start automatic sliding
            function startAutoSlide() {
                if (isAutoPlay) {
                    slideInterval = setInterval(nextSlide, slideDuration);
                }
            }
            
            // Stop automatic sliding
            function stopAutoSlide() {
                clearInterval(slideInterval);
            }
            
            // Reset automatic sliding
            function resetAutoSlide() {
                stopAutoSlide();
                startAutoSlide();
            }
            
            // Toggle auto-play
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
            
            // Progress bar animation
            function animateProgressBar() {
                let width = 0;
                const interval = 50; // Update every 50ms
                const increment = (100 / (slideDuration / interval));
                
                const progressInterval = setInterval(() => {
                    if (width >= 100 || !isAutoPlay) {
                        clearInterval(progressInterval);
                    } else {
                        width += increment;
                        progressBar.style.width = width + '%';
                    }
                }, interval);
            }
            
            // Event listeners
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
            });
            
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
            });
            
            autoPlayToggle.addEventListener('click', toggleAutoPlay);
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                } else if (e.key === ' ') {
                    e.preventDefault();
                    toggleAutoPlay();
                }
            });
            
            // Initialize the slider
            initSlider();
            
            // Start progress bar animation
            setInterval(animateProgressBar, slideDuration);
            animateProgressBar();
        });