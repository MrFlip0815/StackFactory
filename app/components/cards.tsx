

export const SmallNewsCardComponent = ({ text, img, title }: { text: string, img: string, title: string }) => {
    return (
        <div className="flex rounded-xl bg-slate-300 w-80" >
            <div className="rounded-xl max-w-24 max-h-24">
                <img className="rounded-xl" src={img} ></img >
            </div >
            <div className="flex flex-col w-full pt-3 pb-3 pr-3">
                <div className="flex justify-center place-items-center text-sm font-bold">
                    <h3>{title}</h3>
                </div>
                <div className="ml-3 mt-3 text-sm text-justify line-clamp-2">
                    <p>{text}</p>
                </div>
            </div>
        </div >
    );
}


export const BigNewsCardComponent = ({ text, img, title }: { text: string, img: string, title: string }) => {
    return (
        <div className="rounded-xl bg-slate-300 flex w-full min-h-40 max-h-48">
            <div className="rounded-xl max-w-40 max-h-40">
                <img className="rounded-xl" src={img}></img>
            </div>
            <div className="flex flex-col w-full pt-3 pb-3 pr-3">
                <div className="flex justify-center place-items-center text-sm font-bold">
                    <h3>{title}</h3>
                </div>
                <div className="ml-3 mt-3 text-sm text-justify line-clamp-4">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}



