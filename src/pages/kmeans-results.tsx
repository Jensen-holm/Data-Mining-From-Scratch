import Head from 'next/head';
import NavBar from '@/components/NavBar';
import KMeansForm from '@/components/Kmeans/KmeansForm';
import ScatterPlot from '@/components/Kmeans/ScatterPlot';
import { useRouter } from 'next/router';
import Cluster from '@/components/Kmeans/Interface';

export default function Kmeans() {
    const router = useRouter();
    const encodedResult = router.query.result as string;
    const decodedResult = JSON.parse(decodeURIComponent(encodedResult));

    // convert decodedResult into an array of Cluster objects
    // convert decodedResult into an array of Cluster objects
    const clusters: Cluster[] = decodedResult.clusters.map((clusterData: any, index: number) => ({
        id: index,
        centroid: clusterData.centroid,
        points: clusterData.points.map((point: number[]) => ({ x: point[0], y: point[1] })),
    }));

    return (
        <>
            <Head>
                <title>Jensen.Dev.Data-Mining</title>
                <meta name="description" content="Machine Learning Models From Scratch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-screen">
                <KMeansForm />
                <ScatterPlot clusters={clusters} />
            </div>
        </>
    );
}
