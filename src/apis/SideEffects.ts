import api from "../../axios";

export const updateSideEffects = async (sideEffectId: number) => {
  try {
    const sideffect = await api.patch(`/side-effects/update/${sideEffectId}`);
    if (!sideffect.data) {
      throw new Error("no data received from the server");
    }
    return sideffect.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update side effects: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while updating side effects");
  }
};

// get side effect by id

export const getSideEffectById = async (sideEffectId: number) => {
  try {
    const sideEffect = await api.get(`/side-effects/${sideEffectId}`);
    if (!sideEffect.data) {
      throw new Error("no data received from the server");
    }
    return sideEffect.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch side effect: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching side effect");
  }
};

//  delete side effect by id
export const deleteSideEffectById = async (sideEffectId: number) => {
  try {
    const sideEffect = await api.delete(
      `/side-effects/delete-side-effect/${sideEffectId}`
    );
    if (!sideEffect.data) {
      throw new Error("no data received from the server");
    }
    return sideEffect.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch side effect: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching side effect");
  }
};

// Define the proper payload type for creating a side effect
export interface SideEffectPayload {
  medication_id: number;
  datetime: string;
  side_effect: string;
  severity: "Mild" | "Moderate" | "Severe";
  duration: number | null;
  notes: string | null;
}

// create sideeffect
export const createSideEffect = async (payload: SideEffectPayload) => {
  try {
    const sideEffect = await api.post("/side-effects/create", payload);
    if (!sideEffect.data) {
      throw new Error("no data received from the server");
    }
    return sideEffect.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create side effect: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while creating side effect");
  }
};
