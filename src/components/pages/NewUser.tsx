import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const kFramesPerSecond = 6;
const kVideoWidth = 640 / 4;
const apply90sFilter = (imageData: ImageData) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    // Reduce the number of colors
    data[i] = Math.floor(data[i] / 32) * 32; // Red
    data[i + 1] = Math.floor(data[i + 1] / 32) * 32; // Green
    data[i + 2] = Math.floor(data[i + 2] / 32) * 32; // Blue

    // Add some noise
    const noise = (Math.random() - 0.5) * 32;
    data[i] = data[i] + noise;
    data[i + 1] = data[i + 1] + noise;
    data[i + 2] = data[i + 2] + noise;
  }
  return imageData;
};
function NewUserPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);

  useEffect(() => {
    const constraints = {
      audio: false,
      video: true,
      // video: { width: 1280, height: 720 },
    };
    const video = videoRef.current!;
    let mediaStream: MediaStream | null;
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((_mediaStream) => {
        mediaStream = _mediaStream;
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          video.play();
          setIsLoaded(true);
        };
      })
      .catch((err) => {
        // always check for errors at the end.
        console.error(`${err.name}: ${err.message}`);
      });

    return () => {
      // video.pause();

      if (mediaStream) {
        console.log("stop");
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      video.src = "";
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current!;

    const canvas = canvasRef.current!;

    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.translate(canvas.width, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = "low";

    const drawFrame = () => {
      if (video.readyState == video.HAVE_ENOUGH_DATA) {
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Apply the 90s filter to the image data
        imageData = apply90sFilter(imageData);

        // Put the modified image data back to the canvas
        ctx.putImageData(imageData, 0, 0);
      }
    };
    let intervalID: number | undefined;
    if (isLoaded) {
      const newAspectRatio = video.videoWidth / video.videoHeight;
      setAspectRatio(newAspectRatio);
      canvas.width = kVideoWidth;
      canvas.height = kVideoWidth / newAspectRatio;
      canvas.style.aspectRatio = newAspectRatio.toString();
      intervalID = setInterval(drawFrame, (1 / kFramesPerSecond) * 1000);
    }
    return () => {
      if (intervalID != undefined) {
        clearInterval(intervalID);
      }
    };
  }, [isLoaded]);

  return (
    <StyledNewUserPage>
      <video autoPlay playsInline ref={videoRef}></video>

      <StyledCanvasContainer $aspectRatio={aspectRatio}>
        {!isLoaded && <img src="/gifs/loading.gif"></img>}

        <canvas ref={canvasRef}></canvas>
        {isLoaded && (
          <button
            onClick={() => {
              const daraURL = canvasRef.current!.toDataURL("image/jpeg");
              setPhotoURLs((prev) => [...prev, daraURL]);
            }}
          >
            take jpeg
          </button>
        )}
        {/* {photoURLs.map((url) => (
        <img src={url}></img>
      ))} */}
        {photoURLs.length > 0 && (
          <div id="snapshotContainer">
            <div>
              <img src="/gifs/weedBorder.gif"></img>
              <img id="snapshot" src={photoURLs[photoURLs.length - 1]}></img>
              <img
                src="/gifs/money.gif"
                style={{
                  left: "0",
                  bottom: "0",
                  width: "60px",
                }}
                className="decoration"
              ></img>
              <img
                src="/gifs/skull.gif"
                style={{
                  right: "0",
                  top: "0",
                  width: "60px",
                }}
                className="decoration"
              ></img>
              <img src="/gifs/akadotbanner.gif"></img>
            </div>
          </div>
        )}
      </StyledCanvasContainer>
    </StyledNewUserPage>
  );
}

const StyledCanvasContainer = styled.div<{ $aspectRatio: number }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  img {
    max-width: 100%;
  }
  #snapshotContainer {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 40%;
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }
  }
  .decoration {
    position: absolute;
  }
  #snapshot {
    width: 100%;
    height: auto;
    display: block;
  }
  canvas {
    /* transform: scaleX(-1); */
    width: 700px;
    max-width: 100%;
    height: auto;
  }
`;

const StyledNewUserPage = styled.div`
  video {
    display: none;
  }
  button {
    font-size: 2rem;
    margin: 10px;
    position: absolute;
    bottom: 0;
  }
`;

export default NewUserPage;
