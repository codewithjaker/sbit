import { Code, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { icon: FaFacebook, href: "https://www.facebook.com/sbit.com.bd", label: "Facebook" },
  { icon: FaTwitter, href: "https://x.com/sbit_com_bd", label: "Twitter" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/sbit-com-bd", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://www.youtube.com/@skillbasedit7187", label: "YouTube" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/software", label: "Software Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const contactItems = [
  {
    id: "address",
    icon: MapPin,
    content: "Grand Hoque Tower (3rd Floor), Lift Key - 3, Mizan Road, Feni",
  },
  {
    id: "address",
    icon: MapPin,
    content: "House #535, Road #8, Avenue #6 Mirpur DOHS Dhaka - 1216",
  },
  {
    id: "phone",
    icon: Phone,
    content: "+880 1840-241895",
  },
  {
    id: "email",
    icon: Mail,
    content: "info@sbit.com.bd",
  },
];

const approvalItems = [
  "Ministry Approved",
  "Industry Certified",
  "Job Placement",
  "Updated Curriculum",
  "Expert Designed",
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            {/* <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                <Code className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold"> SkillBasedIT</span>
            </div> */}
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="sbit_logo"
                width={100}
                height={40}
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Premier software training institute and development firm in the
              greater Feni/Mirpur area.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              {contactItems.map((item) => (
                <li key={item.id} className="flex items-start">
                  <item.icon className="mr-3 h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span>{item.content}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            {/* <h3 className="font-bold text-lg mb-4">Certifications</h3> */}
            <h3 className="font-bold text-lg mb-4">Approvals</h3>
            <div className="space-y-3 text-gray-400">
              {approvalItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2026 Skill Based IT. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-condition"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
