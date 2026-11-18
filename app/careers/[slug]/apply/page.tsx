"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { roles } from "@/data/roles";
import { Badge } from "@/components/ui/Badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  resume: z.string().url("Please enter a valid resume URL (Google Drive, Dropbox, etc.)"),
  note: z.string().min(50, "Please tell us more about yourself (at least 50 characters)").max(1000, "Message is too long"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function ApplyPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const role = roles.find((r) => r.slug === params.slug);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  if (!role) {
    notFound();
  }

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          roleSlug: role.slug,
          roleTitle: role.title,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      // Redirect to success page
      router.push(`/careers/${role.slug}/apply/success`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href={`/careers/${role.slug}`}
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
            Back to role
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Apply for {role.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="default">{role.type}</Badge>
            <Badge variant="secondary">{role.department}</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile
              </label>
              <input
                id="linkedin"
                type="url"
                {...register("linkedin")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="https://linkedin.com/in/johndoe"
              />
              {errors.linkedin && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>
              )}
            </div>

            {/* GitHub */}
            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Profile
              </label>
              <input
                id="github"
                type="url"
                {...register("github")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="https://github.com/johndoe"
              />
              {errors.github && (
                <p className="mt-1 text-sm text-red-600">{errors.github.message}</p>
              )}
            </div>

            {/* Resume */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                Resume Link *
              </label>
              <input
                id="resume"
                type="url"
                {...register("resume")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="https://drive.google.com/..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Share a link to your resume (Google Drive, Dropbox, etc.)
              </p>
              {errors.resume && (
                <p className="mt-1 text-sm text-red-600">{errors.resume.message}</p>
              )}
            </div>

            {/* Note */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Why are you interested in this role? *
              </label>
              <textarea
                id="note"
                {...register("note")}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Tell us about yourself, your experience, and why you'd be a great fit for this role..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 50 characters, maximum 1000 characters
              </p>
              {errors.note && (
                <p className="mt-1 text-sm text-red-600">{errors.note.message}</p>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              <Link
                href={`/careers/${role.slug}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
