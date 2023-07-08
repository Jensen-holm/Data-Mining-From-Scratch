import Head from 'next/head';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

import NeuralNetworkForm from '@/components/NeuralNetwork/NeuralNetworkForm';
import Plot from '@/components/Plot';


export default function NeuralNetworkResults() {
    const router = useRouter();
    const { plot_key, mse, learning_rate, epochs, hidden_size, activation_func } = router.query;
    const [plotData, setPlotData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://machine-learning-from-scratch-jensen.onrender.com/neural-network/plots/${plot_key}`
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
                <title>Jensen: Data-Miner;</title>
                <meta name="description" content="Machine Learning Models From Scratch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/gvsu.png" />
            </Head>
            <div className="relative">
                <NavBar />
            </div>
            <div className="flex flex-col items-center justify-center pt-16 max-w-screen-lg w-full mx-auto">
                <NeuralNetworkForm
                    learning_rate={learning_rate}
                    epochs={epochs}
                    hidden_size={hidden_size}
                    activation_func={activation_func}
                />
                <h4>Mean Squared Error: {mse}</h4>
                {plotData && <Plot plotData={plotData} />}
            </div>
        </>
    );
}
