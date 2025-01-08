interface data {
  content: {
    name: string;
    quantity: number;
  };
}

const StatCards = ({ content }: data) => {
  return (
    <div className="border-r-4 border-x-indigo-950 p-4 border rounded-md m-4">
      <p>{content.name}</p>
      <p>{content.quantity}</p>
    </div>
  );
};

export default StatCards;
