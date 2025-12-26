import api from "./axios";

export const createAssignment = async (assignment) => {
    return api.post("/assignments", assignment);
} 

export const getAllAssignments = async () => {
    return api.get("/assignments/my");
}


