import Head from 'next/head';
import NavBar from '@/components/NavBar';
import KMeansForm from '@/components/Kmeans/KmeansForm';
import { useRouter } from 'next/router';
import Plot from '@/components/Plot';

export default function Kmeans() {
    const router = useRouter();
    const { plot, k, max_iter } = router.query;
    return (
        <>
            <Head>
                <title>Jensen: Data-Miner;</title>
                <meta name="description" content="Machine Learning Models From Scratch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="relative">
                <NavBar />
                <div className="flex flex-col items-center justify-center pt-16 max-w-screen-lg w-full mx-auto">
                    <KMeansForm
                        k={k}
                        max_iter={max_iter}
                    />
                    {plot && <Plot plotData={plot} />}
                </div>
            </div>
        </>
    );
}
