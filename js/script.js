// Walmart Homepage Clone - JavaScript Functionality
// Handles slider functionality, responsive menu, and interactive features

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initializeSlider();
            initializeSearch();
            initializePromoCards();
            initializeAccessibility();
        } catch (error) {
            console.error('Error initializing page functionality:', error);
        }
    });

    // Slider Functionality
    function initializeSlider() {
        try {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            if (!slides.length || !dots.length) {
                console.warn('Slider elements not found');
                return;
            }

            let currentSlide = 0;
            let slideInterval;

            // Function to show specific slide
            function showSlide(index) {
                try {
                    // Remove active class from all slides and dots
                    slides.forEach(slide => slide.classList.remove('active'));
                    dots.forEach(dot => dot.classList.remove('active'));

                    // Add active class to current slide and dot
                    if (slides[index] && dots[index]) {
                        slides[index].classList.add('active');
                        dots[index].classList.add('active');
                        currentSlide = index;
                    }
                } catch (error) {
                    console.error('Error showing slide:', error);
                }
            }

            // Function to go to next slide
            function nextSlide() {
                const next = (currentSlide + 1) % slides.length;
                showSlide(next);
            }

            // Function to go to previous slide
            function prevSlide() {
                const prev = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prev);
            }

            // Auto-rotate slides every 5 seconds
            function startAutoSlide() {
                slideInterval = setInterval(nextSlide, 5000);
            }

            // Stop auto-rotation
            function stopAutoSlide() {
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
            }

            // Event listeners for navigation buttons
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    stopAutoSlide();
                    nextSlide();
                    startAutoSlide();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    stopAutoSlide();
                    prevSlide();
                    startAutoSlide();
                });
            }

            // Event listeners for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    stopAutoSlide();
                    showSlide(index);
                    startAutoSlide();
                });
            });

            // Pause auto-slide on hover
            const sliderContainer = document.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', stopAutoSlide);
                sliderContainer.addEventListener('mouseleave', startAutoSlide);
            }

            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    stopAutoSlide();
                    prevSlide();
                    startAutoSlide();
                } else if (e.key === 'ArrowRight') {
                    stopAutoSlide();
                    nextSlide();
                    startAutoSlide();
                }
            });

            // Start auto-slide
            startAutoSlide();

            // Handle visibility change (pause when tab is not active)
            document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                    stopAutoSlide();
                } else {
                    startAutoSlide();
                }
            });

        } catch (error) {
            console.error('Error initializing slider:', error);
        }
    }

    // Search Functionality
    function initializeSearch() {
        try {
            const searchInput = document.querySelector('.search-input');
            const searchBtn = document.querySelector('.search-btn');

            if (!searchInput || !searchBtn) {
                console.warn('Search elements not found');
                return;
            }

            // Handle search button click
            searchBtn.addEventListener('click', function() {
                handleSearch();
            });

            // Handle Enter key in search input
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });

            // Search suggestions (mock functionality)
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                if (query.length > 2) {
                    // In a real implementation, this would fetch suggestions
                    console.log('Searching for:', query);
                }
            });

            function handleSearch() {
                const query = searchInput.value.trim();
                if (query) {
                    // In a real implementation, this would redirect to search results
                    console.log('Searching for:', query);
                    alert(`Searching for: "${query}"`);
                } else {
                    searchInput.focus();
                }
            }

        } catch (error) {
            console.error('Error initializing search:', error);
        }
    }

    // Promo Cards Interaction
    function initializePromoCards() {
        try {
            const promoCards = document.querySelectorAll('.promo-card');
            const shopButtons = document.querySelectorAll('.shop-btn');
            const ctaButtons = document.querySelectorAll('.cta-btn');
            const plusButton = document.querySelector('.plus-btn');
            const feedbackButton = document.querySelector('.feedback-btn');

            // Add click handlers to shop buttons
            shopButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const cardTitle = this.closest('.promo-card').querySelector('h3').textContent;
                    console.log('Shop button clicked for:', cardTitle);
                    showNotification(`Redirecting to ${cardTitle}...`);
                });
            });

            // Add click handlers to CTA buttons
            ctaButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const slideContent = this.closest('.slide-content');
                    const title = slideContent.querySelector('h2').textContent;
                    console.log('CTA button clicked for:', title);
                    showNotification(`Redirecting to ${title}...`);
                });
            });

            // Walmart+ button
            if (plusButton) {
                plusButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Walmart+ button clicked');
                    showNotification('Redirecting to Walmart+ membership...');
                });
            }

            // Feedback button
            if (feedbackButton) {
                feedbackButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Feedback button clicked');
                    showFeedbackModal();
                });
            }

            // Add hover effects for promo cards
            promoCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-4px)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });

        } catch (error) {
            console.error('Error initializing promo cards:', error);
        }
    }

    // Accessibility Features
    function initializeAccessibility() {
        try {
            // Add ARIA labels to interactive elements
            const sliderBtns = document.querySelectorAll('.slider-btn');
            sliderBtns.forEach((btn, index) => {
                btn.setAttribute('aria-label', index === 0 ? 'Previous slide' : 'Next slide');
            });

            // Add ARIA labels to dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.setAttribute('role', 'button');
                dot.setAttribute('tabindex', '0');
            });

            // Make dots keyboard accessible
            dots.forEach((dot, index) => {
                dot.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // Add skip link functionality
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'sr-only';
            skipLink.addEventListener('focus', function() {
                this.classList.remove('sr-only');
            });
            skipLink.addEventListener('blur', function() {
                this.classList.add('sr-only');
            });
            document.body.insertBefore(skipLink, document.body.firstChild);

            // Add main content ID
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.id = 'main-content';
            }

        } catch (error) {
            console.error('Error initializing accessibility features:', error);
        }
    }

    // Utility Functions
    function showNotification(message) {
        try {
            // Create notification element
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #0071ce;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                font-size: 14px;
                font-weight: 500;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
            `;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 100);

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);

        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }

    function showFeedbackModal() {
        try {
            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            // Create modal content
            const modal = document.createElement('div');
            modal.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;

            modal.innerHTML = `
                <h3 style="margin-bottom: 20px; color: #333; font-size: 24px;">We'd love your feedback!</h3>
                <p style="margin-bottom: 20px; color: #666; line-height: 1.6;">
                    Thank you for visiting our Walmart homepage clone. This is a demonstration project showcasing modern web development techniques.
                </p>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button id="closeFeedback" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                    ">Close</button>
                    <button id="submitFeedback" style="
                        background: #0071ce;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                    ">Thank You!</button>
                </div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Animate in
            setTimeout(() => {
                overlay.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 100);

            // Close handlers
            function closeModal() {
                overlay.style.opacity = '0';
                modal.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            }

            document.getElementById('closeFeedback').addEventListener('click', closeModal);
            document.getElementById('submitFeedback').addEventListener('click', function() {
                showNotification('Thank you for your feedback!');
                closeModal();
            });

            // Close on overlay click
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeModal();
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escapeHandler);
                }
            });

        } catch (error) {
            console.error('Error showing feedback modal:', error);
        }
    }

    // Performance optimization: Lazy loading for images
    function initializeLazyLoading() {
        try {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                observer.unobserve(img);
                            }
                        }
                    });
                });

                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => imageObserver.observe(img));
            }
        } catch (error) {
            console.error('Error initializing lazy loading:', error);
        }
    }

    // Error handling for images
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Image failed to load:', e.target.src);
            e.target.style.display = 'none';
        }
    }, true);

    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate any dynamic dimensions if needed
            console.log('Window resized, adjusting layout if necessary');
        }, 250);
    });

})();
