import { LineChart } from "react-native-chart-kit";

const data = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{ data: [300, 450, 200] }]
};

export default function Dashboard() {
    return (
        <LineChart
            data={data}
            width={300}
            height={220}
            yAxisLabel="RM"
        />
    );
}