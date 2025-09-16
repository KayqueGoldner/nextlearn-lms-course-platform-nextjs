import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { s3 } from "@/lib/s3-client";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { requireAdmin } from "@/app/data/admin/require-admin";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  }),
);

export async function DELETE(request: Request) {
  const session = await requireAdmin();

  try {
    const decision = await aj.protect(request, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      const reason = decision.reason;

      if (reason.isRateLimit()) {
        return NextResponse.json(
          { error: "Too many requests" },
          { status: 429 },
        );
      } else {
        return NextResponse.json({ error: "Request denied" }, { status: 400 });
      }
    }

    const body = await request.json();
    const key = body.key;

    if (!key) {
      return NextResponse.json(
        {
          error: "Missing or invalid object key",
        },
        { status: 400 },
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    await s3.send(command);

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        error: "Missing or invalid object key",
      },
      { status: 500 },
    );
  }
}
