"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, ChevronDown, GraduationCap, Eye } from "lucide-react";
import { useState } from "react";
// Import icons from react-icons
import {
  FaBuilding,
  FaCogs,
  FaMobileAlt,
  FaChartLine,
  FaServer,
  FaGraduationCap,
  FaEnvelope,
  FaEdit,
  FaUsers,
  FaImage,
  FaBlog,
  FaBriefcase,
  FaGlobe,
  FaShoppingCart,
  FaNewspaper,
  FaUtensils,
  FaPaintBrush,
  FaDatabase,
  FaBox,
  FaLaptopCode,
  FaHospital,
  FaTruck,
  FaHeadset,
  FaChartPie,
  FaFileInvoice,
  FaQrcode,
  FaClipboardList,
  FaMobile,
  FaShoppingBag,
  FaRss,
  FaHandHoldingHeart,
  FaSearch,
  FaMailBulk,
  FaSms,
  FaCloud,
  FaServer as FaVps,
  FaMailchimp,
  FaCode,
  FaPalette,
  FaVideo as FaVideoEditing,
  FaMobile as FaAppDev,
  FaLaptop,
  FaChartBar,
  FaTeamspeak,
  FaDigitalOcean,
} from "react-icons/fa";
import { PiPresentationFill } from "react-icons/pi";

