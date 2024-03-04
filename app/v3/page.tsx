import Image from "next/image";
// import proj from "./data_projects.yml";
import "./style.css";
import MyCard from "./MyCard.jsx";
import Nav from "./Nav.jsx";
// import OrbCanvas from "./OrbCanvas";
import dynamic from "next/dynamic";
const OrbCanvas = dynamic(() => import("./OrbCanvas"), { ssr: false });

import yaml from "js-yaml";
const getProj = async () => {
  try {
    const config = await require(`./data_projects.yml`);
    return yaml.load(config.default);
  } catch (error) {
    const proj = await require("./data_projects.yml");
    return proj;
  }
};

const projCards = (proj: any) =>
  proj["items"].map((item: any, idx: number) => (
    <div key={`key-cardGroup-${item.id}`}>
      <div id={`item-${item.id}`}></div>
      <MyCard data={item} isEven={idx % 2 ? true : false} />
      <div className="divider"></div>
    </div>
  ));

function SvgAlert() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="stroke-info shrink-0 w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

const badges = () => {
  const soft_skills = [
    "great communication skills",
    "proactive",
    "desire to deliver the best",
    "fast learner",
    "team player",
    "self-driven",
    "attention to details",
  ];
  return soft_skills.map((skill) => (
    <div
      className="badge light:badge-neutral badge-outline m-2 p-3"
      key={skill}
    >
      {skill}
    </div>
  ));
};

export default async function Home() {
  const proj = await getProj();
  // const toc = proj.map();
  const text = {
    alertTitle: "",
    alertContent: "",
  };
  return (
    <main className="flex flex-col min-h-screen items-center justify-between md:px-4 sm:px-4 lg:px-48 py-4">
      <OrbCanvas />

      <Nav toc={proj["items"]} />

      <p className="pt-12 placeHolder "></p>

      <div tabIndex={0} className="collapse bg-base-100">
        <div className="collapse-title text-xl font-medium flex items-center">
          <SvgAlert />
          <span>&nbsp; &#9; Who is S. T.?</span>
        </div>
        <div className="collapse-content">
          <p className="alert m-2 bg-base-200">
            A fresh grad (Master of Science, 2023) seeking opportunities to
            work.
          </p>
          {/* <p className="alert">
            A passionate life-time learner in multile displinaries.
          </p> */}
          <p className="alert m-2 bg-base-200">
            A practitioner and learner who is enthusiastic about technology and
            committed to delivering exceptional results.
          </p>
          {badges()}
        </div>
      </div>

      <div className="divider h-full text-xl font-sans font-semibold italic antialiased">
        {/* Projects&nbsp; 
        <span className="badge badge-lg badge">FEATURED</span>*/}
        <span className="badge badge-2xl text-2xl p-5 border border-solid border-gray-400 ring-2 ring-gray-300">
          Projects
        </span>
      </div>

      <div className="Cards w-full h-full">{projCards(proj)}</div>
    </main>
  );
}
