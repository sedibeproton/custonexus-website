import type { ClientRecord, CompanySettings } from "@/lib/business/types";

export const jobTypes = ["INSPECTION", "SERVICE", "CALIBRATION", "REPAIR", "INSTALLATION", "OTHER"] as const;
export const jobStatuses = ["DRAFT", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
export const certificateTypes = ["SERVICE_RECORD", "CALIBRATION_RECORD", "INSPECTION_RECORD", "COMPLETION_CERTIFICATE"] as const;
export const certificateResults = ["PASS", "FAIL", "NOT_APPLICABLE"] as const;
export type JobType = typeof jobTypes[number];
export type JobStatus = typeof jobStatuses[number];
export type CertificateType = typeof certificateTypes[number];
export type CertificateResult = typeof certificateResults[number];

export type TechnicalJobCard = {
  id:string; jobNumber:string; clientId:string; clientName:string; title:string; jobType:JobType; status:JobStatus;
  equipmentName:string|null; manufacturer:string|null; modelNumber:string|null; serialNumber:string|null; assetNumber:string|null;
  serviceLocation:string|null; reportedIssue:string|null; workPerformed:string|null; findings:string|null; recommendations:string|null;
  receivedDate:string; serviceDate:string|null; completedAt:string|null; technicianName:string; createdAt:string; updatedAt:string;
};

export type TechnicalCertificate = {
  id:string; certificateNumber:string; jobCardId:string; certificateType:CertificateType; result:CertificateResult; title:string;
  statement:string; standardsReference:string|null; issueDate:string; validUntil:string|null; issuedByName:string;
  pdfObjectKey:string; issuedAt:string; voidedAt:string|null; voidReason:string|null;
};

export type TechnicalCertificateSnapshot = {
  certificate: Omit<TechnicalCertificate,"id"|"pdfObjectKey"|"issuedAt"|"voidedAt"|"voidReason">;
  company: CompanySettings; client: ClientRecord; job: TechnicalJobCard;
};
