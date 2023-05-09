import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import FormEntry from '../FormEntry';
import SubmitButton from '../SubmitButton';
import Loading from '../Loading';

interface FormValues {
    epochs: number;
    activation_func: string;
    hidden_size: number;
    learning_rate: number;
}

const NeuralNetworkForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [_, setData] = useState<any>(null)
    const [formValues, setFormValues] = useState<FormValues>({
        activation_func: "tanh",
        epochs: 100,
        hidden_size: 8,
        learning_rate: 0.01,
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]: Number(event.target.value),
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const result = await axios.post<any>('https://data-mining-from-scratch-backend.onrender.com/', {
            algorithm: 'neural-network',
            arguments: formValues,
        });
        setData(result.data);
        setLoading(false);

        router.push({
            pathname: "/neural-network-results",
            query: result.data,
        })
    };

    return (
        <div className="w-96 p-8 bg-gray-100 rounded-md">
            <h1 className="text-2xl font-bold mb-4">Neural-Network</h1>
            <form onSubmit={handleSubmit}>
                <FormEntry
                    id='activation_func'
                    name='activation_func'
                    labelText='Activation Function'
                    max={1000}
                    min={1}
                    dataType='string'
                    value={formValues.activation_func}
                    handleChange={handleChange}
                />
                <FormEntry
                    id="epochs"
                    name="epochs"
                    labelText='Epochs'
                    max={1000}
                    min={1}
                    dataType='number'
                    value={formValues.epochs}
                    handleChange={handleChange}
                />
                <FormEntry
                    id="hidden_size"
                    name="hidden_size"
                    labelText='Hidden Size'
                    max={24}
                    min={2}
                    dataType='number'
                    value={formValues.hidden_size}
                    handleChange={handleChange}
                />
                <FormEntry
                    id="learning_rate"
                    name="learning_rate"
                    labelText="Learning Rate"
                    max={2}
                    min={0.00001}
                    dataType='float'
                    value={formValues.learning_rate}
                    handleChange={handleChange}
                />
                <SubmitButton txt='Run Neural Network' />
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default NeuralNetworkForm;
