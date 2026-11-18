import Link from "next/link";
import { notFound } from "next/navigation";
import { roles } from "@/data/roles";
import { Button } from "@/components/ui/Button";

export default function ApplicationSuccessPage({ params }: { params: { slug: string } }) {
  const role = roles.find((r) => r.slug === params.slug);

  if (!role) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for applying to the <strong>{role.title}</strong> position at
          Cynbit Technologies. We've received your application and will review it
          carefully.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          We'll get back to you via email within 5-7 business days. If your profile
          is a match, we'll reach out to schedule an interview.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/careers">
            <Button variant="primary" className="w-full">
              Browse More Roles
            </Button>
          </Link>
          <Link href="https://www.cynbit.in" className="text-sm text-gray-600 hover:text-gray-900">
            Return to Cynbit.in
          </Link>
        </div>
      </div>
    </div>
  );
}
