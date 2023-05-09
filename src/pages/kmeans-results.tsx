import Head from 'next/head';
import NavBar from '@/components/NavBar';
import KMeansForm from '@/components/Kmeans/KmeansForm';
import { useRouter } from 'next/router';
import Plot from '@/components/Plot';

export default function Kmeans() {
    const router = useRouter();
    const { plot } = router.query;
    return (
        <>
            <Head>
                <title>Jensen.Dev.Data-Mining</title>
                <meta name="description" content="Machine Learning Models From Scratch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="relative">
                <NavBar />
                <div className="flex flex-col items-center justify-center h-screen pt-20">
                    <KMeansForm />
                    {plot && <Plot plotData={plot} />}
                </div>
            </div>
        </>
    );
}
