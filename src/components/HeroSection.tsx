"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Sparkles,
  Code,
  Users,
  Award,
  Zap,
  UserCheck,
} from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Next.js & React",
    "TypeScript",
    "Node.js & Express",
    "UI/UX Design",
    "Mobile Development",
    "DevOps & CI/CD",
  ];

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 500 : 2000;

    if (!isDeleting && typedText === currentWord) {
      setTimeout(() => setIsDeleting(true), pauseDuration);
      return;
    }

    if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentWord.substring(0, typedText.length - 1)
          : currentWord.substring(0, typedText.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentWordIndex]);

  const stats = [
    { value: "5000+", label: "Students Trained", icon: Users },
    // { value: "50+", label: "Expert Instructors", icon: Award },
    { value: "98%", label: "Success Rate", icon: Sparkles },
    { value: "400+", label: "Projects Completed", icon: Code },
    { value: "450+", label: "Satisfied Clients", icon: UserCheck },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-purple-600 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Elements */}
      {/* <div className="absolute top-10 left-10 animate-float">
        <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Code className="w-6 h-6" />
        </div>
      </div> */}
      <div className="absolute top-20 right-20 animate-float delay-300">
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-14 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">
                  Top Rated IT Institute in Feni
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Master Modern <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 animate-gradient">
                    {typedText}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-white/90 leading-relaxed">
                Transform your career with industry-leading software training
                and custom software solutions. Get certified, build real
                projects, and land your dream job.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-xl shadow-lg cursor-pointer"
                    onClick={() => router.push("/courses")}
                  >
                    <span>Explore Courses</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                {/* <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-gray-500 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                    onClick={() => router.push("/demo")}
                  >
                    <Play className="mr-2 w-5 h-5" />
                    <span>Free Demo Class</span>
                  </Button>
                </motion.div> */}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-4 h-4 text-yellow-300" />
                      <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero.png"
                    alt="Programming Illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </motion.div>

              {/* Floating Card 1 */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-4 -left-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-2xl z-20 w-48"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Code className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      Live Coding
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Interactive Sessions
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-2xl z-20 w-56"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      Certification
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Industry Recognized
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Animated Orbit Circles */}
              <div className="absolute -top-10 -right-10 w-64 h-64 border border-white/20 rounded-full animate-spin-slow">
                <div className="absolute top-1/2 left-0 w-4 h-4 bg-white rounded-full transform -translate-y-1/2" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-80 h-80 border border-white/10 rounded-full animate-spin-slow-reverse">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-white/50 rounded-full transform -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-white/70 mb-2">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Sparkles,
//   Code,
//   Users,
//   Award,
//   Zap,
//   Shield,
//   Target,
//   TrendingUp,
//   Clock,
//   BookOpen,
//   Globe,
//   Smartphone,
//   Database,
//   Cloud,
//   Server,
// } from "lucide-react";
// import Image from "next/image";

// export default function HeroSection() {
//   const router = useRouter();
//   const [typedText, setTypedText] = useState("");
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Tech stack rotating words
//   const words = [
//     "Next.js & React",
//     "TypeScript",
//     "Node.js & Express",
//     "MongoDB & PostgreSQL",
//     "AWS & Docker",
//     "UI/UX Design",
//     "Mobile Development",
//     "DevOps & CI/CD",
//   ];

//   // Statistics with improved icons
//   const stats = [
//     {
//       value: "3,500+",
//       label: "Skilled Graduates",
//       icon: Users,
//       color: "from-blue-400 to-cyan-400",
//     },
//     {
//       value: "98.5%",
//       label: "Job Placement Rate",
//       icon: TrendingUp,
//       color: "from-green-400 to-emerald-500",
//     },
//     {
//       value: "50+",
//       label: "Industry Experts",
//       icon: Award,
//       color: "from-yellow-400 to-orange-500",
//     },
//     {
//       value: "2,000+",
//       label: "Live Projects",
//       icon: Code,
//       color: "from-purple-400 to-pink-500",
//     },
//   ];

//   // Features with icons
//   const features = [
//     {
//       icon: Shield,
//       text: "Govt. Approved Courses",
//       subtext: "Recognized by Ministry of Education",
//     },
//     {
//       icon: Target,
//       text: "Project-Based Learning",
//       subtext: "Hands-on real-world projects",
//     },
//     {
//       icon: Clock,
//       text: "Flexible Timings",
//       subtext: "Morning, Evening & Weekend batches",
//     },
//     {
//       icon: BookOpen,
//       text: "Lifetime Access",
//       subtext: "Course materials & updates",
//     },
//   ];

