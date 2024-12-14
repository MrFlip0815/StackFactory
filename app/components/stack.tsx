

const StackComponent = ({ title, layer0, layer1, layer2 }: { title: string, layer0: string, layer1: string, layer2: string }) => {
    return (
        <div className="flex-col min-w-40 max-w-60 border-2 border-slate-300 rounded-lg bg-slate-600">
            <div className="my-1 flex justify-center mx-1 font-mono place-items-center text-slate-100">
                {title}
            </div>
            <div className="hover:bg-gray-400 my-1 flex justify-center rounded-lg bg-green-400 font-mono h-8 mx-1 place-items-center">
                {layer2}
            </div>
            <div className="hover:bg-gray-400 my-1 flex justify-center rounded-lg bg-purple-300 font-mono h-8 mx-1 place-items-center">
                {layer1}
            </div>
            <div className="hover:bg-gray-400 my-1 flex justify-center rounded-lg bg-slate-300 font-mono h-8 mx-1 place-items-center">
                {layer0}
            </div>
        </div>
    );
}

export default StackComponent;