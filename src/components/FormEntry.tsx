

interface Props {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dataType: string;
    min: number;
    max: number;
    id: string;
    name: string;
    value: any;
    labelText: string;
}


const FormEntry = ({ handleChange, dataType, min, max, id, name, value, labelText }: Props) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor={id}>
                {labelText}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                name={name}
                type={dataType}
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default FormEntry;
