import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  ClipboardList,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Landing = () => {
  const features = [
    {
      icon: Target,
      title: "Track Applications",
      description:
        "Keep all your job applications organized in one place with detailed information and status tracking.",
    },
    {
      icon: TrendingUp,
      title: "Visual Progress",
      description:
        "See your job search progress at a glance with our intuitive Kanban-style board interface.",
    },
    {
      icon: CheckCircle,
      title: "Stay Organized",
      description:
        "Never miss an interview or forget application details with our comprehensive tracking system.",
    },
    {
      icon: ClipboardList,
      title: "Job Search Overview",
      description:
        "Get a clear picture of your job search journey with everything laid out in one easy-to-manage dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Take Control of Your
            <span className="text-blue-600 block">Job Search Journey</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Stay organized and focused during your job search. Track
            applications, manage interviews, and never miss an opportunity with
            our intuitive job tracking platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Job Search Success
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our platform provides all the tools you need to manage your job
            applications effectively and land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300"
              >
                <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Streamline Your Job Search?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Start organizing your job applications today and take control of
            your job search with ease.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg font-semibold text-lg"
          >
            Start Tracking Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
