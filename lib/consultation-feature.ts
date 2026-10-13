export const CONSULTATION_BOOKING_FLAG="CONSULTATION_BOOKING_ENABLED";
export const consultationDisabledMessage="Online consultation requests are temporarily unavailable while we complete a secure system update. Please contact CustoNexus directly.";
export function isConsultationBookingEnabled(){return process.env[CONSULTATION_BOOKING_FLAG]?.trim().toLowerCase()==="true"}
