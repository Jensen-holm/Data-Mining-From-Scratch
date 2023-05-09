import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SubmitButton from '../SubmitButton';
import FormEntry from '../FormEntry';
import Loading from '../Loading';

interface FormValues {
    k?: string | string[];
    max_iter?: string | string[];
}

const KMeansForm = ({ k, max_iter }: FormValues = {}) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [_, setData] = useState<any>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        k: k ?? "3",
        max_iter: max_iter ?? "100",
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
        const { ...rest } = formValues;
        const convertedValues = Object.fromEntries(
            Object.entries(rest).map(([key, value]) => [key, Number(value)])
        );
        const result = await axios.post<any>('https://machine-learning-from-scratch-jensen.onrender.com', {
            algorithm: 'kmeans-clustering',
            arguments: {
                ...convertedValues,
            },
        });
        event.preventDefault();
        setData(result.data);
        setLoading(false)
        router.push({
            pathname: "kmeans-results",
            query: result.data,
        })
    };

    return (
        <div className="w-96 p-8 bg-gray-100 rounded-md">
            <h1 className="text-2xl font-bold mb-4">KMeans Clustering</h1>
            <form onSubmit={handleSubmit}>
                <FormEntry
                    id="k"
                    name="k"
                    labelText='K-means'
                    min={2}
                    max={100}
                    dataType='number'
                    value={formValues.k}
                    handleChange={handleChange}
                />
                <FormEntry
                    id="max_iter"
                    name="max_iter"
                    labelText='Max Iterations'
                    min={1}
                    max={100}
                    dataType='number'
                    value={formValues.max_iter}
                    handleChange={handleChange}
                />
                <SubmitButton txt="Run Kmeans Clustering"></SubmitButton>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default KMeansForm;
