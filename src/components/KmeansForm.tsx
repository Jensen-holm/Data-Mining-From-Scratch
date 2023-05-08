import { useState } from 'react';
import axios from 'axios';

interface FormValues {
    k: number;
    maxIter: number;
}

const KMeansForm = () => {
    const [data, setData] = useState<any>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        k: 3,
        maxIter: 100,
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
            <h1 className="text-2xl font-bold mb-4">KMeans Clustering Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="k">
                        K
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="k"
                        name="k"
                        type="number"
                        min={1}
                        max={100}
                        value={formValues.k}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="max_iter">
                        Max Iter
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="max_iter"
                        name="max_iter"
                        type="number"
                        min={1}
                        value={formValues.maxIter}
                        onChange={handleChange}
                    />
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Run KMeans Clustering
                </button>
            </form>
        </div>
    );
};

export default KMeansForm;
