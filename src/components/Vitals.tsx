interface data {
  content: {
    name: string;
    quantity: number;
    description: string;
  };
}

const Vitals = ({ content }: data) => {
  return (
    <div className="border-gray-600 p-3 border rounded-md m-1 w-[150px] h-[100px]">
      <p>{content.name}</p>
      <p className="font-bold text-lg">{content.quantity}</p>
      <p>{content.description}</p>
    </div>
  );
};

export default Vitals;
