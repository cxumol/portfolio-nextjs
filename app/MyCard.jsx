"use client";
import "./MyCard.css";
import Markdown from "react-markdown";
import { useRef, useEffect, useState } from "react";

const bgClearAmber =
  "bg-gradient-to-r from-amber-200/80 to-amber-50/10 rounded-md";
const bgClearCyan =
  "bg-gradient-to-r from-cyan-200/80 to-cyan-50/10 rounded-md";
const bgClearGray =
  "bg-gradient-to-r from-gray-200/80 to-gray-50/10 rounded-md";
const bgClear = bgClearGray;

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
      <Markdown className={bgClear}>{btn.comment}</Markdown>
    </div>
  ));
}
function badgeGroups(keywords) {
  // console.log(buttons);
  return keywords.map((kw) => (
    <div
      className="badge badge-primary badge-outline m-1 bg-lime-50/60 "
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
      className="proj sm:pl-2 py-8 bg-cover  m-4
      h-full
      //h-[80-vh]
      rounded-lg 
      md:py-24 sm:py-12
      lg:h-full lg:py-64
      bg-scroll bg-transparent
      border border-solid ring-2 ring-neutral-300
      bg-no-repeat bg-center sm:bg-left focus-within:bg-center"
      style={{ backgroundImage: `url(${data.image})` }} // , backgroundSize: "100%"
      data-theme="light"
    >
      <div
        className={`Card-read ${isVisible ? "slideLeft" : "invisible"}
        z-10 p-4 w-full  sm:w-3/4 
      rounded-md border
      shadow backdrop-blur 
      text-black prose lg:prose-lg
      
      `}
      >
        <h2 className="text-inherit">{data.title}</h2>
        {badgeGroups(data.keywords)}
        {/* <p> */}
        <Markdown className={bgClear}>{data.content}</Markdown>
        {/* </p> */}
        {/* from-cyan-200 via-blue-200 to-teal-300 */}
        <div className={"link-and-explain"}>{buttonGroups(data.buttons)}</div>
      </div>
    </div>
  );
}
