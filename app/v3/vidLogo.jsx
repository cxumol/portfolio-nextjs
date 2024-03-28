"use client";
import React, { useEffect, useRef, useState } from "react";
import { isSafari, isIOS, osVersion, isMacOs } from "react-device-detect";
import Image from "next/image";

const VideoScroll = ({ vidUrl, imgUrl, movUrl }) => {
  const videoRef = useRef(null);
  const [shouldUseImage, setShouldUseImage] = useState(false);

  useEffect(() => {
    // Determine if the fallback image should be used based on the browser
    const mediaCapatible = !!(
      navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
    );
    const osVer = osVersion.split(".");
    const noVid =
      (isIOS && osVer[0] < 13) ||
      (isSafari && !mediaCapatible) ||
      (isMacOs && Number(`${osVer[0]}.${osVer[1]}`) < 10.15);
    setShouldUseImage(noVid);

    // Proceed with video setup only if the video is to be used
    if (!noVid) {
      const video = videoRef.current;
      const source = document.createElement("source");
      source.src = vidUrl;
      source.type = "video/webm";
      // const appleHEVCAlpha = isIOS || isSafari;
      const appleHEVCAlpha = isIOS || isSafari;
      if (appleHEVCAlpha) {
        source.src = movUrl;
        source.type = "video/mp4; codecs=hvc1";
        // source.type = window.undefined;
        // delete source.type;

        // video.src =  movUrl;
      }
      video.appendChild(source);
      const iosFix = isIOS;
      if (iosFix) video.autoplay = "";

      // lower playbackConst = faster playback
      const playbackConst = 800;
      let videoDuration = 0;
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
      // no need to debounce, kept for reference
      const debounceScrollPlay = () => {
        // Clear the previous timeout to prevent immediate execution
        clearTimeout(debounceTimeout);
        // Set a new timeout to call scrollPlay after 100ms of inactivity
        debounceTimeout = setTimeout(scrollPlay, 60);
      };

      animate();

      return () => {
        window.removeEventListener("scroll", animate);
        animatedKilled = true;
      };
    }
  }, [vidUrl]);

  return (
    <>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        poster={imgUrl}
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
