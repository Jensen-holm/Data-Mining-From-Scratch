import Head from 'next/head';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';

import NeuralNetworkForm from '@/components/NeuralNetwork/NeuralNetworkForm';
import Plot from '@/components/Plot';


export default function Kmeans() {
    const router = useRouter();
    const { plot } = router.query;
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
            </div>
            <div className="flex flex-col items-center justify-center pt-24 max-w-screen-lg w-full mx-auto">
                <NeuralNetworkForm />
                {plot && <Plot plotData={plot} />}
            </div>
        </>
    );
}
