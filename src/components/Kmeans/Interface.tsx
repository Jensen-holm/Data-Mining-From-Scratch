interface Cluster {
    id: number;
    centroid: number[];
    points: { x: number; y: number }[];
}

export default Cluster;