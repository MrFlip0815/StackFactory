import { GetNews } from "~/data/news";
import { BigNewsCardComponent, SmallNewsCardComponent } from "./cards";

const NewsSection = ({ amount }: { amount: number }) => {
    const data = GetNews(amount);

    return (
        <div className="flex flex-wrap gap-3 justify-center sm:justify-normal">
            {
                data.map((elem, index) => {
                    if (index == 0) {
                        return <BigNewsCardComponent img="sf5.jpg" text={elem.news} key={elem.id} title={elem.title}></BigNewsCardComponent>
                    }

                    return <SmallNewsCardComponent img="sf.jpg" text={elem.news} key={elem.id} title={elem.title}></SmallNewsCardComponent>
                })
            }
        </div>
    )
}


export default NewsSection;