import { readFile } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
import PDFDocument from "pdfkit";

import type { FinancialSnapshot } from "@/lib/business/types";

const navy="#08265c",blue="#145dcc",green="#16865b",slate="#334155",light="#eaf1fb";
const money=(cents:number,currency:string)=>new Intl.NumberFormat("en-ZA",{style:"currency",currency}).format(cents/100);
const quantity=(milli:number)=>Number((milli/1000).toFixed(3)).toString();

async function logoBuffer(path:string){const publicRoot=resolve(process.cwd(),"public");const requested=resolve(publicRoot,path.replace(/^\/+/,""));const rel=relative(publicRoot,requested);if(rel.startsWith("..")||isAbsolute(rel))throw new Error("Invalid company logo path.");return readFile(requested);}

export async function generateFinancialPdf(snapshot:FinancialSnapshot){
  const doc=new PDFDocument({size:"A4",margin:42,info:{Title:`${snapshot.kind==="quote"?"Quotation":"Invoice"} ${snapshot.number}`,Author:"CustoNexus Technologies"}});
  const chunks:Buffer[]=[];doc.on("data",chunk=>chunks.push(Buffer.from(chunk)));const complete=new Promise<Buffer>((resolveBuffer,reject)=>{doc.on("end",()=>resolveBuffer(Buffer.concat(chunks)));doc.on("error",reject);});
  const logo=await logoBuffer(snapshot.company.logoPath||"/logos/logo-full-horizontal.png");
  doc.image(logo,42,38,{fit:[190,62]});
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(25).text(snapshot.kind==="quote"?"QUOTATION":"INVOICE",340,45,{width:210,align:"right"});
  doc.fillColor(blue).fontSize(12).text(snapshot.number,340,78,{width:210,align:"right"});
  doc.moveTo(42,115).lineTo(553,115).lineWidth(2).strokeColor(blue).stroke();
  const companyIdentity=[snapshot.company.legalName,snapshot.company.registrationNumber?`Registration: ${snapshot.company.registrationNumber}`:null,snapshot.company.vatNumber?`VAT: ${snapshot.company.vatNumber}`:null,`${snapshot.company.email}  |  ${snapshot.company.phone}`,snapshot.company.website].filter(Boolean).join("\n");
  doc.fillColor(slate).font("Helvetica").fontSize(8.5).text(companyIdentity,42,128,{width:255,lineGap:2});
  doc.font("Helvetica-Bold").fillColor(navy).text(snapshot.kind==="quote"?"ISSUE DATE":"INVOICE DATE",340,128,{width:100}).text(snapshot.kind==="quote"?"VALID UNTIL":"DUE DATE",340,150,{width:100}).font("Helvetica").fillColor(slate).text(snapshot.issueDate,450,128,{width:100,align:"right"}).text(snapshot.secondaryDate,450,150,{width:100,align:"right"});
  if(snapshot.reference)doc.font("Helvetica-Bold").fillColor(navy).text("REFERENCE",340,172,{width:100}).font("Helvetica").fillColor(slate).text(snapshot.reference,430,172,{width:120,align:"right"});
  doc.roundedRect(42,220,511,88,8).fill(light);doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text("PREPARED FOR",58,236).fontSize(12).text(snapshot.client.companyName,58,255).font("Helvetica").fontSize(9).fillColor(slate).text(snapshot.client.contactPerson,58,273).text(`${snapshot.client.email}\n${snapshot.client.phone}`,300,248,{width:235,lineGap:3});
  let y=332;doc.rect(42,y,511,25).fill(navy);doc.fillColor("white").font("Helvetica-Bold").fontSize(8).text("DESCRIPTION",50,y+8,{width:220}).text("QTY",280,y+8,{width:45,align:"right"}).text("UNIT",330,y+8,{width:50,align:"right"}).text("UNIT PRICE",385,y+8,{width:75,align:"right"}).text("AMOUNT",465,y+8,{width:80,align:"right"});y+=25;
  for(const line of snapshot.lines){if(y>680){doc.addPage();y=55;}const rowHeight=Math.max(32,doc.heightOfString(line.description,{width:220})+14);doc.rect(42,y,511,rowHeight).fillAndStroke(y%2===0?"#ffffff":"#f8fafc","#dbe4f0");doc.fillColor(slate).font("Helvetica").fontSize(8.5).text(line.description,50,y+9,{width:220}).text(quantity(line.quantityMilli),280,y+9,{width:45,align:"right"}).text(line.unit,330,y+9,{width:50,align:"right"}).text(money(line.unitPriceCents,snapshot.company.currency),385,y+9,{width:75,align:"right"}).text(money(line.lineTotalCents,snapshot.company.currency),465,y+9,{width:80,align:"right"});y+=rowHeight;}
  y+=16;const summaryX=350;const summary=(label:string,value:number,bold=false)=>{doc.fillColor(bold?navy:slate).font(bold?"Helvetica-Bold":"Helvetica").fontSize(bold?11:9).text(label,summaryX,y,{width:90}).text(money(value,snapshot.company.currency),445,y,{width:100,align:"right"});y+=bold?25:18;};summary("Subtotal",snapshot.subtotalCents);if(snapshot.discountCents)summary("Discount",-snapshot.discountCents);if(snapshot.taxCents||snapshot.taxType!=="NONE")summary(snapshot.taxLabel,snapshot.taxCents);doc.moveTo(summaryX,y-4).lineTo(553,y-4).strokeColor(blue).stroke();summary("TOTAL",snapshot.totalCents,true);if(snapshot.kind==="invoice"){summary("Amount paid",snapshot.amountPaidCents||0);summary("BALANCE DUE",snapshot.balanceDueCents??snapshot.totalCents,true);}
  const bank=snapshot.bankAccount;if(bank){if(y>610){doc.addPage();y=55;}doc.roundedRect(42,y,270,130,7).fill("#f0fdf7");doc.fillColor(green).font("Helvetica-Bold").fontSize(10).text("PAYMENT DETAILS",56,y+14);doc.fillColor(slate).font("Helvetica").fontSize(8.5).text(`Bank: ${bank.bankName}\nAccount name: ${bank.accountName}\nAccount number: ${bank.accountNumber}\nBranch code: ${bank.branchCode||""}\nAccount type: ${bank.accountType||""}\nPayment reference: ${snapshot.number}${bank.paymentReferenceInstructions?`\n${bank.paymentReferenceInstructions}`:""}`,56,y+34,{width:240,lineGap:2});}
  const termsY=Math.min(Math.max(y+18,650),735);doc.fillColor(navy).font("Helvetica-Bold").fontSize(9).text(snapshot.kind==="quote"?"TERMS & CONDITIONS":"PAYMENT TERMS",42,termsY).fillColor(slate).font("Helvetica").fontSize(8).text(snapshot.terms||"",42,termsY+15,{width:500,height:55,ellipsis:true});
  doc.fillColor("#64748b").fontSize(7.5).text(snapshot.company.documentFooter||"Together, Better Healthcare.",42,790,{width:511,align:"center"});doc.end();return complete;
}
