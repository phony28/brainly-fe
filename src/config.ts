const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const BACKEND_URL = configuredBackendUrl.replace(/\/+$/, "");
