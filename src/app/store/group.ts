import { create } from "zustand";
import { Grupo } from "../services/groups";
import { Status } from "../services/status";

type UseGroup = {
  groups: Grupo[];
  setGroups: (groups: Grupo[]) => void;
  statuses: Status[];
  setStatuses: (statuses: Status[]) => void;
};

const useGroups = create<UseGroup>((set) => ({
  groups: [],
  setGroups: (groups: Grupo[]) => set({ groups }),
  statuses: [],
  setStatuses: (statuses: Status[]) => set({ statuses }),
}));

export default useGroups;
