import { useState } from 'react';
import axios from 'axios';

import SubmitButton from './SubmitButton';
import FormEntry from './FormEntry';

interface FormValues {
    k: number;
    max_iter: number;
}

const KMeansForm = () => {
    const [data, setData] = useState<any>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        k: 3,
        max_iter: 100,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]: Number(event.target.value),
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await axios.post<any>('https://data-mining-from-scratch-backend.onrender.com/', {
            algorithm: 'kmeans-clustering',
            arguments: formValues,
        });
        setData(result.data);
    };

    if (data) {
        console.log(data);
    }

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
        </div>
    );
};

export default KMeansForm;
