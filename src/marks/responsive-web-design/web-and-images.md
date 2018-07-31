# The web and Images

## Responsive Images

### Use relative size images

The key to handling images is to use **relative widths** to prevent them from accidentally overflowing the container and eventually the viewport, so it is better to pre-set the width of all image tags to **100%**. In fact it is recommended to do that on **img**, **video**, **embed** and **object** elements:
```css
img, video,
embed, object {
  max-width:100%;
}
```
and in case you want to have multiple images in one row , just use **relative widths**.

E.G. Let's say you have two images and want each one to takes up half the viewport with a 10px margin between them `calc()` gives us the ability to mix absolute and relative values:
```css
img {
  max-width: calc((100% - 10px)/2);
  margin-right: 10px;
}
img:last-of-type {
  margin-right: 10px;
}
```

### Using srcset and sizes attributes

1- The `srcset` and `size` attribute gives you the ability to provide multiple images that will be served by the browser depending on viewport width/hight or device resolution within the img element.

To use the `srcset` provide a comma separated string with:
* The path to the image file
* A space
* The pixel density with **nx** or width with **w** of the image

`srcset` with pixel density:
```html
<img src="[filename].[ext]" 
     srcset="[filename]-2x.[ext] 2x, 
             [filename]-3x.[ext] 3x, 
             [filename]-4x.[ext] 4x">
```
The **nx** denotes the pixel density (DPR), where **n** is an integer.

**Note**: the image in the `src` tag is assumed to be **1x** and also works as a fallback incase the browser doesn't support `srcset`.

`srcset` with width:
```html
<img src="[filename].[ext]" 
     srcset="[filename]-[width-1].[ext] [width-1]w, 
             [filename]-[width-2].[ext] [width-2]w, 
             [filename]-[width-3].[ext] [width-3]w">
```

**Note**: it's a good practice to include the width and pixel density of the image in image filename.

2- The `sizes` attribute only works in conjuction with the width value of the `srcset` and it allows us to set some **media conditions** in which the right image size will be used.
```html
<img src="one.png"
     srcset="[filename]-[width-1].[ext] [width-1]w, 
             [filename]-[width-2].[ext] [width-2]w, 
             [filename]-[width-3].[ext] [width-3]w"

     sizes="[media condition] [width-1],
            [media condition] [width-2],
            <optional default image width>">
```

**Note**: you can specify absolute (px, em, ..), relative (vw) width values or both with `calc()`, but not percentages.

Putting it all together:
```html
<img srcset="myImage-320w.jpg 320w,
             myImage-480w.jpg 480w,
             myImage-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="myImage-800w.jpg" alt="My image description">
```

### Art direction - The picture element

> The HTML **picture** element serves as a container for zero or more **source** elements and one img element to provide versions of an image for different display device scenarios.

```html
<picture>
  <source media="(min-width: 800px)" 
	  srcset="myImage.jpg, myImage-2x.jpg 2x">
	
  <source media="(min-width: 450px)" 
	  srcset="myImage-small.jpg, myImage-small-2x.jpg 2x">
	
  <img src="myImage-fallback.jpg" 
       srcset="myImage-fallback-2x.jpg 2x" 
       alt="My image description">
</picture>
```
Looking at the media condition in the `media` attribute and the pixel density in the `srcset`, the **picture** element will choose the right image to display, and in case the picture element is not supported or none of the media conditions returned true.

**Note**: The `alt` attribute and css manipulation should be done through the **img** element and not the **picture** or **source** elements.

