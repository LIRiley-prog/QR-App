import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pricing")({
	component: PricingPage,
});

function PricingPage() {
	const [studentCount, setStudentCount] = useState([500]);

	const calculatePrice = (students: number) => {
		if (students <= 250) return { perStudent: 3.99, tier: "Starter" };
		if (students <= 1000) return { perStudent: 2.99, tier: "Professional" };
		return { perStudent: 1.99, tier: "Enterprise" };
	};

	const { perStudent, tier } = calculatePrice(studentCount[0]);
	const annualCost = Math.round(studentCount[0] * perStudent);
	const monthlyCost = Math.round(annualCost / 12);

	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Simple, Transparent Pricing
						</h1>
						<p className="text-lg text-gray-600">
							Per-student pricing that scales with your school. No hidden fees, no contracts.
						</p>
					</div>
				</div>
			</section>

			{/* Pricing Calculator */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<Card className="max-w-3xl mx-auto">
						<CardHeader>
							<CardTitle className="text-2xl">Calculate Your Estimate</CardTitle>
							<CardDescription>
								Adjust the slider to see pricing for your school size
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-8">
							<div>
								<div className="flex justify-between items-center mb-4">
									<label className="text-sm font-medium text-gray-700">
										Number of Students
									</label>
									<div className="text-2xl font-bold text-blue-600">
										{studentCount[0].toLocaleString()}
									</div>
								</div>
								<Slider
									value={studentCount}
									onValueChange={setStudentCount}
									min={50}
									max={5000}
									step={50}
									className="w-full"
								/>
								<div className="flex justify-between text-xs text-gray-500 mt-2">
									<span>50</span>
									<span>5,000</span>
								</div>
							</div>

							<div className="bg-blue-50 p-6 rounded-lg">
								<div className="flex justify-between items-center mb-4">
									<div>
										<div className="text-sm text-gray-600">Your Tier</div>
										<Badge className="mt-1">{tier}</Badge>
									</div>
									<div className="text-right">
										<div className="text-sm text-gray-600">Per Student/Year</div>
										<div className="text-2xl font-bold text-blue-600">
											${perStudent}
										</div>
									</div>
								</div>
								<div className="border-t border-blue-200 pt-4 mt-4">
									<div className="flex justify-between items-end">
										<div>
											<div className="text-sm text-gray-600">Total Annual Cost</div>
											<div className="text-3xl font-bold text-gray-900">
												${annualCost.toLocaleString()}
											</div>
										</div>
										<div className="text-right">
											<div className="text-sm text-gray-600">Monthly Payment</div>
											<div className="text-xl font-semibold text-gray-900">
												${monthlyCost.toLocaleString()}/mo
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="text-center">
								<Link to="/contact">
									<Button size="lg" className="text-lg px-8 py-6">
										Get Started with {tier}
									</Button>
								</Link>
								<p className="text-sm text-gray-500 mt-3">
									14-day free trial • No credit card required
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Pricing Tiers */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						Pricing Tiers
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{/* Starter */}
						<Card>
							<CardHeader>
								<CardTitle>Starter</CardTitle>
								<CardDescription>Perfect for small schools</CardDescription>
								<div className="mt-4">
									<span className="text-4xl font-bold text-gray-900">$3.99</span>
									<span className="text-gray-600">/student/year</span>
								</div>
								<p className="text-sm text-gray-600 mt-2">Up to 250 students</p>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Unlimited QR code scans</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Teacher dashboard access</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Basic reporting</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Email support</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						{/* Professional */}
						<Card className="border-blue-600 border-2 relative">
							<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
								Most Popular
							</Badge>
							<CardHeader>
								<CardTitle>Professional</CardTitle>
								<CardDescription>For growing schools</CardDescription>
								<div className="mt-4">
									<span className="text-4xl font-bold text-gray-900">$2.99</span>
									<span className="text-gray-600">/student/year</span>
								</div>
								<p className="text-sm text-gray-600 mt-2">251 - 1,000 students</p>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Everything in Starter</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Admin dashboard access</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Advanced analytics</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Automated reports</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Priority support</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						{/* Enterprise */}
						<Card>
							<CardHeader>
								<CardTitle>Enterprise</CardTitle>
								<CardDescription>For large districts</CardDescription>
								<div className="mt-4">
									<span className="text-4xl font-bold text-gray-900">$1.99</span>
									<span className="text-gray-600">/student/year</span>
								</div>
								<p className="text-sm text-gray-600 mt-2">1,000+ students</p>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Everything in Professional</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Multi-school support</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Custom integrations</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">Dedicated account manager</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<span className="text-sm text-gray-700">24/7 phone support</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* What's Included */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
							All Plans Include
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex gap-3">
								<CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold text-gray-900">FERPA Compliance</h3>
									<p className="text-sm text-gray-600">Full compliance with federal privacy regulations</p>
								</div>
							</div>
							<div className="flex gap-3">
								<CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold text-gray-900">Unlimited Scans</h3>
									<p className="text-sm text-gray-600">No limits on QR code scans or check-ins</p>
								</div>
							</div>
							<div className="flex gap-3">
								<CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold text-gray-900">Data Export</h3>
									<p className="text-sm text-gray-600">Export your data anytime in CSV or PDF format</p>
								</div>
							</div>
							<div className="flex gap-3">
								<CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold text-gray-900">Free Updates</h3>
									<p className="text-sm text-gray-600">Automatic updates and new features at no extra cost</p>
								</div>
							</div>
							<div className="flex gap-3">
								<CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold text-gray-900">Training & Onboarding</h3>
									<p className="text-sm text-gray-600">Free training sessions for your staff</p>
								</div>
							</div>
							<div className="flex gap-3">
								<CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold text-gray-900">99.9% Uptime SLA</h3>
									<p className="text-sm text-gray-600">Reliable service you can count on</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-blue-50 py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Ready to Get Started?
						</h2>
						<p className="text-lg text-gray-600 mb-8">
							Start your 14-day free trial or schedule a demo to see SmartTrack in action.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link to="/contact">
								<Button size="lg" className="text-lg px-8 py-6">
									Request a Demo
								</Button>
							</Link>
							<Link to="/how-it-works">
								<Button size="lg" variant="outline" className="text-lg px-8 py-6">
									Learn More
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