//   // Tech domains
//   const techDomains = [
//     { icon: Globe, label: "Web Development", color: "bg-blue-500/20" },
//     { icon: Smartphone, label: "Mobile Apps", color: "bg-green-500/20" },
//     { icon: Database, label: "Data Science", color: "bg-purple-500/20" },
//     { icon: Cloud, label: "Cloud & DevOps", color: "bg-cyan-500/20" },
//     { icon: Server, label: "Networking", color: "bg-orange-500/20" },
//   ];

//   // Typing effect
//   useEffect(() => {
//     const currentWord = words[currentWordIndex];
//     const typeSpeed = isDeleting ? 30 : 80;
//     const pauseDuration = isDeleting ? 800 : 2500;

//     if (!isDeleting && typedText === currentWord) {
//       setTimeout(() => setIsDeleting(true), pauseDuration);
//       return;
//     }

//     if (isDeleting && typedText === "") {
//       setIsDeleting(false);
//       setCurrentWordIndex((prev) => (prev + 1) % words.length);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setTypedText(
//         isDeleting
//           ? currentWord.substring(0, typedText.length - 1)
//           : currentWord.substring(0, typedText.length + 1)
//       );
//     }, typeSpeed);

//     return () => clearTimeout(timeout);
//   }, [typedText, isDeleting, currentWordIndex]);

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary/95 to-purple-900 text-white">
//       {/* Animated Background Particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Particle Background */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_50%)]" />

//         {/* Floating Particles */}
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-white/30 rounded-full"
//             initial={{
//               x: Math.random() * 100 + "vw",
//               y: Math.random() * 100 + "vh",
//             }}
//             animate={{
//               x: Math.random() * 100 + "vw",
//               y: Math.random() * 100 + "vh",
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//           />
//         ))}

//         {/* Geometric Shapes */}
//         <div className="absolute top-1/4 left-10 w-64 h-64 border border-white/10 rounded-full blur-2xl" />
//         <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-purple-500/20 rounded-full blur-2xl" />
//       </div>

//       {/* Main Content */}
//       <div className="container relative mx-auto px-4 py-24 lg:py-32">
//         <div className="flex flex-col lg:flex-row items-center gap-16">
//           {/* Left Content - Text & Stats */}
//           <div className="lg:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="space-y-8"
//             >
//               {/* Premium Badge */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20 rounded-full px-4 py-3"
//               >
//                 <div className="flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
//                   <span className="font-semibold">🚀 Premium IT Institute</span>
//                 </div>
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
//               </motion.div>

//               {/* Main Headline */}
//               <div className="space-y-4">
//                 <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
//                     Skill Based
//                   </span>
//                   <br />
//                   <span className="relative">
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
//                       IT Training
//                     </span>
//                     <motion.span
//                       animate={{ opacity: [1, 0.5, 1] }}
//                       transition={{ duration: 1, repeat: Infinity }}
//                       className="absolute -right-4 top-0"
//                     >
//                       ⚡
//                     </motion.span>
//                   </span>
//                 </h1>

//                 <div className="flex items-center gap-2">
//                   <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
//                   <p className="text-2xl text-white/90 font-medium">
//                     Master{" "}
//                     <span className="relative inline-block min-w-[300px]">
//                       <span className="text-cyan-300 font-bold">
//                         {typedText}
//                       </span>
//                       <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
//                       <span className="absolute right-0 top-0 w-1 h-6 bg-cyan-400 animate-pulse" />
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               {/* Tagline */}
//               <p className="text-xl text-white/80 leading-relaxed">
//                 Transform your career with industry-relevant training, live
//                 projects, and 1:1 mentorship. Get certified and land your dream
//                 tech job in
//                 <span className="font-bold text-cyan-300"> 6 months</span>.
//               </p>

//               {/* Features Grid */}
//               <div className="grid grid-cols-2 gap-4">
//                 {features.map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 * index }}
//                     whileHover={{ scale: 1.02 }}
//                     className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
//                   >
//                     <div className="p-2 bg-white/10 rounded-lg">
//                       <feature.icon className="w-5 h-5 text-cyan-300" />
//                     </div>
//                     <div>
//                       <p className="font-semibold">{feature.text}</p>
//                       <p className="text-sm text-white/60">{feature.subtext}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex-1"
//                 >
//                   <Button
//                     size="lg"
//                     className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-bold text-lg px-8 py-7 rounded-xl shadow-xl shadow-cyan-500/30"
//                     onClick={() => router.push("/courses")}
//                   >
//                     <BookOpen className="mr-3 w-6 h-6" />
//                     Explore All Courses
//                     <ArrowRight className="ml-3 w-6 h-6 animate-pulse" />
//                   </Button>
//                 </motion.div>

