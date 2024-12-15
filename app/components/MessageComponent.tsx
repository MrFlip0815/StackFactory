import { Form } from "@remix-run/react"

export const CommentComponent = ({ buttonName, buttonValue }: { buttonName: string, buttonValue: string }) => {
    return (
        <div className="coding px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased  bg-gray-800 rounded-lg leading-normal overflow-hidden">
            <div className="top mb-2 flex select-none">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
                <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="mt-4 flex">
                <span className="text-green-400">stackFactory.dev :~$</span>
                <p className="flex-1 typing items-center pl-2 text-slate-200">
                    sf commit -m
                </p>
            </div>
            <textarea name="message" id="messageArea" className="block focus:outline-none leading-tight w-full coding pt-4 pb-4 text-slate-200 text-sm font-mono subpixel-antialiased bg-slate-800"
                rows={8}
                placeholder={"> enter comment here"} />
            <div className="flex justify-normal bg-slate-800 text-slate-300 w-full gap-4 pb-4">
                <div className="flex place-items-center">
                    <label htmlFor="messageFrom" className="font-mono text-sm text-slate-200">
                        <span className="hidden sm:block">&gt; from:</span>
                        <span className="sm:hidden">from:</span>
                    </label>
                </div>

                <input type="email" required name="messageFrom" className="bg-slate-800 font-mono text-sm border-gray-400 border px-2 rounded-sm text-slate-200"
                    placeholder="enter e-mail" />
                <button type="submit" name={buttonName} value={buttonValue} className="font-mono border border-green-300 flex justify-center px-2 hover:bg-green-800 rounded-sm place-items-center">
                    <span className="text-green-300 text-sm hidden sm:block">&gt; send</span>
                    <span className="text-green-300 text-sm sm:hidden">send</span>
                </button>
            </div>
        </div>
    )
}