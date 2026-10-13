type Entry={count:number;resetAt:number};
const globalRate=globalThis as typeof globalThis&{consultationRateLimits?:Map<string,Entry>};
const store=globalRate.consultationRateLimits??=new Map<string,Entry>();
export function consumeBookingAttempt(key:string,limit=8,windowMs=15*60_000){const now=Date.now();const existing=store.get(key);if(!existing||existing.resetAt<=now){store.set(key,{count:1,resetAt:now+windowMs});return true}if(existing.count>=limit)return false;existing.count+=1;return true}
export function requestIp(request:Request){return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||request.headers.get("x-real-ip")?.trim()||"unknown"}
