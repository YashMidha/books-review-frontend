import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown, LogIn, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b bg-white px-4 py-3 flex items-center justify-between z-10">
      <Link to="/" className="flex items-center gap-2">
        <img src='/images/logo.png' className="w-10 h-10" />
        <span className="font-bold text-xl text-gray-800 tracking-wide" 
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          CalmReads
        </span>

      </Link>

      <div className="hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-8 text-base font-medium text-gray-600">
          <Link to="/">Home</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-900">
                Browse <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                <Link to="/search">Search</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <Link to="/browse/genre">Find by Genre</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <Link to="/browse/popular">Popular</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <>
              <Link to="/recommendation">Recommendations</Link>
              <Link to="/profile/list/all">My Library</Link>
            </>
          ) : (
            <>
              <Link className="flex items-center gap-1.5 text-green-600" to="/login">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </>
          )}
        </nav>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border border-gray-300 rounded-full h-12 w-12">
                <AvatarImage src={user.profileImg || "/images/default-profile.png"} />
                <AvatarFallback>{user.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-left hover:bg-red-50 focus:bg-red-50">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="md:hidden">
        {mobileOpen ? (
          <X className="h-6 w-6 cursor-pointer" onClick={() => setMobileOpen(false)} />
        ) : (
          <Menu className="h-6 w-6 cursor-pointer" onClick={() => setMobileOpen(true)} />
        )}
      </div>

      {mobileOpen && (
        <div className="absolute top-14 right-4 w-64 bg-white border rounded-lg shadow-lg p-4 z-50 md:hidden">
          {user && (
            <div className="flex items-center gap-3 mb-4 border-b pb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImg || "/images/default-profile.png"} />
                <AvatarFallback>{user.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-sm text-blue-500">
                  View Profile
                </Link>
              </div>
            </div>
          )}
          <nav className="flex flex-col gap-3 text-base">
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
            {user ? (
              <>
                <Link to="/recommendation" onClick={() => setMobileOpen(false)}>Recommendations</Link>
                <Link to="/profile/list/all" onClick={() => setMobileOpen(false)}>My Library</Link>

                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    Browse <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-3 flex flex-col gap-2 mt-2">
                    <Link to="/search" onClick={() => setMobileOpen(false)}>Search</Link>
                    <Link to="/browse/genre" onClick={() => setMobileOpen(false)}>Find by Genre</Link>
                    <Link to="/browse/popular" onClick={() => setMobileOpen(false)}>Popular</Link>
                  </CollapsibleContent>
                </Collapsible>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="text-left text-red-500 flex items-center gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/browse" onClick={() => setMobileOpen(false)}>Browse</Link>
                <Link className="flex items-center gap-1.5 text-green-600" to="/login" onClick={() => setMobileOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
