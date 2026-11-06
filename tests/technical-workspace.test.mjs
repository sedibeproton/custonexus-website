import assert from "node:assert/strict";
import test from "node:test";
import { canIssueCertificate, dateOnly, validateCertificateInput, validateJobInput } from "../lib/business/technical-validation.ts";

test("certificate issuance is limited to completed jobs",()=>{assert.equal(canIssueCertificate("COMPLETED"),true);assert.equal(canIssueCertificate("IN_PROGRESS"),false);assert.equal(canIssueCertificate("DRAFT"),false);});
test("job-card validation normalises controlled values",()=>{const job=validateJobInput({clientId:"client-1",title:" Monitor service ",jobType:"service",status:"in_progress",receivedDate:"2026-11-06",technicianName:"Technician"});assert.equal(job.title,"Monitor service");assert.equal(job.jobType,"SERVICE");assert.equal(job.status,"IN_PROGRESS");});
test("invalid dates and job types are rejected",()=>{assert.throws(()=>dateOnly("06/11/2026","Date"),/valid date/);assert.throws(()=>validateJobInput({clientId:"1",title:"x",jobType:"invalid",receivedDate:"2026-11-06",technicianName:"x"}),/job type/);});
test("certificate records require a controlled type and statement",()=>{const certificate=validateCertificateInput({certificateType:"inspection_record",result:"pass",title:"Inspection record",statement:"Inspection completed.",issueDate:"2026-11-06",issuedByName:"Technician"});assert.equal(certificate.certificateType,"INSPECTION_RECORD");assert.equal(certificate.result,"PASS");assert.equal(certificate.validUntil,null);});
