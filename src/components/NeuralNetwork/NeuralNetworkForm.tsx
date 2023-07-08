import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import FormEntry from '../FormEntry';
import SubmitButton from '../SubmitButton';
import Loading from '../Loading';

interface FormValues {
    epochs?: string | string[];
    activation_func?: string | string[];
    hidden_size?: string | string[];
    learning_rate?: string | string[];
}

const NeuralNetworkForm = ({ epochs, activation_func, hidden_size, learning_rate }: FormValues = {}) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [_, setData] = useState<any>(null)
    const [formValues, setFormValues] = useState<FormValues>({
        activation_func: activation_func ?? "tanh",
        epochs: epochs ?? "100",
        hidden_size: hidden_size ?? "8",
        learning_rate: learning_rate ?? "0.01",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setFormValues({
            ...formValues,
            [name]: type === 'number' ? Number(value) : value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const { activation_func, learning_rate, ...rest } = formValues;
        const convertedValues = Object.fromEntries(
            Object.entries(rest).map(([key, value]) => [key, Array.isArray(value) ? parseInt(value[0]) : parseInt(value)])
        );
        const result = await axios.post<any>('https://machine-learning-from-scratch-jensen.onrender.com/neural-network', {
            arguments: {
                ...convertedValues,
                activation_func,
                learning_rate: Number(learning_rate),
            },
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
                    dataType='float'
                    value={formValues.epochs}
                    handleChange={handleChange}
                />
                <FormEntry
                    id="hidden_size"
                    name="hidden_size"
                    labelText='Hidden Size'
                    max={24}
                    min={2}
                    dataType='float'
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
                <SubmitButton txt='Train Neural Network' />
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default NeuralNetworkForm;
