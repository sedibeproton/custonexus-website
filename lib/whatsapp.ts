export const whatsappMessages = {
  general:
    "Hello CustoNexus Technologies, I would like to learn more about your services.",
  contact:
    "Hello CustoNexus Technologies, I would like to discuss an enquiry with your team.",
  faqs: "Hello CustoNexus Technologies, I have a question about your services.",
  healthcareTechnology:
    "Hello CustoNexus Technologies, I would like to enquire about healthcare technology, website or app development.",
  medicalEquipment:
    "Hello CustoNexus Technologies, I would like to enquire about medical equipment or consumables.",
  professionalServices:
    "Hello CustoNexus Technologies, I would like to enquire about your professional services.",
  strategicPartnerships:
    "Hello CustoNexus Technologies, I would like to discuss a strategic partnership.",
  solutions:
    "Hello CustoNexus Technologies, I would like to discuss a healthcare solution for my organisation.",
  about:
    "Hello CustoNexus Technologies, I would like to learn more about your organisation and how we could work together.",
  constitution:
    "Hello CustoNexus Technologies, I have an enquiry after reading your Constitution.",
} as const;

const whatsappNumber = "27722701087";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
