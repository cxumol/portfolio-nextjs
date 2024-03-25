"use client";
import "./MyCard.css";
import Markdown from "react-markdown";
import { useRef, useEffect, useState } from "react";
import VidLogo from "./vidLogo.jsx";

const bgClearAmber =
  "bg-gradient-to-r from-amber-200/80 to-amber-50/10 rounded-md";
const bgClearCyan =
  "bg-gradient-to-r from-cyan-200/80 to-cyan-50/10 rounded-md";
const bgClearGray =
  "bg-gradient-to-r from-gray-200/80 to-gray-50/10 rounded-md";
const bgClear = bgClearGray;

function buttonGroups(buttons) {
  return buttons.map((btn) => {
    if (btn.link.startsWith("javascript:")) {
      return (
        <div className="link-item" key={btn.label}>
          <button
            className="border border-solid border-grey-500 hover:border-black btn glass dark:text-secondary-content"
            onClick={new Function(btn.link.substring(11))}
          >
            {btn.label}
          </button>
          <Markdown className={bgClear}>{btn.comment}</Markdown>
        </div>
      );
    } else {
      return (
        <div className="link-item" key={btn.label}>
          <a
            className="border border-solid border-grey-500 hover:border-black btn glass dark:text-secondary-content"
            href={btn.link}
          >
            {btn.label}
          </a>
          <Markdown className={bgClear}>{btn.comment}</Markdown>
        </div>
      );
    }
  });
}
function badgeGroups(keywords) {
  // console.log(buttons);
  return keywords.map((kw) => (
    <div
      className="badge badge-primary badge-outline m-1 p-3 bg-lime-50/60"
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
    const containerRefcurrent = containerRef.current;
    if (containerRefcurrent) observer.observe(containerRefcurrent);

    return () => {
      if (containerRefcurrent) observer.unobserve(containerRefcurrent);
    };
  }, [containerRef, options]);

  // return [containerRef, ratio];
  return [containerRef, isVisible];
};

export default function MyCard({ data, isEven }) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  return (
    <div
      ref={containerRef}
      className={`proj sm:pl-2 py-8 bg-cover  m-4
      h-full
      //h-[80-vh]
      md:py-24 sm:py-12
      lg:h-full lg:py-64
      bg-scroll bg-transparent
      flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"}`}
      // style={{ backgroundImage: `url(${data.image})` }} // , backgroundSize: "100%"
      data-theme="light"
    >
      {data.media ? (
        <VidLogo
          className="logo order-1 md:order-none"
          imgUrl={data.media.png}
          vidUrl={data.media.vid}
          movUrl={data.media.mov}
        />
      ) : (
        ""
      )}
      <div
        className={`Card-read ${"" /*isVisible ? "slideLeft" : "invisible"*/}
        order-2 md:order-none
        z-10 p-4 w-full  sm:w-3/4 
        ${
          "" /*rounded-md border
      shadow backdrop-blur */
        }
      text-black prose lg:prose-lg
      `}
      >
        <h1 className="text-inherit  dark:text-white">
          {/* font-serif */}
          {data.title}
        </h1>
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
