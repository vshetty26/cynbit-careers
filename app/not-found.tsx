import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/careers">
            <Button variant="primary" className="w-full sm:w-auto">
              Browse Careers
            </Button>
          </Link>
          <Link href="https://www.cynbit.in">
            <Button variant="secondary" className="w-full sm:w-auto">
              Visit Cynbit.in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
