"use client";
import React, { useEffect, useRef, useState } from "react";
import { isSafari, isIOS } from "react-device-detect";
import Image from "next/image";

const VideoScroll = ({ vidUrl, imgUrl }) => {
  const videoRef = useRef(null);
  const [shouldUseImage, setShouldUseImage] = useState(false);

  useEffect(() => {
    // Determine if the fallback image should be used based on the browser
    setShouldUseImage(isSafari || isIOS);

    // Proceed with video setup only if the video is to be used
    if (!(isSafari || isIOS)) {
      const video = videoRef.current;
      const source = document.createElement("source");
      source.src = vidUrl;
      source.type = "video/webm";
      video.appendChild(source);

      let lastScrollY = window.scrollY;
      let videoDuration;

      video.addEventListener("loadedmetadata", () => {
        videoDuration = video.duration;
      });

      const updateFrame = () => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;

        if (video && videoDuration) {
          let newVidTime = (video.currentTime + delta * 0.01) % videoDuration;
          if (newVidTime < 0) {
            newVidTime += videoDuration;
          }
          video.currentTime = newVidTime;
        }
      };

      window.addEventListener("scroll", updateFrame, { passive: true });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.currentTime = 0;
          }
        });
      });

      observer.observe(video);

      return () => {
        window.removeEventListener("scroll", updateFrame);
        observer.unobserve(video);
      };
    }
  }, [vidUrl, shouldUseImage]);

  return (
    <>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          display: shouldUseImage ? "none" : "block",
        }}
      />
      {shouldUseImage && (
        <Image
          src={imgUrl}
          alt="Oops! Steve Jobs prevents you from animation"
          width={480}
          height={360} // Specify the dimensions of the image to prevent layout shift
          style={{ maxWidth: "480px", margin: "0 auto" }}
        />
      )}
    </>
  );
};

export default VideoScroll;
