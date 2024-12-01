"use client";
import { useState, useEffect } from "react";
import {
  createEquipment,
  getEquipments,
  updateEquipment,
  deleteEquipment,
  getCategories,
  getDepots,
} from "@/lib/actions";
import { Equipment, Category, Depot } from "@prisma/client";

const AdminCarsPage = () => {
  const [equipments, setEquipments] = useState<
    (Equipment & { depot: Depot | null; category: Category | null })[]
  >([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [depots, setDepots] = useState<Depot[]>([]);
  const [formData, setFormData] = useState<Equipment>({
    id: 0, // Equipment.id is still an Int
    code: "",
    name: "",
    categoryId: 0,
    state: "NEW",
    capacity: 0,
    dailyPrice: 0,
    depotId: 0,
  });

  useEffect(() => {
    fetchEquipments();
    fetchCategories();
    fetchDepots();
  }, []);

  const fetchEquipments = async () => {
    const data = await getEquipments();
    setEquipments(data);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const fetchDepots = async () => {
    const data = await getDepots();
    setDepots(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Convert categoryId and depotId to integers
    const updatedValue = name === "categoryId" || name === "depotId" ? parseInt(value, 10) : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert capacity and dailyPrice to floats
    const updatedValue = name === "capacity" || name === "dailyPrice" ? parseFloat(value) : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that valid category and depot are selected
    if (!formData.categoryId || formData.categoryId === 0) {
      alert("Please select a valid category.");
      return;
    }

    if (!formData.depotId || formData.depotId === 0) {
      alert("Please select a valid depot.");
      return;
    }

    try {
      if (formData.id) {
        await updateEquipment(formData);
      } else {
        await createEquipment(formData);
      }

      // Reset form data
      setFormData({
        id: 0,
        code: "",
        name: "",
        categoryId: 0,
        state: "NEW",
        capacity: 0,
        dailyPrice: 0,
        depotId: 0,
      });

      fetchEquipments();
    } catch (error) {
      console.error("Error saving equipment:", error);
      alert("Failed to save equipment. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEquipment(id);
      fetchEquipments();
    } catch (error) {
      console.error("Error deleting equipment:", error);
      alert("Failed to delete equipment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Manage Cars</h1>
      <form className="bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Car Code"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="dailyPrice"
            value={formData.dailyPrice}
            onChange={handleChange}
            placeholder="Daily Price"
            className="input input-bordered w-full"
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleSelectChange}
            className="select select-bordered w-full"
          >
            <option value="NEW">New</option>
            <option value="USED">Used</option>
            <option value="DAMAGED">Damaged</option>
          </select>

          {/* Category Select */}
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleSelectChange}
            className="select select-bordered w-full"
          >
            <option value="0">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.designation}
              </option>
            ))}
          </select>

          {/* Depot Select */}
          <select
            name="depotId"
            value={formData.depotId}
            onChange={handleSelectChange}
            className="select select-bordered w-full"
          >
            <option value="0">Select Depot</option>
            {depots.map((depot) => (
              <option key={depot.id} value={depot.id}>
                {depot.code}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex justify-between">
          <button type="submit" className="btn btn-primary">
            {formData.id ? "Update Car" : "Add Car"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">All Cars</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Daily Price</th>
            <th>State</th>
            <th>Category</th>
            <th>Depot</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td>{equipment.code}</td>
              <td>{equipment.name}</td>
              <td>{equipment.capacity}</td>
              <td>{equipment.dailyPrice}</td>
              <td>{equipment.state}</td>
              <td>{equipment.category?.designation || "N/A"}</td>
              <td>{equipment.depot?.code || "N/A"}</td>
              <td>
                <button
                  onClick={() => setFormData(equipment)}
                  className="btn btn-info btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(equipment.id)}
                  className="btn btn-error btn-sm ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCarsPage;
