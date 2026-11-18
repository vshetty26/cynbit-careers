import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  resume: z.string().url(),
  note: z.string().min(50).max(1000),
  roleSlug: z.string(),
  roleTitle: z.string(),
});

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // 3 requests
const RATE_WINDOW = 60 * 60 * 1000; // per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many applications. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = applicationSchema.parse(body);

    // Save to JSON file (simple storage)
    const dataDir = path.join(process.cwd(), "data", "applications");
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const application = {
      ...validatedData,
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
      ip,
    };

    const filePath = path.join(dataDir, `${application.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(application, null, 2));

    // In production, you would:
    // 1. Store in a database (PostgreSQL, MongoDB, etc.)
    // 2. Send email notifications
    // 3. Integrate with ATS (Applicant Tracking System)
    // 4. More sophisticated rate limiting

    return NextResponse.json(
      { message: "Application submitted successfully", id: application.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid application data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Application submission error:", error);
    return NextResponse.json(
      { message: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
