import { LabelChart } from "../cmps/label-chart";
// import { LabelSelect } from "../cmps/label-select";
import { PriceChart } from "../cmps/price-chart";

export function Dashboard() {
    return (
        <section className="main-dashboard flex">
            <h3 className="chart-title">Price chart</h3>
            <PriceChart />
            <h3 className="chart-title">Label chart</h3>
            <LabelChart />
            {/* <LabelSelect /> */}
        </section>
    )
}
