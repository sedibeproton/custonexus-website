import nodemailer from "nodemailer";
import { postgresRows } from "@/lib/db/postgres";
import { readR2Object } from "@/lib/storage/r2";

export async function sendFinalizedQuote(id:string){
  const row=(await postgresRows<{quote_number:string;pdf_object_key:string|null;client_email:string;client_name:string;company_name:string;company_email:string}>(`SELECT q.quote_number,q.pdf_object_key,c.email client_email,c.contact_person client_name,s.trading_name company_name,s.email company_email FROM quotes q JOIN clients c ON c.id=q.client_id CROSS JOIN company_settings s WHERE q.id=$1 AND q.finalized_at IS NOT NULL`,[id]))[0];
  if(!row||!row.pdf_object_key)throw new Error("Finalize the quote before sending it.");
  const password=process.env.SMTP_PASSWORD?.trim();
  if(!password)throw new Error("SMTP_PASSWORD is not configured in Railway.");
  const host=process.env.SMTP_HOST?.trim()||"mail.custonexus.com",port=Number(process.env.SMTP_PORT||587),user=process.env.SMTP_USER?.trim()||"info@custonexus.com",from=process.env.SMTP_FROM?.trim()||`${row.company_name} <${user}>`;
  const pdf=await readR2Object(row.pdf_object_key);
  const transporter=nodemailer.createTransport({host,port,secure:port===465,auth:{user,pass:password},connectionTimeout:15000,greetingTimeout:15000,socketTimeout:30000});
  await transporter.sendMail({from,to:row.client_email,replyTo:row.company_email,subject:`Quotation ${row.quote_number} from ${row.company_name}`,text:`Hello ${row.client_name},\n\nPlease find quotation ${row.quote_number} attached for your review.\n\nKind regards,\n${row.company_name}`,attachments:[{filename:`${row.quote_number}.pdf`,content:Buffer.from(pdf.bytes),contentType:"application/pdf"}]});
  return{recipient:row.client_email};
}
