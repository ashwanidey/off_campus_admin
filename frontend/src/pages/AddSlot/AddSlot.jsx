"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Check, Save, RefreshCw } from "lucide-react";
import {
  getAllTimeSlots,
  updateTimeSlot,
  deleteTimeSlot,
  addTimeSlot,
  resetToInitialData,
} from "./mockApiService";

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddSlot = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modifiedSlots, setModifiedSlots] = useState({});
  const [showAddNew, setShowAddNew] = useState(false);
  const [newTiming, setNewTiming] = useState("");
  const [newDays, setNewDays] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = () => {
    setLoading(true);
    // Get data from our mock API (localStorage)
    const data = getAllTimeSlots();
    setSlots(data);
    setModifiedSlots({});
    setLoading(false);
  };

  const handleDayToggle = (slotId, day) => {
    //Here it searches for the particular slot, from the slots. Slots are the object, out of which we use slot_id to match to the slot.
    setSlots(
      slots.map((slot) => {
        if (slot._id === slotId) {
          //here updatedDays, check if the day is already checked, then it filters out the already checked and takes the new added date.
          const updatedDays = slot.days.includes(day)
            ? slot.days.filter((d) => d !== day)
            : [...slot.days, day];

          // Mark this slot as modified
          setModifiedSlots({
            ...modifiedSlots,
            [slotId]: true,
          });

          return { ...slot, days: updatedDays };
        }
        return slot;
      })
    );
  };

  const handleSaveSlot = async (slotId) => {
    // Find the slot that was modified
    const modifiedSlot = slots.find((slot) => slot._id === slotId);

    // Update the slot in localStorage via our mock API
    await updateTimeSlot(slotId, { days: modifiedSlot.days });

    // Remove this slot from the modified slots list
    const updatedModifiedSlots = { ...modifiedSlots };
    delete updatedModifiedSlots[slotId];
    setModifiedSlots(updatedModifiedSlots);
  };

  const handleDeleteSlot = async (slotId) => {
    // Delete the slot from localStorage via our mock API
    await deleteTimeSlot(slotId);

    // Update the UI
    setSlots(slots.filter((slot) => slot._id !== slotId));

    // Remove from modified slots if it was there
    if (modifiedSlots[slotId]) {
      const updatedModifiedSlots = { ...modifiedSlots };
      delete updatedModifiedSlots[slotId];
      setModifiedSlots(updatedModifiedSlots);
    }
  };

  const handleAddNewSlot = async () => {
    if (newTiming && newDays.length > 0) {
      // Add the new slot to localStorage via our mock API
      const result = await addTimeSlot({
        days: newDays,
        timing: newTiming,
      });

      // Update the UI with all slots including the new one
      setSlots(result.data);

      // Reset form
      setNewTiming("");
      setNewDays([]);
      setShowAddNew(false);
    }
  };

  const handleResetData = async () => {
    if (
      confirm(
        "Are you sure you want to reset to the initial data? All changes will be lost."
      )
    ) {
      const result = await resetToInitialData();
      setSlots(result.data);
      setModifiedSlots({});
    }
  };

  const toggleNewDay = (day) => {
    if (newDays.includes(day)) {
      setNewDays(newDays.filter((d) => d !== day));
    } else {
      setNewDays([...newDays, day]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className=" inset-0 flex items-center justify-center bg-gray-900 px-4 md:px-2">
      <div className="h-auto w-5xl bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-between items-center mb-8 border-b border-purple-700 pb-4">
            <h1 className="text-3xl font-bold text-purple-400">Add Slots</h1>
            <button
              onClick={handleResetData}
              className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md transition-colors"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Data
            </button>
          </div>

          <div className="space-y-6">
            {slots.map((slot) => (
              <div
                key={slot._id}
                className="bg-gray-800 rounded-lg p-6 shadow-lg border border-purple-800"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-purple-300">
                    {slot.timing}
                  </h2>
                  <div className="flex space-x-3">
                    {modifiedSlots[slot._id] && (
                      <button
                        onClick={() => handleSaveSlot(slot._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md flex items-center transition-colors"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSlot(slot._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center transition-colors"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {allDays.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${
                          slot.days.includes(day)
                            ? "bg-purple-600 border-purple-400"
                            : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                        }`}
                        onClick={() => handleDayToggle(slot._id, day)}
                      >
                        {slot.days.includes(day) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span
                        className={
                          slot.days.includes(day)
                            ? "text-purple-300"
                            : "text-gray-300"
                        }
                      >
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {showAddNew ? (
            <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg border border-purple-800">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                Add New Time Slot
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time
                </label>
                <input
                  type="text"
                  value={newTiming}
                  onChange={(e) => setNewTiming(e.target.value)}
                  placeholder="e.g. 3:00 PM"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Days
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {allDays.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${
                          newDays.includes(day)
                            ? "bg-purple-600 border-purple-400"
                            : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                        }`}
                        onClick={() => toggleNewDay(day)}
                      >
                        {newDays.includes(day) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span
                        className={
                          newDays.includes(day)
                            ? "text-purple-300"
                            : "text-gray-300"
                        }
                      >
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddNewSlot}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowAddNew(false);
                    setNewTiming("");
                    setNewDays([]);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddNew(true)}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md flex items-center transition-colors"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Slots
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSlot;
