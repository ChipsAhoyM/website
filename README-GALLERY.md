# Gallery Setup Guide

This gallery system works with pure HTML/JavaScript - no Python or server-side processing required!

## How It Works

1. **Image List**: Images are listed in `assets/gallery-images.js`
2. **Display**: The gallery page automatically loads and displays all images
3. **Sizing**: CSS ensures all images appear in the same square shape (1:1 aspect ratio)
4. **Thumbnails**: Uses pre-generated thumbnails from `assets/gallery-thumb/` folder for fast loading
5. **Fallback**: If thumbnail doesn't exist, automatically uses the full image

## Adding Images

1. **Place your image** in `assets/gallery/` folder (any size/format is fine)

2. **Create a thumbnail** and place it in `assets/gallery-thumb/` folder:
   - Recommended size: 400x400 pixels
   - Use the same filename as the original image
   - Format: JPG, PNG, or any image format

3. **Add to the list** in `assets/gallery-images.js`:
   ```javascript
   { 
       filename: 'YourImage.jpg', 
       title: 'Image Title', 
       location: 'Location Name', 
       description: 'Description text' 
   }
   ```

4. **That's it!** The gallery will automatically display your image with the thumbnail.

## Image Processing

- **Thumbnails required**: Place thumbnails in `assets/gallery-thumb/` folder
- **Consistent sizing**: CSS makes all images appear the same square shape
- **Lazy loading**: Images load as you scroll for better performance
- **Responsive**: Gallery adapts to different screen sizes
- **Smart fallback**: If thumbnail missing, uses full image automatically

## File Structure

```
assets/
├── gallery/              # Full-size images (any size/format)
├── gallery-thumb/        # Thumbnails (same filename as originals)
└── gallery-images.js     # Image list and metadata
```

## Tips

- **Image formats**: Supports JPG, PNG, GIF, WebP
- **Thumbnail size**: Recommended 400x400 pixels for best quality and performance
- **Thumbnail naming**: Use the same filename as the original image
- **File sizes**: For best performance, keep thumbnails under 200KB
- **Naming**: Use descriptive filenames (they appear as titles if no title specified)

