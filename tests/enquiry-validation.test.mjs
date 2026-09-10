import assert from "node:assert/strict";
import test from "node:test";

import {
  isValidPhone,
  isValidWebsite,
  normalisePhone,
  validateEnquiryContact,
  validateEnquiryDetails,
} from "../lib/enquiry-validation.ts";

test("phone validation accepts realistic local and international formats", () => {
  assert.equal(isValidPhone("072 270 1087"), true);
  assert.equal(isValidPhone("+27 72 270 1087"), true);
  assert.equal(normalisePhone("+27 (72) 270-1087"), "+27722701087");
  assert.equal(isValidPhone("123"), false);
  assert.equal(isValidPhone("0000000000"), false);
  assert.equal(isValidPhone("phone number"), false);
});

test("contact validation requires usable contact details", () => {
  assert.deepEqual(validateEnquiryContact({ fullName: "Goodwill Sedibe", company: "CustoNexus Technologies", email: "info@custonexus.com", preferredContact: "email" }), {});
  assert.ok(validateEnquiryContact({ fullName: "1", company: "", email: "wrong", preferredContact: "whatsapp" }).fullName);
  assert.ok(validateEnquiryContact({ fullName: "1", company: "", email: "wrong", preferredContact: "whatsapp" }).phone);
});

test("project validation rejects thin descriptions and malformed website URLs", () => {
  assert.equal(isValidWebsite("custonexus.com"), true);
  assert.equal(isValidWebsite("https://custonexus.com/contact"), true);
  assert.equal(isValidWebsite("not a website"), false);
  assert.deepEqual(validateEnquiryDetails({ requirements: "We need a customer booking website with enquiry management.", timeline: "1–3 months", currentWebsite: "custonexus.com" }), {});
  assert.ok(validateEnquiryDetails({ requirements: "Website", timeline: "", currentWebsite: "invalid" }).requirements);
});