// ========== Navigation Data with Icons and IDs ==========
const modulesData = [
  {
    module_id: 106,
    module_name: "Company",
    icon: <FaBuilding />,
    submodules: [
      {
        sub_module_id: 41,
        sub_module_name: "About Us",
        sub_module_icon: <FaEdit />,
        sub_module_display_name: "About Us",
      },
      {
        sub_module_id: 42,
        sub_module_name: "Our Happy Clients",
        sub_module_icon: <FaUsers />,
        sub_module_display_name: "Our Happy Clients",
      },
      {
        sub_module_id: 43,
        sub_module_name: "Gallery",
        sub_module_icon: <FaImage />,
        sub_module_display_name: "Gallery",
      },
      // {
      //   sub_module_id: 44,
      //   sub_module_name: "Our Team",
      //   sub_module_icon: <FaTeamspeak />,
      //   sub_module_display_name: "Our Team",
      // },
      {
        sub_module_id: 45,
        sub_module_name: "Blog",
        sub_module_icon: <FaBlog />,
        sub_module_display_name: "Blog",
      },
      {
        sub_module_id: 46,
        sub_module_name: "Career",
        sub_module_icon: <FaBriefcase />,
        sub_module_display_name: "Career",
      },
      {
        sub_module_id: 114,
        sub_module_name: "Contact",
        sub_module_icon: <FaEnvelope />,
        sub_module_display_name: "Contact",
      },
      {
        sub_module_id: 115,
        sub_module_name: "Seminar",
        sub_module_icon: <PiPresentationFill />,
        sub_module_display_name: "Seminar",
      },
    ],
  },
  {
    module_id: 107,
    module_name: "Services",
    icon: <FaCogs />,
    submodules: [
      {
        sub_module_id: 47,
        sub_module_name: "Website Design & Development",
        sub_module_icon: <FaGlobe />,
        sub_module_display_name: "Website Design & Development",
      },
      {
        sub_module_id: 48,
        sub_module_name: "Ecommerce Development",
        sub_module_icon: <FaShoppingCart />,
        sub_module_display_name: "Ecommerce Development",
      },
      {
        sub_module_id: 50,
        sub_module_name: "News Portal Development",
        sub_module_icon: <FaNewspaper />,
        sub_module_display_name: "News Portal Development",
      },
      {
        sub_module_id: 51,
        sub_module_name: "Restaurant Website Development",
        sub_module_icon: <FaUtensils />,
        sub_module_display_name: "Restaurant Website Development",
      },
      {
        sub_module_id: 52,
        sub_module_name: "Logo & Graphics Design",
        sub_module_icon: <FaPaintBrush />,
        sub_module_display_name: "Logo & Graphics Design",
      },
      {
        sub_module_id: 55,
        sub_module_name: "Business & Data Analysis",
        sub_module_icon: <FaDatabase />,
        sub_module_display_name: "Business & Data Analysis",
      },
    ],
  },
  {
    module_id: 108,
    module_name: "Software",
    icon: <FaBox />,
    submodules: [
      {
        sub_module_id: 56,
        sub_module_name: "POS & Inventory Software",
        sub_module_icon: <FaBox />,
        sub_module_display_name: "POS & Inventory Software",
      },
      {
        sub_module_id: 57,
        sub_module_name: "Ecommerce Software",
        sub_module_icon: <FaShoppingCart />,
        sub_module_display_name: "Ecommerce Software",
      },
      {
        sub_module_id: 58,
        sub_module_name: "Custom Software Development",
        sub_module_icon: <FaLaptopCode />,
        sub_module_display_name: "Custom Software Development",
      },
      {
        sub_module_id: 59,
        sub_module_name: "Education Management Software",
        sub_module_icon: <FaGraduationCap />,
        sub_module_display_name: "Education Management Software",
      },
      {
        sub_module_id: 60,
        sub_module_name: "Hospital Management Software",
        sub_module_icon: <FaHospital />,
        sub_module_display_name: "Hospital Management Software",
      },
      {
        sub_module_id: 61,
        sub_module_name: "Courier Software",
        sub_module_icon: <FaTruck />,
        sub_module_display_name: "Courier Software",
      },
      {
        sub_module_id: 62,
        sub_module_name: "Service Software",
        sub_module_icon: <FaHeadset />,
        sub_module_display_name: "Service Software",
      },
      {
        sub_module_id: 63,
        sub_module_name: "Restaurant Software",
        sub_module_icon: <FaUtensils />,
        sub_module_display_name: "Restaurant Software",
      },
      {
        sub_module_id: 64,
        sub_module_name: "MLM Software",
        sub_module_icon: <FaUsers />,
        sub_module_display_name: "MLM Software",
      },
      {
        sub_module_id: 65,
        sub_module_name: "ERP Software",
        sub_module_icon: <FaChartPie />,
        sub_module_display_name: "ERP Software",
      },
      {
        sub_module_id: 66,
        sub_module_name: "Pharmacy Management Software",
        sub_module_icon: <FaFileInvoice />,
        sub_module_display_name: "Pharmacy Management Software",
      },
      {
        sub_module_id: 67,
        sub_module_name: "Retail POS Software",
        sub_module_icon: <FaQrcode />,
        sub_module_display_name: "Retail POS Software",
      },
      {
        sub_module_id: 69,
        sub_module_name: "Pharmacy POS",
        sub_module_icon: <FaClipboardList />,
        sub_module_display_name: "Pharmacy POS",
      },
      {
        sub_module_id: 70,
        sub_module_name: "Restaurant POS",
        sub_module_icon: <FaUtensils />,
        sub_module_display_name: "Restaurant POS",
      },
      {
        sub_module_id: 72,
        sub_module_name: "POS Scanner & Thermal Printer",
        sub_module_icon: <FaQrcode />,
        sub_module_display_name: "POS Scanner & Thermal Printer",
      },
    ],
  },
  {
    module_id: 109,
    module_name: "Mobile App",
    icon: <FaMobileAlt />,
    submodules: [
      {
        sub_module_id: 73,
        sub_module_name: "Mobile APP Development",
        sub_module_icon: <FaMobile />,
        sub_module_display_name: "Mobile APP Development",
      },
      {
        sub_module_id: 74,
        sub_module_name: "Ecommerce APP",
        sub_module_icon: <FaShoppingBag />,
        sub_module_display_name: "Ecommerce APP",
      },
      {
        sub_module_id: 75,
        sub_module_name: "News Portal APP",
        sub_module_icon: <FaRss />,
        sub_module_display_name: "News Portal APP",
      },
      {
        sub_module_id: 76,
        sub_module_name: "Courier APP",
        sub_module_icon: <FaTruck />,
        sub_module_display_name: "Courier APP",
      },
      {
        sub_module_id: 77,
        sub_module_name: "E-Learning App",
        sub_module_icon: <FaGraduationCap />,
        sub_module_display_name: "E-Learning App",
      },
      {
        sub_module_id: 78,
        sub_module_name: "Online Doctor App",
        sub_module_icon: <FaHandHoldingHeart />,
        sub_module_display_name: "Online Doctor App",
      },
    ],
  },
  {
    module_id: 110,
    module_name: "Marketing",
    icon: <FaChartLine />,
    submodules: [
      {
        sub_module_id: 79,
        sub_module_name: "Digital Marketing",
        // sub_module_icon: <FaDigitalTiling />,
        sub_module_icon: <FaDigitalOcean />,
        sub_module_display_name: "Digital Marketing",
      },
      {
        sub_module_id: 80,
        sub_module_name: "Social Media Marketing",
        sub_module_icon: <FaUsers />,
        sub_module_display_name: "Social Media Marketing",
      },
      {
        sub_module_id: 81,
        sub_module_name: "Search Engine Optimization (SEO)",
        sub_module_icon: <FaSearch />,
        sub_module_display_name: "Search Engine Optimization (SEO)",
      },
      {
        sub_module_id: 82,
        sub_module_name: "Email Marketing",
        sub_module_icon: <FaMailBulk />,
        sub_module_display_name: "Email Marketing",
      },
      {
        sub_module_id: 83,
        sub_module_name: "SMS Marketing",
        sub_module_icon: <FaSms />,
        sub_module_display_name: "SMS Marketing",
      },
    ],
  },
  {
    module_id: 111,
    module_name: "Hosting",
    icon: <FaServer />,
    submodules: [
      {
        sub_module_id: 84,
        sub_module_name: "Website Domain & Hosting",
        sub_module_icon: <FaCloud />,
        sub_module_display_name: "Website Domain & Hosting",
      },
      {
        sub_module_id: 85,
        sub_module_name: "Cloud Hosting",
        sub_module_icon: <FaCloud />,
        sub_module_display_name: "Cloud Hosting",
      },
      {
        sub_module_id: 86,
        sub_module_name: "VPS Hosting",
        sub_module_icon: <FaVps />,
        sub_module_display_name: "VPS Hosting",
      },
      {
        sub_module_id: 87,
        sub_module_name: "Email Hosting",
        sub_module_icon: <FaMailchimp />,
        sub_module_display_name: "Email Hosting",
      },
    ],
  },
  {
    module_id: 112,
    module_name: "Courses",
    icon: <FaGraduationCap />,
    submodules: [
      {
        sub_module_id: 87,
        sub_module_name: "Mastering Nodejs",
        sub_module_icon: <FaCode />,
        sub_module_display_name: "Mastering Nodejs",
      },
      {
        sub_module_id: 88,
        sub_module_name: "Full Stack Web Development",
        sub_module_icon: <FaCode />,
        sub_module_display_name: "Full Stack Web Development",
      },
      {
        sub_module_id: 89,
        sub_module_name: "Professional Graphics Design",
        sub_module_icon: <FaPalette />,
        sub_module_display_name: "Professional Graphics Design",
      },
      {
        sub_module_id: 90,
        sub_module_name: "Professional Video Editing",
        sub_module_icon: <FaVideoEditing />,
        sub_module_display_name: "Professional Video Editing",
      },
      {
        sub_module_id: 91,
        sub_module_name: "App Development",
        sub_module_icon: <FaAppDev />,
        sub_module_display_name: "App Development",
      },
      {
        sub_module_id: 92,
        sub_module_name: "Software Development",
        sub_module_icon: <FaLaptop />,
        sub_module_display_name: "Software Development",
      },
      
    ],
  },
];