//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex-1"
//                 >
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="w-full bg-white/10 backdrop-blur-lg border-2 border-white/30 hover:bg-white hover:text-gray-900 font-bold text-lg px-8 py-7 rounded-xl"
//                     onClick={() => router.push("/demo")}
//                   >
//                     <Play className="mr-3 w-6 h-6" />
//                     Free Live Demo
//                   </Button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Content - Vector Illustration & Stats */}
//           <div className="lg:w-1/2 relative">
//             {/* Main Illustration Container */}
//             <div className="relative">
//               {/* Floating Tech Domains */}
//               <div className="absolute -top-8 -left-8 z-20">
//                 <div className="grid grid-cols-3 gap-2">
//                   {techDomains.slice(0, 3).map((tech, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.3 + index * 0.1 }}
//                       whileHover={{ y: -5 }}
//                       className={`flex items-center gap-2 ${tech.color} backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5`}
//                     >
//                       <tech.icon className="w-3 h-3" />
//                       <span className="text-xs font-medium">{tech.label}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Main Vector Illustration */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
//                 animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//                 transition={{ duration: 0.8, type: "spring" }}
//                 className="relative z-10"
//               >
//                 <div className="relative bg-gradient-to-br from-gray-800/50 to-primary/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-primary/20">
//                   {/* UnDraw Premium Vector Image */}
//                   <div className="relative w-full h-80 lg:h-96">
//                     {/* <Image
//                       // src="/api/placeholder/600/400" // Replace with: https://assets.undraw.co/api/illustrations/undraw_programming_re_kg9v?color=3B82F6&primaryColor=3B82F6&secondaryColor=8B5CF6
//                       src="https://undraw.co/api/illustrations/coding_joxb.svg" // Replace with: https://assets.undraw.co/api/illustrations/undraw_programming_re_kg9v?color=3B82F6&primaryColor=3B82F6&secondaryColor=8B5CF6
//                       alt="Modern Software Development"
//                       fill
//                       className="object-contain"
//                       priority
//                       unoptimized // Remove this if using Next.js Image optimization
//                     /> */}
//                     <Image
//                       src="https://cdn.undraw.co/illustration/coding_joxb.svg"
//                       alt="Programming Illustration"
//                       width={600}
//                       height={400}
//                       className="w-full h-auto object-contain"
//                       priority
//                     />

//                   </div>

//                   {/* Animated Gradient Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 -z-10" />
//                 </div>

//                 {/* Floating Certificate Badge */}
//                 <motion.div
//                   initial={{ x: -50, y: 50, opacity: 0 }}
//                   animate={{ x: 0, y: 0, opacity: 1 }}
//                   transition={{ delay: 0.5, type: "spring" }}
//                   className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-4 shadow-2xl z-20 w-56"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
//                       <Award className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-white">Govt. Certified</p>
//                       <p className="text-xs text-white/90">
//                         Ministry of Education
//                       </p>
//                     </div>
//                   </div>
//                   <motion.div
//                     animate={{ rotate: [0, 10, -10, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="absolute -top-2 -right-2"
//                   >
//                     <Shield className="w-8 h-8 text-white/50" />
//                   </motion.div>
//                 </motion.div>

//                 {/* Live Session Indicator */}
//                 <motion.div
//                   initial={{ x: 50, y: -30, opacity: 0 }}
//                   animate={{ x: 0, y: 0, opacity: 1 }}
//                   transition={{ delay: 0.7, type: "spring" }}
//                   className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-2xl z-20 w-64"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="relative">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
//                         <Play className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900 dark:text-white">
//                         Live Session Now
//                       </p>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Full-Stack Development
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* Animated Orbits */}
//               <div className="absolute -top-10 -right-10 w-72 h-72 border border-cyan-500/30 rounded-full animate-spin-slow">
//                 <div className="absolute top-1/2 left-0 w-3 h-3 bg-cyan-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-cyan-400" />
//               </div>
//               <div className="absolute -bottom-10 -left-10 w-96 h-96 border border-purple-500/20 rounded-full animate-spin-slow-reverse">
//                 <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2" />
//               </div>
//             </div>

//             {/* Stats Bar */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9 }}
//               className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
//             >
//               {stats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-4 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
//                 >
//                   {/* Animated background effect */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
//                   />

//                   <div className="relative z-10">
//                     <div className="flex items-center gap-2 mb-1">
//                       <stat.icon className="w-4 h-4" />
//                       <span className="text-2xl font-bold">{stat.value}</span>
//                     </div>
//                     <p className="text-sm text-white/70">{stat.label}</p>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5 }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         >
//           <div className="flex flex-col items-center">
//             <span className="text-sm text-white/70 mb-2 animate-pulse">
//               Discover More ⬇️
//             </span>
//             <motion.div
//               animate={{ y: [0, 8, 0] }}
//               transition={{ repeat: Infinity, duration: 1.5 }}
//               className="w-8 h-12 border-2 border-white/30 rounded-3xl flex justify-center pt-2"
//             >
//               <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom Gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
//     </section>
//   );
// }
