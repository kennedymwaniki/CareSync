/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

type CareProvider = {
  profile: string;
  name: string;
  role: string;
  specialty: string;
  active: boolean;
  lastActivity: string;
  openTime: string;
  status: string;
};

const CareProvidersTable = () => {
  const initialData: CareProvider[] = [
    {
      profile: "👩‍⚕️",
      name: "Dr. Alice Johnson",
      role: "Doctor",
      specialty: "Pediatrics",
      active: true,
      lastActivity: "2025-01-25",
      openTime: "9:00 AM",
      status: "Available",
    },
    {
      profile: "👨‍⚕️",
      name: "Nurse Bob Lee",
      role: "Nurse",
      specialty: "General",
      active: true,
      lastActivity: "2025-01-20",
      openTime: "7:00 AM",
      status: "Available",
    },
    {
      profile: "👩‍⚕️",
      name: "Dr. Clara Holmes",
      role: "Doctor",
      specialty: "Surgery",
      active: false,
      lastActivity: "2025-01-15",
      openTime: "10:00 AM",
      status: "Unavailable",
    },
    {
      profile: "👨‍⚕️",
      name: "Dr. David Smith",
      role: "Doctor",
      specialty: "Cardiology",
      active: true,
      lastActivity: "2025-01-10",
      openTime: "8:00 AM",
      status: "Available",
    },
    {
      profile: "👩‍⚕️",
      name: "Nurse Eva Green",
      role: "Nurse",
      specialty: "Maternity",
      active: true,
      lastActivity: "2025-01-18",
      openTime: "6:00 AM",
      status: "Available",
    },
  ];

  const [data, _setData] = useState<CareProvider[]>(initialData);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterRole = (role: string | null) => {
    setFilterRole(role);
  };

  const handleFilterActive = (active: boolean | null) => {
    setFilterActive(active);
  };

  const filteredData = data.filter((provider) => {
    return (
      (!filterRole || provider.role === filterRole) &&
      (filterActive === null || provider.active === filterActive) &&
      provider.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Care Providers</h1>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <button
            onClick={() => handleFilterRole("Doctor")}
            className={`px-3 py-1 text-sm rounded-md ${
              filterRole === "Doctor"
                ? "bg-[#454BE7] text-white"
                : "bg-gray-200"
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => handleFilterRole("Nurse")}
            className={`ml-2 px-3 py-1 text-sm rounded-md ${
              filterRole === "Nurse"
                ? "bg-[#454ae756] text-[#454BE7]"
                : "bg-gray-200"
            }`}
          >
            Nurse
          </button>
          <button
            onClick={() => handleFilterRole(null)}
            className="ml-2 px-3 py-1 text-sm rounded-md bg-gray-200"
          >
            Clear Role
          </button>
        </div>
        <div>
          <button
            onClick={() => handleFilterActive(true)}
            className={`px-3 py-1 text-sm rounded-md ${
              filterActive === true ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterActive(false)}
            className={`ml-2 px-3 py-1 text-sm rounded-md ${
              filterActive === false ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Inactive
          </button>
          <button
            onClick={() => handleFilterActive(null)}
            className="ml-2 px-3 py-1 text-sm rounded-md bg-gray-200"
          >
            Clear Status
          </button>
        </div>
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={handleSearch}
          className="ml-auto px-4 py-2 border rounded-md"
        />
      </div>
      {filteredData.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr className="text-sm  text-nowrap border-b-2">
              <th className=" px-4 py-2">Profile</th>
              <th className=" px-4 py-2">Name</th>
              <th className=" px-4 py-2">Role</th>
              <th className=" px-4 py-2">Specialty</th>
              <th className=" px-4 py-2">Active</th>
              <th className=" px-4 py-2">Last Activity</th>
              <th className=" px-4 py-2">Open Time</th>
              <th className=" px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((provider, index) => (
              <tr key={index} className="hover:bg-gray-50 text-sm text-nowrap">
                <td className="px-4 py-2">
                  <img
                    src={provider.profile}
                    alt={provider.name}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className=" px-4 py-2">{provider.name}</td>
                <td className=" px-4 py-2">{provider.role}</td>
                <td className=" px-4 py-2">{provider.specialty}</td>
                <td className=" px-4 py-2">{provider.active ? "Yes" : "No"}</td>
                <td className=" px-4 py-2">{provider.lastActivity}</td>
                <td className=" px-4 py-2">{provider.openTime}</td>
                <td className=" px-4 py-2">{provider.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <img src="/no-data.png" alt="No data" className="w-48 h-48 mb-4" />
          <p className="text-gray-500">There is no data to display here!</p>
        </div>
      )}
    </div>
  );
};

export default CareProvidersTable;
