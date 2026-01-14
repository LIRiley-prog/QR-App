import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, QrCode, BarChart3, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-5xl font-bold text-gray-900 mb-6">
							Modern Attendance Tracking for Schools
						</h1>
						<p className="text-xl text-gray-600 mb-8">
							Streamline student attendance and movement tracking with secure QR-code technology.
							Get real-time insights while ensuring FERPA compliance and student privacy.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link to="/contact">
								<Button size="lg" className="text-lg px-8 py-6">
									Request a Demo
								</Button>
							</Link>
							<Link to="/how-it-works">
								<Button size="lg" variant="outline" className="text-lg px-8 py-6">
									See How It Works
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						Why Schools Choose SmartTrack
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card>
							<CardHeader>
								<QrCode className="size-12 text-blue-600 mb-4" />
								<CardTitle>Easy QR Scanning</CardTitle>
								<CardDescription>
									Students scan QR codes on entry and exit. No complex hardware required.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<BarChart3 className="size-12 text-blue-600 mb-4" />
								<CardTitle>Real-Time Insights</CardTitle>
								<CardDescription>
									Track attendance patterns and movement in real-time with powerful dashboards.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Shield className="size-12 text-blue-600 mb-4" />
								<CardTitle>FERPA Compliant</CardTitle>
								<CardDescription>
									Built with student privacy in mind. Fully compliant with federal regulations.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<CheckCircle2 className="size-12 text-blue-600 mb-4" />
								<CardTitle>Simple Setup</CardTitle>
								<CardDescription>
									Get started in minutes. Our team handles onboarding and training.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works Preview */}
			<section className="bg-blue-50 py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-6">
							Simple, Secure, Effective
						</h2>
						<p className="text-lg text-gray-700 mb-8">
							Students scan a QR code when entering or leaving a classroom or location.
							The system tracks their movement in real-time, providing teachers and administrators
							with instant visibility while protecting student privacy.
						</p>
						<Link to="/how-it-works">
							<Button size="lg" variant="outline">
								Learn More About How It Works
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none text-white">
						<CardContent className="py-12">
							<div className="max-w-3xl mx-auto text-center">
								<h2 className="text-3xl font-bold mb-4">
									Ready to Modernize Your School's Attendance System?
								</h2>
								<p className="text-lg mb-8 text-blue-50">
									Join hundreds of schools already using SmartTrack to improve attendance tracking
									and enhance student safety.
								</p>
								<Link to="/contact">
									<Button size="lg" variant="secondary" className="text-lg px-8 py-6">
										Schedule Your Demo Today
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
