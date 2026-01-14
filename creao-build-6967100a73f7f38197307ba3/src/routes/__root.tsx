import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FloatingBanner } from "@/components/FloatingBanner";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4">
					<nav className="flex items-center justify-between">
						<Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
							<GraduationCap className="size-8" />
							<span>SmartTrack</span>
						</Link>
						<div className="hidden md:flex items-center gap-6">
							<Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
								How It Works
							</Link>
							<Link to="/features" className="text-gray-700 hover:text-blue-600 transition-colors">
								Features
							</Link>
							<Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
								Pricing
							</Link>
							<Link to="/privacy" className="text-gray-700 hover:text-blue-600 transition-colors">
								Privacy & Ethics
							</Link>
							<Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
								About Us
							</Link>
							<Link to="/contact">
								<Button>Request a Demo</Button>
							</Link>
						</div>
					</nav>
				</div>
			</header>
			<ErrorBoundary tagName="main" className="flex-1">
				<Outlet />
			</ErrorBoundary>
			<footer className="bg-white border-t border-gray-200 py-8">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center gap-2 text-lg font-bold text-blue-600 mb-4">
								<GraduationCap className="size-6" />
								<span>SmartTrack</span>
							</div>
							<p className="text-gray-600 text-sm">
								Modern attendance and movement tracking for schools
							</p>
						</div>
						<div>
							<h3 className="font-semibold text-gray-900 mb-3">Product</h3>
							<ul className="space-y-2 text-sm">
								<li><Link to="/how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link></li>
								<li><Link to="/features" className="text-gray-600 hover:text-blue-600">Features</Link></li>
								<li><Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-gray-900 mb-3">Company</h3>
							<ul className="space-y-2 text-sm">
								<li><Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
								<li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy & Ethics</Link></li>
								<li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-gray-900 mb-3">Get Started</h3>
							<Link to="/contact">
								<Button className="w-full">Request a Demo</Button>
							</Link>
						</div>
					</div>
					<div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
						<p>&copy; 2026 SmartTrack. All rights reserved.</p>
					</div>
				</div>
			</footer>
			<TanStackRouterDevtools position="bottom-right" />
			<FloatingBanner position="bottom-left" />
		</div>
	);
}
