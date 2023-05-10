import Image from "next/image";

interface Props {
    plotData: string | string[];
}

const Plot = ({ plotData }: Props) => {
    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Image
                alt="Scatter Plot"
                src={`data:image/png;base64,${plotData}`}
                width={400}
                height={400}
            />
        </div>
    )
};

export default Plot;
