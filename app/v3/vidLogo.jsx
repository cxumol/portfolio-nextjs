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

      // lower playbackConst = faster playback
      const playbackConst = 800;
      let videoDuration;
      let lastScrollPosition = -1;
      let animatedKilled = false;

      const animate = () => {
        window.requestAnimationFrame(scrollPlay);
      };

      video.addEventListener("loadedmetadata", () => {
        videoDuration = video.duration;
      });

      const scrollPlay = () => {
        if (animatedKilled) return;
        if (lastScrollPosition != window.scrollY) {
          window.removeEventListener("scroll", animate);
          const frameNumber = (window.scrollY / playbackConst) % videoDuration;
          if (frameNumber >= 0) videoRef.current.currentTime = frameNumber;
          lastScrollPosition = window.scrollY;
          animate();
        } else {
          window.addEventListener("scroll", animate);
        }
      };
      const debounceScrollPlay = () => {
        // Clear the previous timeout to prevent immediate execution
        clearTimeout(debounceTimeout);
        // Set a new timeout to call scrollPlay after 100ms of inactivity
        debounceTimeout = setTimeout(scrollPlay, 100);
      };

      animate();

      return () => {
        window.removeEventListener("scroll", animate);
        animatedKilled = true;
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
          maxWidth: "min(480px, 80vw)",
          maxHeight: "min(480px, 80vh)",
          margin: "0 auto",
          display: shouldUseImage ? "none" : "block",
        }}
      />
      {shouldUseImage && (
        <Image
          src={imgUrl}
          alt="Oops! Steve Jobs prevents you from animation"
          quality={100}
          width={480}
          height={480}
          style={{
            maxWidth: "min(480px, 80vw)",
            maxHeight: "min(480px, 80vh)",
            margin: "0 auto",
          }}
        />
      )}
    </>
  );
};

export default VideoScroll;
