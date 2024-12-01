import { createSupplier, getSuppliers } from "@/lib/server";
import { useState, useEffect } from "react";

const SupplierComponent = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    code: "",
    name: "",
    surname: "",
    address: "",
    phone: "",
    fax: "",
    email: "",
  });

  // Fetch suppliers on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await getSuppliers();
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  // Handle create supplier
  const handleCreateSupplier = async () => {
    try {
      const createdSupplier = await createSupplier(newSupplier);
      setSuppliers((prevSuppliers) => [...prevSuppliers, createdSupplier]);
      setIsModalOpen(false); // Close modal after creation
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Add Supplier Button */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Supplier
      </button>

      {/* Suppliers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="card w-full bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">{supplier.name} {supplier.surname}</h2>
              <p><strong>Code:</strong> {supplier.code}</p>
              <p><strong>Phone:</strong> {supplier.phone}</p>
              <p><strong>Email:</strong> {supplier.email}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating Supplier */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl font-semibold mb-4">Create New Supplier</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Supplier Code"
                  value={newSupplier.code}
                  onChange={(e) => setNewSupplier({ ...newSupplier, code: e.target.value })}
                />
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Supplier Name"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                />
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Supplier Surname"
                  value={newSupplier.surname}
                  onChange={(e) => setNewSupplier({ ...newSupplier, surname: e.target.value })}
                />
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Address"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                />
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Phone"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                />
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Fax"
                  value={newSupplier.fax}
                  onChange={(e) => setNewSupplier({ ...newSupplier, fax: e.target.value })}
                />
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateSupplier}>
                  Create Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierComponent;
