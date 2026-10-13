import assert from "node:assert/strict";
import test from "node:test";
import {changeCalendarDate,daysInMonth,monthGrid,monthIntersectsRange,shiftMonth} from "../lib/consultation-calendar.ts";

test("month navigation crosses year boundaries",()=>{assert.equal(shiftMonth("2026-01",-1),"2025-12");assert.equal(shiftMonth("2026-12",1),"2027-01")});
test("leap years and ordinary February lengths are correct",()=>{assert.equal(daysInMonth(2028,2),29);assert.equal(daysInMonth(2027,2),28);assert.equal(daysInMonth(2100,2),28)});
test("calendar grid starts on Monday and includes month boundaries",()=>{const grid=monthGrid("2026-11");assert.equal(grid.length,42);assert.equal(grid[0].date,"2026-10-26");assert.equal(grid[6].date,"2026-11-01");assert.equal(grid.at(-1).date,"2026-12-06")});
test("month range checks disable months outside booking limits",()=>{assert.equal(monthIntersectsRange("2026-10","2026-10-13","2026-12-12"),true);assert.equal(monthIntersectsRange("2026-09","2026-10-13","2026-12-12"),false);assert.equal(monthIntersectsRange("2027-01","2026-10-13","2026-12-12"),false)});
test("changing dates clears a stale selected slot",()=>{assert.deepEqual(changeCalendarDate("2026-10-20"),{date:"2026-10-20",selectedSlot:""})});
