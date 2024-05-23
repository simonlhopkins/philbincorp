import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const kFramesPerSecond = 6;
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
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);

  useEffect(() => {
    const constraints = {
      audio: false,
      video: { width: 1280, height: 720 },
    };
    const video = videoRef.current!;

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
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
  }, []);

  useEffect(() => {
    const video = videoRef.current!;

    const canvas = canvasRef.current!;
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d")!;
    const drawFrame = () => {
      if (video.readyState == video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Apply the 90s filter to the image data
        imageData = apply90sFilter(imageData);

        // Put the modified image data back to the canvas
        ctx.putImageData(imageData, 0, 0);
      }
    };
    let intervalID: number | undefined;
    if (isLoaded) {
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
      new user
      <video ref={videoRef}></video>
      {!isLoaded && <p>loading</p>}
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
        <img src={photoURLs[photoURLs.length - 1]}></img>
      )}
    </StyledNewUserPage>
  );
}

const StyledNewUserPage = styled.div`
  video {
    display: none;
  }

  canvas,
  img {
    transform: scaleX(-1);
    aspect-ratio: 16/9;
    width: 500px;
    max-width: 100%;
  }
`;

export default NewUserPage;
