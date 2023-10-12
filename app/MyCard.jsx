"use client";
import "./MyCard.css";
import Markdown from "react-markdown";
import { useRef, useEffect, useState } from "react";

function buttonGroups(buttons) {
  // console.log(buttons);
  return buttons.map((btn) => (
    <div className="link-item" key={btn.label}>
      <a
        className="border border-solid border-gray-300 btn glass"
        href={btn.link}
      >
        {btn.label}
      </a>
      <div className="link-comments">
        <Markdown>{btn.comment}</Markdown>
      </div>
    </div>
  ));
}
function badgeGroups(keywords) {
  // console.log(buttons);
  return keywords.map((kw) => (
    <div
      className="badge badge-primary badge-outline m-1"
      key={`${kw}-${Date.now()}`}
    >
      {kw}
    </div>
  ));
}

// https://github.com/zygisS22/intersectionObserverApi/blob/master/src/IO-Api-hook.js
const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  // let [ratio, setRatio] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    // setRatio(entries[0].intersectionRatio);
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  // return [containerRef, ratio];
  return [containerRef, isVisible];
};

export default function MyCard({ data }) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  return (
    <div
      ref={containerRef}
      className="proj pl-2 py-32 bg-cover  m-4
      h-full
      //h-[80-vh]
      rounded-lg 
       md:py-24 sm:py-12
      lg:h-full lg:py-64
      bg-scroll bg-transparent
      border border-solid ring-2 ring-neutral-300"
      style={{ backgroundImage: `url(${data.image})` }} // , backgroundSize: "100%"
      data-theme="light"
    >
      <div
        className={`Card-read ${isVisible ? "slideLeft" : "invisible"}
        z-10 p-4 w-3/4 
      rounded-md border
      shadow backdrop-blur 
      text-black prose lg:prose-lg
      `}
      >
        <h2 className="text-inherit">{data.title}</h2>
        {badgeGroups(data.keywords)}
        {/* <p> */}
        <Markdown>{data.content}</Markdown>
        {/* </p> */}
        <div className={"link-and-explain"}>{buttonGroups(data.buttons)}</div>
      </div>
    </div>
  );
}
