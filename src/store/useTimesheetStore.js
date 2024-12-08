import { create } from "zustand";

const useTimesheetStore = create((set) => ({
  reactData: [],
  setReactData: (reactData) => set({ reactData }),
  nodeData: [],
  setNodeData: (nodeData) => set({ nodeData }),
}));

export default useTimesheetStore;
