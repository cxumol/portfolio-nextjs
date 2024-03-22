"use client";
/* onScoroll newVidTime = (video.currentTime + delta * 0.01) % videoDuration */
import React, { useEffect, useRef } from "react";
import { isSafari, isIOS } from "react-device-detect";
import Image from "next/image";

const VideoScroll = ({ vidUrl, imgUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Create a source element and add it to the video
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
        // 将滚动的位移转换为视频的时间，并确保其始终保持在视频长度的范围内
        let newVidTime = (video.currentTime + delta * 0.01) % videoDuration;
        // 对负数进行特殊处理，使其变为正数
        if (newVidTime < 0) {
          newVidTime += videoDuration;
        }
        console.log(newVidTime);
        video.currentTime = newVidTime;
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", updateFrame);

    return () => {
      // Remove scroll event listener
      window.removeEventListener("scroll", updateFrame);
    };
  }, []);

  if (isSafari || isIOS) {
    // 在iOS/Safari中显示png图片
    return (
      <Image
        src={imgUrl}
        quality={100}
        alt="Animation Unavailable due to Steve Jobs"
      />
    );
  } else {
    return <video ref={videoRef} loop muted playsInline />;
  }
};

export default VideoScroll;
