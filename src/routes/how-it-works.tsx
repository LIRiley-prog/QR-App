import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Smartphone, Monitor, BarChart3, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
	component: HowItWorksPage,
});

function HowItWorksPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							How SmartTrack Works
						</h1>
						<p className="text-lg text-gray-600">
							A simple, secure QR-code system that tracks student attendance and movement
							in real-time without complex hardware or training.
						</p>
					</div>
				</div>
			</section>

			{/* Step by Step Process */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						The Process in 4 Simple Steps
					</h2>
					<div className="max-w-4xl mx-auto space-y-8">
						{/* Step 1 */}
						<div className="flex flex-col md:flex-row gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
									1
								</div>
							</div>
							<Card className="flex-1">
								<CardHeader>
									<div className="flex items-center gap-3 mb-2">
										<QrCode className="size-8 text-blue-600" />
										<CardTitle>Generate QR Codes</CardTitle>
									</div>
									<CardDescription className="text-base">
										Each classroom, hallway, or location gets a unique QR code. Print and post them
										at entry/exit points. Setup takes just minutes.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>

						<div className="flex justify-center">
							<ArrowRight className="size-8 text-blue-400" />
						</div>

						{/* Step 2 */}
						<div className="flex flex-col md:flex-row gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
									2
								</div>
							</div>
							<Card className="flex-1">
								<CardHeader>
									<div className="flex items-center gap-3 mb-2">
										<Smartphone className="size-8 text-blue-600" />
										<CardTitle>Students Scan In/Out</CardTitle>
									</div>
									<CardDescription className="text-base">
										Students use their school device or phone to scan the QR code when entering
										or leaving a location. The scan takes less than 2 seconds.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>

						<div className="flex justify-center">
							<ArrowRight className="size-8 text-blue-400" />
						</div>

						{/* Step 3 */}
						<div className="flex flex-col md:flex-row gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
									3
								</div>
							</div>
							<Card className="flex-1">
								<CardHeader>
									<div className="flex items-center gap-3 mb-2">
										<Monitor className="size-8 text-blue-600" />
										<CardTitle>Real-Time Data Capture</CardTitle>
									</div>
									<CardDescription className="text-base">
										Each scan is instantly recorded in the system. Timestamps, locations, and
										student IDs are securely logged and encrypted.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>

						<div className="flex justify-center">
							<ArrowRight className="size-8 text-blue-400" />
						</div>

						{/* Step 4 */}
						<div className="flex flex-col md:flex-row gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
									4
								</div>
							</div>
							<Card className="flex-1">
								<CardHeader>
									<div className="flex items-center gap-3 mb-2">
										<BarChart3 className="size-8 text-blue-600" />
										<CardTitle>View Insights & Reports</CardTitle>
									</div>
									<CardDescription className="text-base">
										Teachers and administrators access dashboards showing attendance patterns,
										movement history, and alerts. Export reports with one click.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Data Flow Diagram */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
							Secure Data Flow
						</h2>
						<Card>
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
										<div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
											A
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">Student Scans QR Code</h3>
											<p className="text-sm text-gray-600">
												Mobile device camera captures the QR code at a location
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
										<div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
											B
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">Encrypted Transmission</h3>
											<p className="text-sm text-gray-600">
												Data is encrypted and sent securely to SmartTrack servers
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
										<div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
											C
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">FERPA-Compliant Storage</h3>
											<p className="text-sm text-gray-600">
												Records stored in compliance with federal privacy regulations
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
										<div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
											D
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">Dashboard Access</h3>
											<p className="text-sm text-gray-600">
												Authorized staff view data through role-based access controls
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Ready to See It in Action?
						</h2>
						<p className="text-lg text-gray-600 mb-8">
							Schedule a demo to see how SmartTrack can work for your school.
						</p>
						<Link to="/contact">
							<Button size="lg" className="text-lg px-8 py-6">
								Request a Demo
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
