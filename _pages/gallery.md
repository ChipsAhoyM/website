---
layout: page
permalink: /gallery/
title: gallery
description: 
nav: true
---


<div class="gallery">
    <div class="gallery-description">
        <p>Embark on a visual journey through stunning landscapes and vibrant cityscapes.</p>
    </div>
    <div class="photographs" id="photographs-container">
        <div class="loading-message">Loading gallery...</div>
    </div>
</div>

<div id="fullscreen-overlay">
    <img id="fullscreen-image" src="" alt="Full Image">
</div>

<style>
    .gallery {
        padding: 30px;
    }

    .gallery-description {
        text-align: center;
        margin-bottom: 30px;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 5px;
    }

    .photographs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .photograph {
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        transition: transform 0.3s ease;
    }

    .photograph:hover {
        transform: scale(1.05);
    }

    .image-wrapper {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 5px;
        background: #f0f0f0;
    }

    .photograph img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
        transition: transform 0.3s ease;
        display: block;
    }
    
    .photograph:hover img {
        transform: scale(1.05);
    }

    .loading-message {
        text-align: center;
        padding: 40px;
        color: #888;
        font-style: italic;
        grid-column: 1 / -1;
    }

    .photograph-title {
        margin-top: 10px;
    }

    .photograph-title p {
        margin: 5px 0;
    }

    .photograph-title i {
        margin-right: 5px;
        color: #888;
    }

    #fullscreen-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        text-align: center;
    }

    #fullscreen-image {
        max-width: 90%;
        max-height: 90%;
        margin-top: 5%;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
    }
</style>

<script src="/assets/gallery-images.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        var fullscreenOverlay = document.getElementById('fullscreen-overlay');
        var fullscreenImage = document.getElementById('fullscreen-image');
        var container = document.getElementById('photographs-container');

        // Check if galleryImages is defined
        if (typeof galleryImages === 'undefined' || !Array.isArray(galleryImages) || galleryImages.length === 0) {
            container.innerHTML = '<div class="loading-message">No images found in gallery. Edit assets/gallery-images.js to add images.</div>';
            return;
        }

        container.innerHTML = '';
        
        galleryImages.forEach(function(image) {
            var photographDiv = document.createElement('div');
            photographDiv.className = 'photograph';
            
            var imgWrapper = document.createElement('div');
            imgWrapper.className = 'image-wrapper';
            
            var img = document.createElement('img');
            var imagePath = '/assets/gallery/' + image.filename;
            
            // Get base name without extension
            var baseName = image.filename.replace(/\.[^/.]+$/, '');
            var originalExt = image.filename.split('.').pop();
            
            // Try multiple thumbnail paths (same filename, then common extensions)
            var thumbPaths = [
                '/assets/gallery-thumb/' + image.filename,  // Same filename
                '/assets/gallery-thumb/' + baseName + '.jpg',
                '/assets/gallery-thumb/' + baseName + '.JPG',
                '/assets/gallery-thumb/' + baseName + '.png',
                '/assets/gallery-thumb/' + baseName + '.PNG'
            ];
            
            img.alt = image.title || 'Photograph';
            img.className = 'gallery-image';
            img.loading = 'lazy'; // Lazy loading for better performance
            img.decoding = 'async'; // Async decoding for better performance
            
            // Store full image path for fullscreen view
            img.setAttribute('data-full', imagePath);
            
            // Try thumbnails with different extensions, fallback to full image
            var thumbIndex = 0;
            img.onerror = function() {
                thumbIndex++;
                if (thumbIndex < thumbPaths.length) {
                    // Try next thumbnail path
                    this.src = thumbPaths[thumbIndex];
                } else {
                    // All thumbnails failed, use full image
                    this.src = imagePath;
                    this.onerror = null; // Prevent infinite loop
                }
            };
            
            // Start with first thumbnail path
            img.src = thumbPaths[0];
            
            // Store full image path for fullscreen view
            img.setAttribute('data-full', imagePath);
            
            imgWrapper.appendChild(img);
            
            var titleDiv = document.createElement('div');
            titleDiv.className = 'photograph-title';
            
            if (image.location) {
                var locationP = document.createElement('p');
                locationP.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + image.location;
                titleDiv.appendChild(locationP);
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

        // Attach click handlers using event delegation for better performance
        container.addEventListener('click', function(e) {
            var img = e.target.closest('.gallery-image');
            if (img) {
                var imageSrc = img.getAttribute('data-full');
                fullscreenImage.src = imageSrc;
                fullscreenOverlay.style.display = 'block';
            }
        });

        // Close fullscreen on overlay click
        fullscreenOverlay.addEventListener('click', function() {
            fullscreenOverlay.style.display = 'none';
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && fullscreenOverlay.style.display === 'block') {
                fullscreenOverlay.style.display = 'none';
            }
        });
    });
</script>
