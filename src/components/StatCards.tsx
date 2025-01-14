interface data {
  content: {
    name: string;
    quantity: number;
    color: string;
  };
}

const StatCards = ({ content }: data) => {
  return (
    <div
      className={`border-r-4 ${content.color} p-1 border rounded-md mt-2 w-[150px] mx-2`}
    >
      <p>{content.name}</p>
      <p>{content.quantity}</p>
    </div>
  );
};

export default StatCards;
