import { termsData } from "@/data/terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | SBIT",
  description: "Read the terms and conditions for using SBIT's courses and software services.",
};

export default function TermsPage() {
  const { title, lastUpdated, sections } = termsData;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
        <p className="text-center text-muted-foreground mb-8">
          Last updated: {lastUpdated}
        </p>
        <div className="prose prose-slate max-w-none">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl font-semibold text-orange-600 mb-3">
                {section.title}
              </h2>
              {section.content.map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:info@sbit.com.bd" className="text-orange-600 hover:underline">
              info@sbit.com.bd
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}