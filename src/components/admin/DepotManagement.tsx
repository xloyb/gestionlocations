import { useState, useEffect } from 'react';
import { createDepot, getAllDepots, getAllUsers } from '@/lib/server'; // Import server methods

interface Depot {
  id: number;
  code: string;
  address: string;
  phone: string;
  fax: string;
  managerId: string;
}


interface User {
    id: string;
    name?: string | null; // Updated type
  }

const DepotManagement = () => {
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [fax, setFax] = useState('');
  const [managerId, setManagerId] = useState('');
  const [depots, setDepots] = useState<Depot[]>([]);
  const [users, setUsers] = useState<User[]>([]); // Users for manager selection

  useEffect(() => {
    const fetchData = async () => {
      const allDepots = await getAllDepots();
      setDepots(allDepots);
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };

    fetchData();
  }, []);

  const handleCreateDepot = async () => {
    try {
      if (code && address && phone && fax && managerId) {
        const newDepot = await createDepot({
          code,
          address,
          phone,
          fax,
          managerId,
        });
        setDepots([...depots, newDepot]); // Update the list of depots
        setCode('');
        setAddress('');
        setPhone('');
        setFax('');
        setManagerId('');
      }
    } catch (error) {
      console.error("Failed to create depot:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-lg rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-base-900">Depot Management</h1>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-2 text-base font-medium text-base-900">Depot Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input input-bordered w-full bg-base-100 text-base-900"
          />
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-base-900">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input input-bordered w-full bg-base-100 text-base-900"
          />
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-base-900">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full bg-base-100 text-base-900"
          />
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-base-900">Fax Number</label>
          <input
            type="text"
            value={fax}
            onChange={(e) => setFax(e.target.value)}
            className="input input-bordered w-full bg-base-100 text-base-900"
          />
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-base-900">Manager</label>
          <select
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            className="select select-bordered w-full bg-base-100 text-base-900"
          >
            <option value="">Select a manager</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || `User ID: ${user.id}`}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleCreateDepot}
          className="btn btn-primary w-full"
        >
          Create Depot
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100">
          <thead>
            <tr>
              <th>Code</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Fax</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {depots.map((depot) => (
              <tr key={depot.id}>
                <td>{depot.code}</td>
                <td>{depot.address}</td>
                <td>{depot.phone}</td>
                <td>{depot.fax}</td>
                <td>{depot.managerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepotManagement;
