import { CORRELATION_HEADER_NAME } from "@/lib/market/constants"

export const dynamic = "force-dynamic"
export async function GET(request: Request) {
  return Response.json({
    status: "ok",
    application: "zuribeans",
    correlationId: request.headers.get(CORRELATION_HEADER_NAME),
  })
}
