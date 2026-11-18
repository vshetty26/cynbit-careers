import { notFound } from "next/navigation";
import Link from "next/link";
import { roles } from "@/data/roles";
import { getSimilarRoles } from "@/lib/similar-roles";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RoleCard } from "@/components/careers/RoleCard";
import { SaveRoleButton } from "@/components/careers/SaveRoleButton";

export async function generateStaticParams() {
  return roles.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const role = roles.find((r) => r.slug === params.slug);

  if (!role) {
    return {
      title: "Role Not Found | Cynbit Technologies",
    };
  }

  return {
    title: `${role.title} | Cynbit Technologies`,
    description: role.summary,
  };
}

export default function RoleDetailPage({ params }: { params: { slug: string } }) {
  const role = roles.find((r) => r.slug === params.slug);

  if (!role) {
    notFound();
  }

  const similarRoles = getSimilarRoles(role, roles, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/careers"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all roles
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {role.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="default">{role.type}</Badge>
                <Badge variant="secondary">{role.department}</Badge>
                <span className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {role.location}
                </span>
                <span className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {role.experience}
                </span>
              </div>
            </div>
            <SaveRoleButton slug={role.slug} />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              About the Role
            </h2>
            <p className="text-gray-700 leading-relaxed">{role.summary}</p>
          </section>

          {/* Responsibilities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Responsibilities
            </h2>
            <ul className="space-y-2">
              {role.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <svg
                    className="w-5 h-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {responsibility}
                </li>
              ))}
            </ul>
          </section>

          {/* Required Skills */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {role.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Apply CTA */}
          <section className="pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Ready to apply?
                </h3>
                <p className="text-sm text-gray-600">
                  Join our team of technical architects
                </p>
              </div>
              <Link href={`/careers/${role.slug}/apply`}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Apply for this role
                </Button>
              </Link>
            </div>
          </section>
        </div>

        {/* Similar Roles */}
        {similarRoles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Similar Roles
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {similarRoles.map((similarRole) => (
                <RoleCard key={similarRole.slug} role={similarRole} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
