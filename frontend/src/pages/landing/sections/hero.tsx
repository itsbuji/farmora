import { ChevronDown } from "lucide-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

interface HeroSectionProps {
  onScrollToAbout: () => void;
  onScrollToPackages: () => void;
  onScrollToContact: () => void;
}

const HeroSection = ({
  onScrollToAbout,
  onScrollToPackages,
  onScrollToContact,
}: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-xl">F</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Farmora</h1>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onScrollToAbout}
              className="hidden md:block text-white hover:text-green-200 transition-colors"
            >
              About
            </button>
            <button
              onClick={onScrollToPackages}
              className="hidden md:block text-white hover:text-green-200 transition-colors"
            >
              Packages
            </button>
            <button
              onClick={onScrollToContact}
              className="hidden md:block text-white hover:text-green-200 transition-colors"
            >
              Contact
            </button>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              size="small"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Farm Management
            <br />
            Made Simple
          </h2>
          <p className="text-xl md:text-2xl text-green-50 mb-8 max-w-2xl mx-auto">
            Streamline your farm operations with our comprehensive management
            system. Track inventory, manage seasons, and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="contained"
              size="large"
              onClick={onScrollToPackages}
            >
              View Packages
            </Button>
            <Button variant="contained" size="large" onClick={onScrollToAbout}>
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={onScrollToAbout}
          className="text-white hover:text-green-200 transition-colors"
        >
          <ChevronDown size={40} />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
