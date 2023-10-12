export default ({ toc }) => (
  <div
    className="MyNavbar
        z-50   justify-between font-mono text-2xl
      absolute inset-y-0 left-0 
      lg:absolute lg:inset-y-0 lg:left-0"
  >
    {/* items-center */}
    <div className="z-50 fixed flex left-0 top-0 pb-2 pt-1 w-full justify-left">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
        >
          {toc.map((item) => (
            <li key={`nav-${item.id}`}>
              <a href={`#item-${item.id}`}>⭐{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="navbar-center">
      <h1 className="fixed flex left-0 top-0 w-full justify-center border-b bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
        <code className="font-italic font-bold">S. T.</code>&nbsp; Portfolio
      </h1>
    </div>
  </div>
);
