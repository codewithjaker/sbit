export interface PrivacyPolicySection {
  title: string;
  content: string;
  subSections?: { title: string; content: string }[];
}

export const privacyPolicyData: {
  title: string;
  lastUpdated: string;
  sections: PrivacyPolicySection[];
} = {
  title: "Privacy Policy",
  lastUpdated: "April 12, 2026",
  sections: [
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.",
      subSections: [
        {
          title: "Account Information",
          content:
            "When you create an account, we collect your name, email address, and password.",
        },
        {
          title: "Usage Data",
          content:
            "We automatically collect information about your interaction with our services, such as IP address, browser type, pages visited, and time spent.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect our legal rights.",
      subSections: [
        {
          title: "Service Delivery",
          content:
            "To process transactions, send confirmations, and provide customer support.",
        },
        {
          title: "Analytics",
          content:
            "To understand how users interact with our website and improve user experience.",
        },
      ],
    },
    {
      title: "Sharing of Information",
      content:
        "We do not sell your personal information. We may share information with service providers who perform services on our behalf, or when required by law.",
    },
    {
      title: "Data Security",
      content:
        "We implement reasonable security measures to protect your information from unauthorized access, alteration, or disclosure.",
    },
    {
      title: "Your Rights",
      content:
        "Depending on your location, you may have the right to access, correct, or delete your personal information. Contact us to exercise these rights.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.",
    },
    {
      title: "Contact Us",
      content:
        "If you have questions about this privacy policy, please contact us at info@sbit.com.bd or call +880 1840-241895.",
    },
  ],
};

// Optional: Function to fetch from API
export async function fetchPrivacyPolicy() {
  // Replace with actual API endpoint
  // const res = await fetch('https://api.example.com/privacy-policy');
  // return res.json();
  return privacyPolicyData; // fallback to local data
}