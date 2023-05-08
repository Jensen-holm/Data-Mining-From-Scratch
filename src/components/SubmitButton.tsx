

interface Props {
    txt: string;
}

const SubmitButton = ({ txt }: Props) => {
    return (
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" type="submit">
            {txt}
        </button>
    )
}

export default SubmitButton;