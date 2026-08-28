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
  const lines=rawLines.map((raw,index)=>{const line=raw as Record<string,unknown>;const quantityMilli=parseQuantityToMilli(line.quantity),unitPriceCents=parseMoneyToCents(line.unitPrice),discountType=line.discountType==="PERCENT"?"PERCENT" as const:"CASH" as const;let discountBasisPoints=0,discountCents=0;if(discountType==="PERCENT"){discountBasisPoints=parseMoneyToCents(line.discount||"0");if(discountBasisPoints>10000)throw new Error(`Line ${index+1} discount cannot exceed 100 percent.`);const gross=(BigInt(quantityMilli)*BigInt(unitPriceCents)+BigInt(500))/BigInt(1000);discountCents=Number((gross*BigInt(discountBasisPoints)+BigInt(5000))/BigInt(10000));}else discountCents=parseMoneyToCents(line.discount||"0");return {description:text(line.description,`Line ${index+1} description`,500),quantityMilli,unit:text(line.unit,`Line ${index+1} unit`,40),unitPriceCents,discountCents,discountType,discountBasisPoints};});
  const taxType=["STANDARD","ZERO","EXEMPT","NONE","CUSTOM"].includes(String(body.taxType))?String(body.taxType):"STANDARD";
  const taxBasisPoints=taxType==="STANDARD"?vatBasisPoints:taxType==="CUSTOM"?parseMoneyToCents(body.customTaxPercent||"0"):0;
  if(taxBasisPoints>10000)throw new Error("Tax cannot exceed 100 percent.");
  const taxLabel=taxType==="STANDARD"?"VAT":taxType==="ZERO"?"VAT (zero-rated)":taxType==="EXEMPT"?"Tax exempt":taxType==="CUSTOM"?text(body.customTaxLabel,"Tax label",60):"No tax";
  const bankAccountId=text(body.bankAccountId,"Bank account",100,false)||null;
  const totals=calculateFinancialTotals(lines,taxBasisPoints);
  return {clientId:text(body.clientId,"Client",100),reference:text(body.reference,"Reference",160,false),description:text(body.description,"Description",2000,false),issueDate:isoDate(body.issueDate,"Issue date"),secondaryDate:isoDate(body.secondaryDate,"Expiry or due date"),notes:text(body.notes,"Notes",5000,false),terms:text(body.terms,"Terms",10000,false),taxType,taxLabel,taxBasisPoints,bankAccountId,totals};
}
