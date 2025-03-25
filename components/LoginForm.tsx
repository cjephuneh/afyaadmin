"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("mburuelvis19@gmail.com");
  const [password, setPassword] = useState("Admin");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting login form...");
      const success = await login(email, password);

      if (success) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MailIcon className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="pl-10 h-12 rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LockIcon className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="pl-10 h-12 rounded-lg border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Forgot password?
        </a>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200 text-base font-medium shadow-md" 
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
