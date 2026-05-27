import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Farmora</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering farmers with technology to streamline operations and
              maximize productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="hover:text-green-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-green-400 transition-colors"
                >
                  Login
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Farm Management</li>
              <li className="text-gray-400">Inventory Tracking</li>
              <li className="text-gray-400">Season Planning</li>
              <li className="text-gray-400">Employee Management</li>
              <li className="text-gray-400">Analytics & Reports</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">support@farmora.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+91 (123) 456-7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Farm Street, City, State - 123456
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Farmora. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
