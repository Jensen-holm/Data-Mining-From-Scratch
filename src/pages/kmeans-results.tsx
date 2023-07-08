import Head from 'next/head';
import NavBar from '@/components/NavBar';
import KMeansForm from '@/components/Kmeans/KmeansForm';
import { useRouter } from 'next/router';
import Plot from '@/components/Plot';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function KMeans() {
    const router = useRouter();
    const { plot_key, k, max_iter } = router.query;
    const [plotData, setPlotData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://machine-learning-from-scratch-jensen.onrender.com/kmeans-clustering/plot/${plot_key}`
                );
                setPlotData(response.data);
            } catch (error) {
                // Handle error
            }
        };

        if (plot_key) {
            fetchData();
        }
    }, [plot_key]);

    return (
        <>
            <Head>
                <title>Jensen: Data-Miner</title>
                <meta name="description" content="Machine Learning Models From Scratch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/gvsu.png" />
            </Head>
            <div className="relative">
                <NavBar />
                <div className="flex flex-col items-center justify-center pt-16 max-w-screen-lg w-full mx-auto">
                    <KMeansForm k={k} max_iter={max_iter} />
                    {plotData && <Plot plotData={plotData} />}
                </div>
            </div>
        </>
    );
}