The **picture** element can also be used to serve different image types depending on the browser support. So for example if you want to serve **[WebP](https://developers.google.com/speed/webp/?csw=1)** format, but you want to set a fallback for browsers that don't support it:
  
```html
<picture>
	<source srcset="myImage.webp" type="image/webp">
	<img src="myImage.jpg" alt="My image description">
</picture>
```
Of course this can be mixed with media conditions, image widths or pixel density.

**Note**: If you want to know which image has been chosen by the browser with javascript use `image.currentSrc`. Of course if you want to a fallback for older browsers just use `image.currentSrc || image.src`, this case you'll handle all cases.

## Accessibility

Make sure to always provide the img element with meaningful descriptions via the `alt` attribute; these help make your site more accessible by giving context to screen readers and other assistive technologies.

* `alt` attributes should be descriptive for important images.

* `alt` attributes should be empty for images that are just decorations.

* `alt` attributes should be set on every image.

## Optimizing Images

### Is it necessary?

> An optimized resource is a resource not sent.

this rule applies to images too.

> That said, a well-placed image can also communicate more information than a thousand words.

### Is there a (better) alternative?

You should consider if there is an alternative technology that could deliver the desired results:

* **CSS effects** (animations, gradients, shadows, ...etc.) can be used to produce resolution-independent assets that always look sharp at every resolution and zoom level, often at a fraction of the bytes required by an image file.
* **web fonts** can be used instead of encoding text in images, which enables the use of beautiful typefaces while preserving the ability to select, search, and resize text - a significant improvement in usability.

**Note**: 
> Although CSS effects are in some cases a great alternative to images, be aware that there is a processing and rendering cost to using them (CSS effects) especially on mobile, use them sparingly. 

### Raster vs Vector Images

If that image resource is necessary to your design, then, the next thing to do is choose the appropriate format and it comes down to two choices **Raster Graphics** or **Vector Graphics**.

**Vector**:
- **How it works**: uses lines, points, and polygons to represent an image.
- **Is it zoom/resolution independent?**: Yes! Vector Graphics deliver sharp results at every resolution and zoom setting, which makes     them an ideal format for high-resolution screens and assets that need to be displayed at varying sizes.
- **Ideal for**: vector formats are ideally suited for images that consist of simple geometric shapes (for example, logos, text, icons, and so on).

**Raster**:
- **How it works**: Raster Graphics represent an image by encoding the individual values of each pixel within a rectangular grid.
- **Is it zoom/resolution independent?**: No. When you scale up a raster image you'll see jagged and blurry graphics. *As a result, you may need to save multiple versions of a raster image at various resolutions to deliver the optimal experience to your users.*
- **Ideal for**: Photographic images or images with complicated scenes.

Also **Vector** images have small file sizes compared to raster images.

### Size and Resolution?

High resolution screens require high resolution images, but that's not the case for vector images since they are zoom/resolution independent. On the other hand raster images encode image data on a per-pixel basis, that's why the larger the number of pixels, the larger the filesize of a raster image.

That said choose vector images over raster images whenever possible as they are resolution independent and always deliver sharp results, and if a raster image is required, deliver and optimize multiple variants of each image with the help of srcset and picture.

### Selecting the right format

* **Do you need animation?** If so, GIF is the only universal choice.
  - GIF is the right answer only when animation is required.
* **Do you need to preserve fine detail with highest resolution?** Use PNG.
  - PNG produce the highest quality image, but at a cost of significantly higher filesize than other formats. Use judiciously.
  - If the image asset contains imagery composed of geometric shapes, consider converting it to a vector (SVG) format!
  - If the image asset contains text, stop and reconsider. Text in images is not selectable, searchable, or "zoomable". If you need to convey a custom look (for branding or other reasons), use a web font instead.
* **Are you optimizing a photo, screenshot, or a similar image asset?** Use JPEG.
  - Try several JPEG quality levels to find the best quality vs. filesize tradeoff for your asset.
  
### Delivering scaled image assets

One of the simplest and most effective image optimization techniques is to ensure that we are not shipping any more pixels than needed to display the asset at its intended size in the browser. So, you should ensure that the number of unnecessary pixels is minimal, and that your large assets in particular are delivered as close as possible to their display size.

And here is why

| Screen resolution	| Natural size | Display size (CSS px) | Unnecessary pixels |
|-------------------|--------------|-----------------------|--------------------|
| 1x	| 110 x 110	  | 100 x 100	| 110 x 110 - 100 x 100 = 2100 |
| 1x	| 410 x 410	  | 400 x 400	| 410 x 410 - 400 x 400 = 8100 |
| 1x	| 810 x 810	  | 800 x 800	| 810 x 810 - 800 x 800 = 16100 |
| 2x	| 220 x 220	  | 100 x 100	| 220 x 220 - (2 x 100) x (2 x 100) = 8400 |
| 2x	| 820 x 820	  | 400 x 400	| 820 x 820 - (2 x 400) x (2 x 400) = 32400 |
| 2x	| 1620 x 1620	| 800 x 800 | 1620 x 1620 - (2 x 800) x (2 x 800) = 64400 |

Although the **natural size** is only 10px higher than the **display size** the amount of unecessary pixels rises rapidly as the display dimensions of the image increase.

### Inline vs External images

You can reduce the number of file requests by inlining images as **svg** or **data uri** (of course not all images can be svg, unfortunately) and knowing the right time to take advantage of this technique over external images (and vice-versa) can be beneficial to your website's performance.

**Data URI** is commonly used to embed images and web fonts onto html to reduce network requests and it works by embeding the base64-encoded data directly into the HTML or CSS, using the following format:
```
data:[MIME-type][;charset=encoding][;base64],[data]
```

and it works like this in HTML:

```html
<img alt="" src="data:[MIME-type][;charset=encoding][;base64],[data]" />
```

& in css like this

```css
.some-elem {
  background-image: url(data:[MIME-type][;charset=encoding][;base64],[data]);
}
```

**SVG** can also be embeded inline, but only in HTML. To embed svg in a stylesheet you need to convert it to data uri.


Now to go back to the question, **Should you use inline or external?**
* Are re-using the image? It'd be better if it's external. That way you'll be able to cache it and not reload it everytime a user vists a new page.
* Are you intending to use responsive images? It makes more sense to use external, cause inlining images can limit your responsive options.

**Note**: Always make sure to test both inline and external images to see which one is best suited for your case.

## Disclaimer

This is only used as personal notes following the Udacity Mobile Web Specialist and other articles that will be listed below. If you find a mistake please be kind to point it out :).

## Useful links

* Udacity's **[Responsive Images](https://www.udacity.com/course/responsive-images--ud882)**
* Google's **[Responsive Images](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images)**
* **[Image Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)**
* **[How To Make Your Websites Faster On Mobile Devices](https://www.smashingmagazine.com/2013/04/build-fast-loading-mobile-website/)**
* **[Responsive Images - The srcset and sizes Attributes](https://bitsofco.de/the-srcset-and-sizes-attributes/)**
* **[srcset and size](https://ericportis.com/posts/2014/srcset-sizes/)**
* MDN's **[Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)**
* **[Responsive Images: Use Cases and Documented Code Snippets to Get You Started](https://dev.opera.com/articles/responsive-images/)**
* **[Formatting your images for display on the web](https://support.squarespace.com/hc/en-us/articles/206542517-Formatting-your-images-for-display-on-the-web#toc-glossary)**
* **[High DPI Images for Variable Pixel Densities](https://www.html5rocks.com/en/mobile/high-dpi/)**

### Other related subjects
* **[Smart Auto Cropping of Images](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2018/Smart-Auto-Cropping-of-Images.html)**