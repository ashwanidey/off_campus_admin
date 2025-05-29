// Mock API service that uses localStorage to persist data

// Initial mock data
const initialData = [
  {
    _id: "1",
    days: ["Monday", "Tuesday"],
    timing: "11:00 AM",
  },
  {
    _id: "2",
    days: ["Saturday", "Sunday"],
    timing: "12:00 PM",
  },
  // {
  //   _id: "3",
  //   days: ["Wednesday", "Friday"],
  //   timing: "2:00 PM",
  // },
  // {
  //   _id: "4",
  //   days: ["Monday", "Thursday"],
  //   timing: "4:00 PM",
  // },
];

// Initialize localStorage with mock data if it doesn't exist
const initializeData = () => {
  if (!localStorage.getItem("timeSlots")) {
    localStorage.setItem("timeSlots", JSON.stringify(initialData));
  }
};

// Get all time slots
export const getAllTimeSlots = () => {
  initializeData();
  return JSON.parse(localStorage.getItem("timeSlots") || "[]");
};

// Update a specific time slot
export const updateTimeSlot = (slotId, updatedData) => {
  const slots = getAllTimeSlots();
  const updatedSlots = slots.map((slot) =>
    slot._id === slotId ? { ...slot, ...updatedData } : slot
  );
  localStorage.setItem("timeSlots", JSON.stringify(updatedSlots));
  return { success: true, data: updatedSlots };
};

// Delete a time slot
export const deleteTimeSlot = (slotId) => {
  const slots = getAllTimeSlots();
  const updatedSlots = slots.filter((slot) => slot._id !== slotId);
  localStorage.setItem("timeSlots", JSON.stringify(updatedSlots));
  return { success: true, data: updatedSlots };
};

// Add a new time slot
export const addTimeSlot = (newSlotData) => {
  const slots = getAllTimeSlots();
  // Generate a unique ID
  const newId = Date.now().toString();
  const newSlot = {
    _id: newId,
    ...newSlotData,
  };
  const updatedSlots = [...slots, newSlot];
  localStorage.setItem("timeSlots", JSON.stringify(updatedSlots));
  return { success: true, data: updatedSlots, newSlot };
};

// Reset to initial data (for testing)
export const resetToInitialData = () => {
  localStorage.setItem("timeSlots", JSON.stringify(initialData));
  return { success: true, data: initialData };
};
