function hideInputText() {
    document.getElementById("enter-room").style.display = 'none';
}
function displayMeeting() {
    document.getElementById("meeting").style.display = 'block';
}
function joinRoom() {
    var txtRoom = document.getElementById("room-name").value;
    let room = String(txtRoom);
    console.log(room);
    hideInputText();
    displayMeeting();

    let handleFail = function (err) {
        console.log("Error : ", err);
    };


    let remoteContainer = document.getElementById("remote-container");
    let canvasContainer = document.getElementById("canvas-container");

    function addVideoStream(streamId) {
        let streamDiv = document.createElement("div");
        streamDiv.id = streamId;
        streamDiv.style.transform = "rotateY(180deg)";
        remoteContainer.appendChild(streamDiv);
    }

    function removeVideoStream(evt) {
        let stream = evt.stream;
        stream.stop();
        let remDiv = document.getElementById(stream.getId());
        remDiv.parentNode.removeChild(remDiv);
        console.log("Remote stream is removed " + stream.getId());
    }

    function addCanvas(streamId) {
        let canvas = document.createElement("canvas");
        canvas.id = 'canvas' + streamId;
        canvasContainer.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        let video = document.getElementById(`video${streamId}`);

        video.addEventListener('loadedmetadata', function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });

        video.addEventListener('play', function () {
            var $this = this;
            (function loop() {
                if (!$this.paused && !$this.ended) {
                    ctx.drawImage($this, 0, 0);
                    setTimeout(loop, 1000 / 30);
                }
            })();
        }, 0);
    }

    let client = AgoraRTC.createClient({
        mode: 'rtc',
        codec: "vp8"
    });

    client.init('02f2bfd98e1d41e0a78fcc2b303ab227', () => console.log("AgoraRTC client initialized"), handleFail);

    client.join(null, room, null, (uid) => {

        let localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: true,
            video: true,
            screen: false
        });
        localStream.init(() => {
            localStream.play('me');
            client.publish(localStream, handleFail);

        }, handleFail);

    }, handleFail);
    client.on('stream-added', function (evt) {
        client.subscribe(evt.stream, handleFail);
    });
    client.on('stream-subscribed', function (evt) {
        let stream = evt.stream;
        let streamId = String(stream.getId());
        addVideoStream(streamId);
        stream.play(streamId);
    });
    client.on('stream-removed', removeVideoStream);
    client.on('peer-leave', removeVideoStream);
}