// Helper: generate slug from text (lowercase, replace spaces with hyphens)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Build navigation items from modulesData
const buildNavigationItems = () => {
  return modulesData.map((module) => {
    if (module.submodules && module.submodules.length > 0) {
      return {
        title: module.module_name,
        icon: module.icon,
        children: module.submodules.map((sub) => ({
          title: sub.sub_module_display_name,
          icon: sub.sub_module_icon,
          href: `/${slugify(module.module_name)}/${slugify(sub.sub_module_name)}`,
        })),
      };
    } else {
      return {
        title: module.module_name,
        icon: module.icon,
        href: `/${slugify(module.module_name)}`,
      };
    }
  });
};

const navigationItems = buildNavigationItems();

// ========== Mobile Submenu Component with Icons ==========
function MobileNavItem({ item, onClose }: { item: any; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  if (item.children) {
    return (
      <div className="border-b border-gray-100 pb-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full text-lg font-medium py-2 hover:text-primary transition-colors"
        >
          <span className="flex items-center gap-2">
            {item.icon && <span className="text-orange-400">{item.icon}</span>}
            {item.title}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="ml-4 space-y-2 mt-2 pb-2">
            {item.children.map((child: any) => (
              <Link
                key={child.title}
                href={child.href}
                className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors"
                onClick={onClose}
              >
                {child.icon && <span className="w-4 h-4 text-orange-400">{child.icon}</span>}
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <Link
      href={item.href}
      className="flex items-center gap-2 text-lg font-medium py-2 hover:text-primary transition-colors"
      onClick={onClose}
    >
      {item.icon && <span className="text-primary">{item.icon}</span>}
      {item.title}
    </Link>
  );
}

// ========== Main Header Component ==========
export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="sbit_logo"
            width={100}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation - using shadcn NavigationMenu with Icons */}
        <div className="hidden lg:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {/* {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="font-medium">
                        <span className="flex items-center gap-2">
                          {item.icon && (
                            <span className="text-primary">{item.icon}</span>
                          )}
                          {item.title}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={child.href}
                                className="flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                {child.icon && (
                                  <span className="text-primary">
                                    {child.icon}
                                  </span>
                                )}
                                <div className="text-sm font-medium leading-none">
                                  {child.title}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex h-full items-center gap-2 px-3 font-medium hover:text-primary transition-colors"
                    >
                      {item.icon && (
                        <span className="text-primary">{item.icon}</span>
                      )}
                      {item.title}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))} */}
              {navigationItems.map((item, index) => {
                const isLast = index >= navigationItems.length - 3;

                return (
                  <NavigationMenuItem key={item.title} className="relative">
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="font-medium px-2">
                          <span className="flex items-center gap-2">
                            {item.icon && (
                              <span className="text-orange-400">{item.icon}</span>
                            )}
                            {item.title}
                          </span>
                        </NavigationMenuTrigger>

                        <NavigationMenuContent
                          className={`
                              absolute top-full mt-2
                              ${isLast ? "right-0 left-auto" : "left-0"}
                            `}
                        >
                          <ul className="grid w-[500px] lg:w-[600px] gap-3 p-4 md:grid-cols-2">
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <Link
                                  href={child.href}
                                  className="flex items-center gap-2 p-3 rounded-md hover:bg-accent"
                                >
                                  {child.icon && (
                                    <span className="text-orange-400">
                                      {child.icon}
                                    </span>
                                  )}
                                  <div className="text-sm font-medium">
                                    {child.title}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 px-3 font-medium hover:text-primary"
                      >
                        {item.icon && (
                          <span className="text-primary">{item.icon}</span>
                        )}
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Admission Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            onClick={() => router.push("/software-demo")}
            variant="outline"
            // className="bg-orange-500 hover:bg-orange-600 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            className="border-orange-500 hover:border-orange-600 text-sm font-semibold cursor-pointer  "
          >
            <Eye className="h-5 w-5 text-orange-500 hover:text-orange-600" />

          </Button>
          <Button
            onClick={() => router.push("/admission")}
            variant="outline"
            // className="bg-orange-500 hover:bg-orange-600 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            className="border-orange-500 hover:border-orange-600 text-sm font-semibold cursor-pointer  "
          >
            <GraduationCap className="h-5 w-5 text-orange-500 hover:text-orange-600" />

          </Button>
        </div>

        {/* Mobile Menu (Sheet) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="px-4 w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-6 mt-8">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="sbit_logo"
                  width={100}
                  height={40}
                />
              </Link>
              <ul className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <MobileNavItem item={item} onClose={() => setOpen(false)} />
                  </li>
                ))}
              </ul>
              <div className="mx-auto flex items-center gap-2 pt-4">
                <Button
                  onClick={() => {
                    router.push("/software-demo");
                    setOpen(false);
                  }}

                  variant="outline"
                  // className="w-full bg-gradient-to-r from-red-700 via-orange-600 to-yellow-400"
                  className=" border-orange-500 hover:border-orange-600 text-sm font-semibold cursor-pointer"
                >
                  <Eye className="h-5 w-5 text-orange-500 hover:text-orange-600" />

                </Button>
                <Button
                  onClick={() => {
                    router.push("/admission");
                    setOpen(false);
                  }}
                  variant="outline"
                  // className="w-full bg-gradient-to-r from-red-700 via-orange-600 to-yellow-400"
                  className=" border-orange-500 hover:border-orange-600 text-sm font-semibold cursor-pointer  "
                >
                  <GraduationCap className="h-5 w-5 text-orange-500 hover:text-orange-600" />

                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}