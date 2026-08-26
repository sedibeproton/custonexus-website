import { INDEXNOW_VERIFICATION_KEY } from "@/lib/indexnow";

export function GET() {
  return new Response(INDEXNOW_VERIFICATION_KEY, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
