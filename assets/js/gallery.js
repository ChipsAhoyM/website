document.addEventListener("DOMContentLoaded", function() {
    var baseUrl = window.galleryBaseUrl || '';

    function formatDate(dateStr) {
        if (!dateStr) return '';
        var parts = dateStr.split('-');
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        if (parts.length >= 2) {
            return months[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
        }
        return dateStr;
    }
    var fullscreenOverlay = document.getElementById('fullscreen-overlay');
    var fullscreenImage = document.getElementById('fullscreen-image');
    var imageCaption = document.getElementById('image-caption');
    var imageCounter = document.getElementById('image-counter');
    var container = document.getElementById('photographs-container');
    var navPrev = document.getElementById('nav-prev');
    var navNext = document.getElementById('nav-next');
    var closeBtn = document.getElementById('close-btn');
    var currentIndex = 0;

    if (typeof galleryImages === 'undefined' || !Array.isArray(galleryImages) || galleryImages.length === 0) {
        container.innerHTML = '<div class="loading-message">No images found in gallery. Edit assets/gallery-images.js to add images.</div>';
        return;
    }

    container.innerHTML = '';

    function showImage(index) {
        if (index < 0) index = galleryImages.length - 1;
        if (index >= galleryImages.length) index = 0;
        currentIndex = index;

        var image = galleryImages[index];
        fullscreenImage.src = baseUrl + '/assets/gallery/' + image.filename;

        var caption = '';
        if (image.location) caption += '<i class="fas fa-map-marker-alt"></i> ' + image.location;
        if (image.date) caption += (caption ? ' &nbsp;·&nbsp; ' : '') + '<i class="far fa-calendar-alt"></i> ' + formatDate(image.date);
        if (image.description) caption += (caption ? ' — ' : '') + image.description;
        imageCaption.innerHTML = caption;

        imageCounter.textContent = (index + 1) + ' / ' + galleryImages.length;
    }

    function openFullscreen(index) {
        showImage(index);
        fullscreenOverlay.style.display = 'block';
        requestAnimationFrame(function() {
            fullscreenOverlay.classList.add('active');
        });
        document.body.style.overflow = 'hidden';
    }

    function closeFullscreen() {
        fullscreenOverlay.classList.remove('active');
        setTimeout(function() {
            fullscreenOverlay.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }

    galleryImages.forEach(function(image, index) {
        var photographDiv = document.createElement('div');
        photographDiv.className = 'photograph';

        var imgWrapper = document.createElement('div');
        imgWrapper.className = 'image-wrapper';

        var img = document.createElement('img');
        img.src = baseUrl + '/assets/gallery/' + image.filename;
        img.alt = image.title || 'Photograph';
        img.className = 'gallery-image';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.setAttribute('data-index', index);
        imgWrapper.appendChild(img);

        var titleDiv = document.createElement('div');
        titleDiv.className = 'photograph-title';

        if (image.location) {
            var locationP = document.createElement('p');
            locationP.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + image.location;
            titleDiv.appendChild(locationP);
        }

        if (image.date) {
            var dateP = document.createElement('p');
            dateP.className = 'photograph-date';
            dateP.innerHTML = '<i class="far fa-calendar-alt"></i> ' + formatDate(image.date);
            titleDiv.appendChild(dateP);
        }

        if (image.description) {
            var descP = document.createElement('p');
            descP.textContent = image.description;
            titleDiv.appendChild(descP);
        } else if (image.title && !image.location) {
            var titleP = document.createElement('p');
            titleP.textContent = image.title;
            titleDiv.appendChild(titleP);
        }

        photographDiv.appendChild(imgWrapper);
        photographDiv.appendChild(titleDiv);
        container.appendChild(photographDiv);
    });

    container.addEventListener('click', function(e) {
        var img = e.target.closest('.gallery-image');
        if (img) openFullscreen(parseInt(img.getAttribute('data-index'), 10));
    });

    navPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    navNext.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeFullscreen();
    });

    fullscreenOverlay.addEventListener('click', function(e) {
        if (e.target === fullscreenOverlay || e.target.classList.contains('fullscreen-content')) {
            closeFullscreen();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (fullscreenOverlay.style.display === 'block') {
            if (e.key === 'Escape') closeFullscreen();
            else if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
            else if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        }
    });

    var touchStartX = 0;
    fullscreenOverlay.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    fullscreenOverlay.addEventListener('touchend', function(e) {
        var diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            showImage(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
    }, { passive: true });
});
