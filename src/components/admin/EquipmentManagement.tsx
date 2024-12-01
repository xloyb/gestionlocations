import { createEquipment, getEquipmentList, getCategories, getDepots } from '@/lib/server'; // Ensure these methods are implemented
import { useState, useEffect } from 'react';

interface Equipment {
    id: number;
    code: string;
    name: string;
    state: string;
    capacity: number;
    dailyPrice: number;
    categoryId: number;
    depotId: number;
}

interface Category {
    id: number;
    code: string;
    designation: string;
    name: string; // Add the missing 'name' field to match the required type
}

interface Depot {
    id: number;
    code: string;
    address: string;
    phone: string;
    managerId: string;
    name: string; // Add the missing 'name' field to match the required type
}

const EquipmentManagement = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [dailyPrice, setDailyPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [depotId, setDepotId] = useState(0);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [depots, setDepots] = useState<Depot[]>([]);

    useEffect(() => {
        fetchEquipments();
        fetchCategoriesAndDepots();
    }, []);

    const fetchEquipments = async () => {
        const equipmentList = await getEquipmentList();
        setEquipments(equipmentList);
    };

    const fetchCategoriesAndDepots = async () => {
        try {
            const fetchedCategories = await getCategories();
            const fetchedDepots = await getDepots();
            // Make sure fetched data has the 'name' field
            const formattedCategories = fetchedCategories.map((category: any) => ({
                ...category,
                name: category.designation, // Assuming the 'name' field should be 'designation'
            }));
            const formattedDepots = fetchedDepots.map((depot: any) => ({
                ...depot,
                name: depot.code, // Assuming the 'name' field should be 'code'
            }));
            setCategories(formattedCategories);
            setDepots(formattedDepots);
        } catch (error) {
            console.error('Failed to fetch categories or depots:', error);
        }
    };

    const handleCreateEquipment = async () => {
        try {
            if (code && name && state && capacity && dailyPrice && categoryId && depotId) {
                const newEquipment = await createEquipment({
                    code,
                    name,
                    state,
                    capacity,
                    dailyPrice,
                    categoryId,
                    depotId,
                });
                setEquipments([...equipments, newEquipment]);
                setCode('');
                setName('');
                setState('');
                setCapacity(0);
                setDailyPrice(0);
                setCategoryId(0);
                setDepotId(0);
            }
        } catch (error) {
            console.error('Failed to create equipment:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-lg rounded-md">
            <h1 className="text-2xl font-semibold mb-4 text-base-900">Equipment Management</h1>

            <div>
                <label className="block mb-1 text-base-900">Equipment Code</label>
                <input
                    type="text"
                    placeholder="Enter equipment code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="input input-bordered w-full bg-base-100 text-base-900"
                />
            </div>

            <div>
                <label className="block mb-1 text-base-900">Equipment Name</label>
                <input
                    type="text"
                    placeholder="Enter equipment name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full bg-base-100 text-base-900"
                />
            </div>

            <div>
                <label className="block mb-1 text-base-900">State</label>
                <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="select select-bordered w-full bg-base-100 text-base-900"
                >
                    <option value="">Select state</option>
                    <option value="NEW">New</option>
                    <option value="USED">Used</option>
                    <option value="DAMAGED">Damaged</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 text-base-900">Capacity</label>
                <input
                    type="number"
                    placeholder="Enter capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="input input-bordered w-full bg-base-100 text-base-900"
                />
            </div>

            <div>
                <label className="block mb-1 text-base-900">Daily Price</label>
                <input
                    type="number"
                    placeholder="Enter daily price"
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(Number(e.target.value))}
                    className="input input-bordered w-full bg-base-100 text-base-900"
                />
            </div>

            {/* Other Inputs */}
            <div>
                <label className="block mb-1 text-base-900">Category</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="select select-bordered w-full bg-base-100 text-base-900"
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.designation}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 text-base-900">Depot</label>
                <select
                    value={depotId}
                    onChange={(e) => setDepotId(Number(e.target.value))}
                    className="select select-bordered w-full bg-base-100 text-base-900"
                >
                    <option value="">Select depot</option>
                    {depots.map((depot) => (
                        <option key={depot.id} value={depot.id}>
                            {depot.name} {/* Display depot name */}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleCreateEquipment}
                className="btn btn-primary mt-4"
            >
                Create Equipment
            </button>

            {/* Equipment List */}
            <div className="overflow-x-auto">
                <table className="table w-full bg-base-100">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>State</th>
                            <th>Capacity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipments.map((equipment) => (
                            <tr key={equipment.id}>
                                <td>{equipment.code}</td>
                                <td>{equipment.name}</td>
                                <td>{equipment.state}</td>
                                <td>{equipment.capacity}</td>
                                <td>{equipment.dailyPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EquipmentManagement;
