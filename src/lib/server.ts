"use server"


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCategory = async (designation: string, code: string) => {
    try {
      const category = await prisma.category.create({
        data: {
          designation,  // Required field
          code,          // Required field (make sure it is unique)
        },
      });
      return category;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };

// Fetch all categories
export const getCategories = async () => {
  return await prisma.category.findMany();
};

// Update a category
export const updateCategory = async (id: number, designation: string) => {
  return await prisma.category.update({
    where: { id },
    data: { designation },
  });
};

// Delete a category
export const deleteCategory = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  });
};





export const createEquipment = async (equipmentData: {
  code: string;
  name: string;
  state: string;  // Keep state as string from frontend
  capacity: number;
  dailyPrice: number;
  categoryId: number;
  depotId: number;
}) => {
  try {
    // Map the string to the corresponding enum value
    const equipmentState = equipmentData.state.toUpperCase() as 'NEW' | 'USED' | 'DAMAGED'; 

    const newEquipment = await prisma.equipment.create({
      data: {
        code: equipmentData.code,
        name: equipmentData.name,
        state: equipmentState,  // Now it's an enum value
        capacity: equipmentData.capacity,
        dailyPrice: equipmentData.dailyPrice,
        categoryId: equipmentData.categoryId,
        depotId: equipmentData.depotId,
      },
    });
    return newEquipment;
  } catch (error) {
    throw new Error('Error creating equipment: ' + error);
  }
};

export const getEquipmentList = async () => {
  try {
    const equipments = await prisma.equipment.findMany({
      include: {
        category: true,
        depot: true,
      },
    });
    return equipments;
  } catch (error) {
    throw new Error('Error fetching equipment list: ' + error);
  }
};





// Create a new depot
export const createDepot = async (depotData: {
  code: string;
  address: string;
  phone: string;
  fax: string;
  managerId: string;  // Assuming managerId is a user ID
}) => {
  try {
    const newDepot = await prisma.depot.create({
      data: {
        code: depotData.code,
        address: depotData.address,
        phone: depotData.phone,
        fax: depotData.fax,
        managerId: depotData.managerId,
      },
    });
    return newDepot;
  } catch (error) {
    throw new Error('Error creating depot: ' + error);
  }
};

// Get all depots
export const getAllDepots = async () => {
  try {
    const depots = await prisma.depot.findMany();
    return depots;
  } catch (error) {
    throw new Error('Error fetching depots: ' + error);
  }
};


export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true, // Assuming the `User` model has a `name` field
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};



export const getDepots = async () => {
  try {
    const depots = await prisma.depot.findMany({
      select: {
        id: true,
        code: true,
        address: true,
        phone: true,
        // If you want to include manager details, you can select related fields like:
        managerId: true, // Or manager details (e.g., manager name) if you need
      },
    });
    return depots;
  } catch (error) {
    console.error('Error fetching depots:', error);
    throw new Error('Failed to fetch depots');
  }
};


export const createSupplier = async ({
  code,
  name,
  surname,
  address,
  phone,
  fax,
  email
}: {
  code: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
}) => {
  try {
    const supplier = await prisma.supplier.create({
      data: {
        code,
        name,
        surname,
        address,
        phone,
        fax,
        email
      },
    });
    return supplier;
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
};

// Get all suppliers
export const getSuppliers = async () => {
  try {
    const suppliers = await prisma.supplier.findMany();
    return suppliers;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw new Error("Failed to fetch suppliers");
  }
};

// Update a supplier
export const updateSupplier = async (
  id: number,
  { code, name, surname, address, phone, fax, email }: 
  { code: string; name: string; surname: string; address: string; phone: string; fax: string; email: string; }
) => {
  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: { code, name, surname, address, phone, fax, email },
    });
    return updatedSupplier;
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  }
};

// Delete a supplier
export const deleteSupplier = async (id: number) => {
  try {
    await prisma.supplier.delete({
      where: { id },
    });
    return { message: "Supplier deleted successfully" };
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw new Error("Failed to delete supplier");
  }
};