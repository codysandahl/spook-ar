// video controls for the parent marker
// NOTE: must have the following attributes: marker-video-controls="video: #your-video-asset" emitevents="true" cursor="rayOrigin: mouse"
AFRAME.registerComponent('marker-video-controls', {
    schema: {
        video: {type: 'selector'},
    },
    init: function() {
        console.log("[marker-video-controls] init => "+this.data.video);
        var data = this.data;
        var el = this.el;
        // get the video element
        var video = data.video;
        if (video == null) {
            console.log("[marker-video-controls] ERROR: video not found");
            return;
        }
        console.log(video);
        var autoplay = video.hasAttribute("autoplay");
        // get the a-video child element
        var aVideo = el.querySelector("a-video");
        if (aVideo == null) {
            console.log("[marker-video-controls] ERROR: a-video child not found");
            return;
        }

        // click event on the marker
        el.addEventListener("click", function(event) {
            const intersectedElement = event && event.detail && event.detail.intersectedEl;
            console.log("[marker-video-controls] click event");
            if (intersectedElement == null) {
                return;
            }
            //console.log(intersectedElement.outerHTML);
            if (intersectedElement === aVideo || intersectedElement === el) {
                console.log("[marker-video-controls] video clicked");
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });

        // marker found => autoplay if needed
        el.addEventListener("markerFound", function(event) {
            console.log("[marker-video-controls] marker found");
            if (autoplay) {
                video.play();
            }
        });

        // marker lost => pause the video
        el.addEventListener("markerLost", function(event) {
            console.log("[marker-video-controls] marker lost");
            video.pause();
        });
    }
});
