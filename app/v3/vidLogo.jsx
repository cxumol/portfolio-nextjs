"use client";
import React, { useEffect, useRef } from "react";
import { isSafari, isIOS } from "react-device-detect";
import Image from "next/image";

const VideoScroll = ({ vidUrl, imgUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const source = document.createElement("source");
    source.src = vidUrl;
    source.type = "video/webm";
    video.appendChild(source);

    let lastScrollY = window.scrollY;
    let videoDuration;

    video.addEventListener("loadedmetadata", () => {
      videoDuration = video.duration;
      console.log(video);
    });

    const updateFrame = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;

      if (video && videoDuration) {
        let newVidTime = (video.currentTime + delta * 0.01) % videoDuration;
        // if (newVidTime < 0) {
        //   newVidTime += videoDuration;
        // }
        video.currentTime = newVidTime;
      }
    };

    window.addEventListener("scroll", updateFrame, { passive: true });

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(entry.isIntersecting ? entry.intersectionRatio : "no");
        if (entry.isIntersecting) {
          video.currentTime = 0;
          // console.log("reset currentTime");
        }
      });
    });

    // Start observing the video element
    observer.observe(video);

    return () => {
      window.removeEventListener("scroll", updateFrame);
      // Stop observing the video element
      observer.unobserve(video);
    };
  }, []);

  if (isSafari || isIOS) {
    return (
      <Image src={imgUrl} alt="Opps! Steve Jobs prevent you from animation" />
    );
  } else {
    return <video ref={videoRef} loop muted playsInline />;
  }
};

export default VideoScroll;
