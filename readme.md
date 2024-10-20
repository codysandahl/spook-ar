# SpookAR

SpookAR is an augmented reality web app that detects barcodes and plays a short video on top of the barcode. This is designed to be a family-friendly add-on to your Halloween decorations.

This app depends on [AR.js](https://ar-js-org.github.io/AR.js-Docs/).

## User Flow

1. User starts at ```index.html``` with a splash screen
2. User clicks ```Start``` button, which takes them to the AR experience on ```spook-ar.html```
3. User **MUST** approve camera access for this experience to function
4. When the camera spots one of the pre-defined barcode markers, it will play the associated experience
    - **Example**: barcode #7 will trigger a short video of a Dilophosaurus roaring
5. User can click the ```Exit``` button to return to the splash screen on ```index.html```

## Adding New Markers/Videos

1. Upload a short video as an MP4 to the ```assets``` folder.
    - **IMPORTANT**: Videos MUST be stored in the ```assets``` folder, not loaded externally via YouTube, etc.
2. Load the asset in ```spook-ar.html``` inside of ```<a-assets>``` with the format below. **All of these attributes are required**. Change ```id="dilophosaurus"``` to another unique ID.

```html
<video id="dilophosaurus" crossOrigin="anonymous" type="video/mp4" loop="true" src="assets/dilophosaurus.mp4" playsinline webkit-playsinline controls></video>
```

3. Choose an unused marker number and tell AR.js to look for it. Use the format below. Change ```#dilophosaurus``` to the ID you assigned to your asset above. Change ```value='7'``` to the barcode number you selected.

```html
<!-- dilophosaurus = #7 -->
<a-marker type='barcode' value='7' marker-video-controls="video: #dilophosaurus; autoplay:true" emitevents="true" cursor="rayOrigin: mouse">
    <a-video src="#dilophosaurus" width="4" height="2.25" position="0 0.5 0" rotation="-90 0 0"></a-video>
</a-marker>
```

## Barcodes

AR.js supports a very specific set of barcodes or markers. These pre-generated barcodes can be found at https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection.

There are different sets of barcodes. This app uses **4x4_BCH_13_5_5** barcodes by default. See References and Notes for other options. You must stick to **a single barcode type** within each page. You cannot, for example, mix 3x3 barcodes and 4x4 barcodes. Nor can you mix 4x4_BCH_13_9_3 barcodes with 4x4_BCH_13_5_5 barcodes.

To find the correct pre-generated barcode, combine the barcode type with the value.

**Example**
- Barcode Type: 4x4_BCH_13_5_5
- Value: 7
- URL: https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/blob/master/4x4_bch_13_5_5/7.png

Print the correct barcodes for your app and place them as physical scanning targets.

## Reference and Notes

|Reference Name|Notes|
|--------------|-----|
|AR.js Marker Documentation|https://ar-js-org.github.io/AR.js-Docs/marker-based/|
|AR.js Marker Interaction|NOTE: when using ar.js you have to add a cursorOrigin property on the clickable items instead of the camera|
|AR.js Matrix Modes|3x3, 3x3_HAMMING63, 3x3_PARITY65, 4x4, 4x4_BCH_13_9_3, **4x4_BCH_13_5_5**|
|Download Matrix Markers|https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection|
|A-Frame Video Documentation|https://aframe.io/docs/1.6.0/primitives/a-video.html#main|
