import { calculateFinancialTotals, parseMoneyToCents, parseQuantityToMilli } from "@/lib/business/finance";

export function text(value: unknown, label: string, max=2000, required=true) {
  const result=typeof value==="string"?value.trim():"";
  if(required&&!result)throw new Error(`${label} is required.`);
  if(result.length>max)throw new Error(`${label} is too long.`);
  return result;
}
export function email(value:unknown){const result=text(value,"Email",200);if(!/^\S+@\S+\.\S+$/.test(result))throw new Error("Enter a valid email address.");return result.toLowerCase();}
export function isoDate(value:unknown,label:string){const result=text(value,label,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(result)||Number.isNaN(new Date(`${result}T00:00:00Z`).valueOf()))throw new Error(`${label} is invalid.`);return result;}

export function parseDocumentInput(body:Record<string,unknown>, vatBasisPoints:number){
  const rawLines=Array.isArray(body.lines)?body.lines:[];
  const lines=rawLines.map((raw,index)=>{const line=raw as Record<string,unknown>;return {description:text(line.description,`Line ${index+1} description`,500),quantityMilli:parseQuantityToMilli(line.quantity),unit:text(line.unit,`Line ${index+1} unit`,40),unitPriceCents:parseMoneyToCents(line.unitPrice),discountCents:parseMoneyToCents(line.discount||"0")};});
  const totals=calculateFinancialTotals(lines,vatBasisPoints);
  return {clientId:text(body.clientId,"Client",100),reference:text(body.reference,"Reference",160,false),description:text(body.description,"Description",2000,false),issueDate:isoDate(body.issueDate,"Issue date"),secondaryDate:isoDate(body.secondaryDate,"Expiry or due date"),notes:text(body.notes,"Notes",5000,false),terms:text(body.terms,"Terms",10000,false),totals};
}
