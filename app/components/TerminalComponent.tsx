import { NavLink } from "@remix-run/react";


const TerminalComponent = () => {
  return (
    <div className="w-full h-full">
      <div className="coding px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased  bg-slate-800 pb-6 rounded-lg leading-normal overflow-hidden">
        <div className="top mb-2 flex select-none">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="mt-4 flex">
          <span className="text-green-400">stackFactory.dev :~$</span>
          <p className="flex-1 typing items-center pl-2">
            sf help
          </p>
        </div>
        <div>
          <p>&gt;&nbsp;
            <span className="text-white">Stack</span>
            <span className="text-slate-300">Factory</span>
            <span className="text-purple-400">.dev</span>
            : A software engineering company with a focus on:
          </p>
          <div><br /></div>
          <div className="flex justify-center"><p>Skill</p></div>
          <div className="flex justify-center"><p>Efficiency</p></div>
          <div className="flex justify-center"><p>Dedication</p></div>
          <div className="flex justify-center"><p>Passion</p></div>
          <div><br /></div>
          <p>&gt; Check out our <NavLink to="/stacks"><span className="underline">Stacks</span></NavLink>, <NavLink to="/projects"><span className="underline">Projects</span></NavLink> and <NavLink to="/development"><span className="underline">Development</span></NavLink><span> section.</span></p>
          <p>&gt; Get in touch or leave a comment: <NavLink to="/contact?commentExpanded=true"><span className="underline">Here</span></NavLink></p>

        </div>
      </div >
    </div >
  );
}

export default TerminalComponent;