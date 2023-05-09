import React from 'react';
import Cluster from './Interface';
import { VictoryChart, VictoryScatter } from 'victory';

interface Props {
    clusters: Cluster[];
}

const ScatterPlot = ({ clusters }: Props) => {
    return (
        <div style={{ height: '500px' }}>
            <VictoryChart>
                {clusters.map((cluster: Cluster) => (
                    <VictoryScatter
                        key={cluster.id}
                        data={cluster.points}
                        style={{
                            data: { fill: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` }
                        }}
                    />
                ))}
            </VictoryChart>
        </div>
    );
};

export default ScatterPlot;
