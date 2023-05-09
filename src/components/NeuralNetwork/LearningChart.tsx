import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

interface Props {
    lossHistory: number[];
}

const LossHistoryChart = ({ lossHistory }: Props) => {
    return (
        <div className="h-64">
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                    animate={{
                        duration: 5000,
                        onLoad: { duration: 1000 }
                    }}
                    data={lossHistory.map((loss, epoch) => ({ x: epoch + 1, y: loss }))}
                    style={{ data: { strokeWidth: 2 } }}
                />
            </VictoryChart>
        </div>
    );
};

export default LossHistoryChart;
