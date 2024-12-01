"use server"

import { Equipment } from "@prisma/client";
import prisma from "./client";



// Fetch categories from the database
export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Fetch all depots
export const getDepots = async () => {
  return await prisma.depot.findMany({
    select: {
      id: true,
      code: true,
      address: true,
      phone: true,
      fax: true,
      managerId: true, // managerId is a string, referencing User.id
    },
  });
};


// Create Equipment (Car)
export const createEquipment = async (data: Equipment) => {
  return await prisma.equipment.create({
    data: {
      code: data.code,
      name: data.name,
      categoryId: data.categoryId,
      state: data.state,
      capacity: data.capacity,
      dailyPrice: data.dailyPrice,
      depotId: data.depotId, // Make sure depotId is passed as Int
    },
  });
};

// Get all Equipments (Cars)
export const getEquipments = async () => {
  return await prisma.equipment.findMany({
    include: {
      depot: {
        select: { id: true, code: true, address: true, phone: true, fax: true, managerId: true },
      },
      category: {
        select: { id: true, code: true, designation: true },
      },
    },
  });
};

// Update Equipment (Car)
export const updateEquipment = async (data: Equipment) => {
  return await prisma.equipment.update({
    where: { id: data.id },
    data: {
      code: data.code,
      name: data.name,
      categoryId: data.categoryId,
      state: data.state,
      capacity: data.capacity,
      dailyPrice: data.dailyPrice,
      depotId: data.depotId, 
    },
  });
};


export const deleteEquipment = async (id: number) => {
  return await prisma.equipment.delete({
    where: { id },
  });
};


