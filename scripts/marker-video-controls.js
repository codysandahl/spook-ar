// video controls for the parent marker
// NOTE: must have the following attributes: marker-video-controls="video: #your-video-asset" emitevents="true" cursor="rayOrigin: mouse"
AFRAME.registerComponent('marker-video-controls', {
    schema: {
        video: {type: 'selector'},
        autoplay: {type: 'boolean', default: false}
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
        // get the autoplay attribute
        //var autoplay = video.hasAttribute("autoplay");
        var autoplay = data.autoplay;
        console.log("Autoplay: "+autoplay);
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
            //console.log(intersectedElement.outerHTML+" || Visible = "+el.getAttribute("visible"));
            // check if this event is for this video AND the marker is visible
            if ((intersectedElement === aVideo || intersectedElement === el) && el.getAttribute("visible") !== false) {
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
                console.log("[marker-video-controls] autoplay");
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
