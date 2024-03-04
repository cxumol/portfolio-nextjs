"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { isSafari, isIOS } from "react-device-detect";
import Image from "next/image";

const VideoScroll = ({ vidUrl, imgUrl }) => {
  const videoRef = useRef(null);
  const videoDuration = useRef(null);
  const {
    ref: inViewRef,
    inView,
    entry,
  } = useInView({
    threshold: 0,
    rootMargin: "50% 0px",
  });

  const ref = useCallback(
    (node) => {
      videoRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    // Create a source element and add it to the video
    const source = document.createElement("source");
    source.src = vidUrl;
    source.type = "video/webm";
    video.appendChild(source);

    video.addEventListener("loadedmetadata", () => {
      videoDuration.current = video.duration;
    });

    const updateFrame = () => {
      // console.log(video ? 1 : 0, entry ? 1 : 0, videoDuration.current ? 1 : 0);
      if (video && inView && videoDuration.current) {
        const rect = entry.boundingClientRect;
        const maxOffset = window.innerHeight - rect.height;
        const offset = rect.top - maxOffset;
        const progress = offset / maxOffset;
        console.log(
          "maxOffset",
          maxOffset,
          "offset",
          offset,
          "progress",
          progress,
        );
        // 计算播放速度
        const playSpeed = 6 / videoDuration.current;

        if (progress >= 0 && progress <= 1) {
          video.currentTime =
            (progress * videoDuration.current * playSpeed) %
            videoDuration.current;
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", updateFrame);

    return () => {
      // Remove scroll event listener
      window.removeEventListener("scroll", updateFrame);
    };
  }, [entry]);

  if (isSafari || isIOS) {
    // 在iOS/Safari中显示png图片
    return <Image src={imgUrl} alt="Animation Unavailable due to Steve Jobs" />;
  } else {
    return <video ref={ref} loop muted playsInline />;
  }
};

export default VideoScroll;
