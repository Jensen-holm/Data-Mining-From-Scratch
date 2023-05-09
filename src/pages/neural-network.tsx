import Head from 'next/head';
import NavBar from '@/components/NavBar';
import NeuralNetworkForm from '@/components/NeuralNetwork/NeuralNetworkForm';

export default function NeuralNetwork() {
    return (
        <>
            <Head>
                <title>Jensen.Dev.Data-Mining</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-screen">
                <NeuralNetworkForm />
            </div>
        </>
    )
}