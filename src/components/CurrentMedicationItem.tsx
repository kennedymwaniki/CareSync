function CurrentMedicationItem() {
  return (
    <div className=" border rounded-md p-2">
      <p className="font-semibold ">Medication Name</p>
      <div className="flex justify-between">
        <p>12th january ,12:40PM</p>
        <p className="font-bold text-[#FE6A35] ">2 pills</p>
      </div>
    </div>
  );
}

export default CurrentMedicationItem;
