import { createCategory, getCategories } from '@/lib/server'; // Make sure to implement getCategories in server.ts
import React, { useState, useEffect } from 'react';

interface Category {
  id: number;
  code: string;
  designation: string;
}

const CategoryManagement = () => {
  const [designation, setDesignation] = useState('');
  const [code, setCode] = useState('');
  const [categories, setCategories] = useState<Category[]>([]); // Specify type here

  // Fetch categories from the database
  const fetchCategories = async () => {
    try {
      const categoriesList = await getCategories(); // Make sure this function returns all categories
      setCategories(categoriesList);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  const handleCreateCategory = async () => {
    try {
      if (designation && code) {
        const newCategory = await createCategory(designation, code);
        setCategories([...categories, newCategory]); // Add new category to the state
        setDesignation('');
        setCode('');
        fetchCategories(); // Refetch categories after creating a new one
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-lg rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-base-900">Category Management</h1>
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="input input-bordered w-full bg-base-100 text-base-900"
        />
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input input-bordered w-full bg-base-100 text-base-900"
        />
        <button 
          onClick={handleCreateCategory}
          className="btn btn-primary w-full"
        >
          Create Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100">
          <thead>
            <tr>
              <th>Code</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.code}</td>
                <td>{category.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
