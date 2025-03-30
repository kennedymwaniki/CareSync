import { PropsWithChildren } from "react";
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

// create sideeffect
// ! fix the payload to mathc the load needed in postman (/side-effects/create)
export const createSideEffect = async (payload: PropsWithChildren) => {
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
