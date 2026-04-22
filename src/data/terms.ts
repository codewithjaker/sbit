export interface TermsData {
  title: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export const termsData: TermsData = {
  title: "Terms and Conditions",
  lastUpdated: "April 12, 2025",
  sections: [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using the Skill Based Information Technology (SBIT) website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our site or services.",
        "We reserve the right to modify these terms at any time without prior notice. Your continued use constitutes acceptance of the changes."
      ]
    },
    {
      title: "2. Use of Our Services",
      content: [
        "You must be at least 18 years old to enroll in our courses or purchase software.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are responsible for maintaining the confidentiality of your account credentials."
      ]
    },
    {
      title: "3. Payments and Refunds",
      content: [
        "All course fees and software prices are clearly displayed on our website.",
        "Payments are processed through secure gateways; we do not store your card details.",
        "Refund requests for courses must be made within 7 days of enrollment, provided less than 20% of the course has been completed.",
        "Software purchases are non-refundable once the license key has been issued."
      ]
    },
    {
      title: "4. Intellectual Property",
      content: [
        "All course materials, software code, designs, and content are the exclusive property of SBIT.",
        "You may not copy, redistribute, or resell any part of our courses or software without written permission."
      ]
    },
    {
      title: "5. Limitation of Liability",
      content: [
        "SBIT shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.",
        "Our total liability is limited to the amount you paid for the specific course or software."
      ]
    },
    {
      title: "6. Governing Law",
      content: [
        "These terms shall be governed by and construed in accordance with the laws of Bangladesh."
      ]
    }
  ]
};