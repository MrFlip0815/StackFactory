

const ImageComponent = ({ img }: { img: string }) => {
    return (
        <div className="rounded-xl bg-slate-500 max-w-80 max-h-80">
            <img className="rounded-xl" src={img}></img>
        </div>
    );
}

export default ImageComponent;