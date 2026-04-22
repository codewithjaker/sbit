import { privacyPolicyData } from "@/data/privacy-policy";

export const metadata = {
  title: "Privacy Policy | SkillBasedIT",
  description: "Read our privacy policy to understand how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  const { title, lastUpdated, sections } = privacyPolicyData;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: {lastUpdated}
        </p>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {section.content}
              </p>
              {section.subSections && (
                <div className="ml-6 space-y-4">
                  {section.subSections.map((sub, subIdx) => (
                    <div key={subIdx}>
                      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {sub.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500">
            For any questions regarding this policy, please contact us at{" "}
            <a href="mailto:info@sbit.com.bd" className="text-orange-600 hover:underline">
              info@sbit.com.bd
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}