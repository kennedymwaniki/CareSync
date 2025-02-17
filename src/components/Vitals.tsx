interface VitalsProps {
  content: {
    name: string;
    quantity: number;
    description: string;
    unit: string;
  };
}

const Vitals = ({ content }: VitalsProps) => {
  return (
    <div className="border-gray-600 p-3 border rounded-md m-1 w-[150px] h-[100px]">
      <p>{content.name}</p>
      <p className="font-bold text-lg">
        {content.quantity} {content.unit}
      </p>
      <p
        className={`text-sm ${
          content.description.includes("out")
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {content.description}
      </p>
    </div>
  );
};

export default Vitals;
