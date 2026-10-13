import assert from "node:assert/strict";
import test from "node:test";
import {CONSULTATION_BOOKING_FLAG,isConsultationBookingEnabled} from "../lib/consultation-feature.ts";

test("consultation booking is disabled when the server flag is unset or invalid",()=>{
  const previous=process.env[CONSULTATION_BOOKING_FLAG];
  try{
    delete process.env[CONSULTATION_BOOKING_FLAG];
    assert.equal(isConsultationBookingEnabled(),false);
    process.env[CONSULTATION_BOOKING_FLAG]="false";
    assert.equal(isConsultationBookingEnabled(),false);
    process.env[CONSULTATION_BOOKING_FLAG]="yes";
    assert.equal(isConsultationBookingEnabled(),false);
  }finally{
    if(previous===undefined)delete process.env[CONSULTATION_BOOKING_FLAG];
    else process.env[CONSULTATION_BOOKING_FLAG]=previous;
  }
});

test("consultation booking is enabled only by an explicit true value",()=>{
  const previous=process.env[CONSULTATION_BOOKING_FLAG];
  try{
    process.env[CONSULTATION_BOOKING_FLAG]=" TRUE ";
    assert.equal(isConsultationBookingEnabled(),true);
  }finally{
    if(previous===undefined)delete process.env[CONSULTATION_BOOKING_FLAG];
    else process.env[CONSULTATION_BOOKING_FLAG]=previous;
  }
});
