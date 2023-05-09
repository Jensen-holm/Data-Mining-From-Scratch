import Image from "next/image";

interface Props {
    plotData: string;
}

const Plot = ({ plotData }: Props) => {
    return (
        <div style={{ width: '500px', height: '500px' }}>
            <Image
                alt="Scatter Plot"
                src={`data:image/png;base64,${plotData}`}
                width={500}
                height={500}
            />
        </div>
    )
};

export default Plot;
