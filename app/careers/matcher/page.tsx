"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { roles } from "@/data/roles";
import { getTopMatches, MatcherAnswers } from "@/lib/role-matcher";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Step = 1 | 2 | 3 | 4 | 5 | "results";

export default function RoleMatcherPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Partial<MatcherAnswers>>({});
  const [matches, setMatches] = useState<ReturnType<typeof getTopMatches>>([]);

  const updateAnswer = <K extends keyof MatcherAnswers>(
    key: K,
    value: MatcherAnswers[K]
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step === 5) {
      // Calculate matches
      const completeAnswers = answers as MatcherAnswers;
      const topMatches = getTopMatches(roles, completeAnswers, 3);
      setMatches(topMatches);
      setStep("results");
    } else {
      setStep(((step as number) + 1) as Step);
    }
  };

  const prevStep = () => {
    if (step !== 1 && step !== "results") {
      setStep(((step as number) - 1) as Step);
    }
  };

  const restart = () => {
    setStep(1);
    setAnswers({});
    setMatches([]);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return answers.interests && answers.interests.length > 0;
      case 2:
        return answers.skills && answers.skills.length > 0;
      case 3:
        return !!answers.experience;
      case 4:
        return !!answers.workStyle;
      case 5:
        return !!answers.goal;
      default:
        return false;
    }
  };

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
            Back to careers
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Role Matcher</h1>
          <p className="mt-2 text-gray-600">
            Answer 5 quick questions to find your perfect role at Cynbit
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step !== "results" && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Question {step} of 5</span>
              <span>{((step / 5) * 100).toFixed(0)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Step 1: Interests */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What are you most interested in?
              </h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              <div className="space-y-3">
                {[
                  { value: "tech", label: "Technology & Engineering" },
                  { value: "marketing", label: "Marketing & Growth" },
                  { value: "business", label: "Business & Sales" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-900 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={answers.interests?.includes(option.value) || false}
                      onChange={(e) => {
                        const current = answers.interests || [];
                        const updated = e.target.checked
                          ? [...current, option.value]
                          : current.filter((i) => i !== option.value);
                        updateAnswer("interests", updated);
                      }}
                      className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Which skills do you have or want to develop?
              </h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              <div className="space-y-3">
                {[
                  { value: "coding", label: "Coding & Development" },
                  { value: "design", label: "Design & UX" },
                  { value: "writing", label: "Writing & Content" },
                  { value: "analytics", label: "Analytics & Data" },
                  { value: "sales", label: "Sales & Communication" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-900 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={answers.skills?.includes(option.value) || false}
                      onChange={(e) => {
                        const current = answers.skills || [];
                        const updated = e.target.checked
                          ? [...current, option.value]
                          : current.filter((s) => s !== option.value);
                        updateAnswer("skills", updated);
                      }}
                      className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What's your experience level?
              </h2>
              <div className="space-y-3">
                {[
                  { value: "none", label: "Just starting out", desc: "No professional experience yet" },
                  { value: "some", label: "Some experience", desc: "1-2 years or internships" },
                  { value: "experienced", label: "Experienced professional", desc: "3+ years in the field" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-900 transition-colors"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={option.value}
                      checked={answers.experience === option.value}
                      onChange={(e) => updateAnswer("experience", e.target.value)}
                      className="w-5 h-5 text-gray-900 border-gray-300 focus:ring-gray-900 mt-0.5"
                    />
                    <div className="ml-3">
                      <div className="text-gray-900 font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Work Style */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What's your preferred work style?
              </h2>
              <div className="space-y-3">
                {[
                  { value: "independent", label: "Independent", desc: "I work best on my own" },
                  { value: "collaborative", label: "Collaborative", desc: "I thrive in team settings" },
                  { value: "mixed", label: "Flexible", desc: "I adapt to both styles" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-900 transition-colors"
                  >
                    <input
                      type="radio"
                      name="workStyle"
                      value={option.value}
                      checked={answers.workStyle === option.value}
                      onChange={(e) => updateAnswer("workStyle", e.target.value)}
                      className="w-5 h-5 text-gray-900 border-gray-300 focus:ring-gray-900 mt-0.5"
                    />
                    <div className="ml-3">
                      <div className="text-gray-900 font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Goal */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What's your primary career goal right now?
              </h2>
              <div className="space-y-3">
                {[
                  { value: "learn", label: "Learn & Explore", desc: "Gain experience and develop new skills" },
                  { value: "grow", label: "Grow & Advance", desc: "Take on more responsibility" },
                  { value: "lead", label: "Lead & Impact", desc: "Drive projects and mentor others" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-900 transition-colors"
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={option.value}
                      checked={answers.goal === option.value}
                      onChange={(e) => updateAnswer("goal", e.target.value)}
                      className="w-5 h-5 text-gray-900 border-gray-300 focus:ring-gray-900 mt-0.5"
                    />
                    <div className="ml-3">
                      <div className="text-gray-900 font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {step === "results" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Top Matches</h2>
              <p className="text-gray-600 mb-8">
                Based on your answers, here are the roles that fit you best
              </p>

              <div className="space-y-6">
                {matches.map((match, index) => (
                  <div
                    key={match.role.slug}
                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {match.role.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="default">{match.role.type}</Badge>
                            <Badge variant="secondary">{match.role.department}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">{match.percentage}%</div>
                        <div className="text-sm text-gray-600">Match</div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{match.role.summary}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Why this fits:</h4>
                      <ul className="space-y-1">
                        {match.reasons.map((reason, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start">
                            <svg
                              className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/careers/${match.role.slug}`} className="flex-1">
                        <Button variant="primary" className="w-full">
                          View Role
                        </Button>
                      </Link>
                      <Link href={`/careers/${match.role.slug}/apply`} className="flex-1">
                        <Button variant="secondary" className="w-full">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={restart}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Retake the quiz
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step !== "results" && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                variant="primary"
              >
                {step === 5 ? "See My Matches" : "Next"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
