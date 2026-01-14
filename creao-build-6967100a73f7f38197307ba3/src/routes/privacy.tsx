import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Lock, Eye, FileCheck, UserX, Database } from "lucide-react";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Privacy & Ethics
						</h1>
						<p className="text-lg text-gray-600">
							Student privacy and data protection are at the core of everything we do.
							SmartTrack is built to exceed federal compliance standards.
						</p>
					</div>
				</div>
			</section>

			{/* Core Commitments */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						Our Commitments
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<Card>
							<CardHeader>
								<Shield className="size-12 text-blue-600 mb-3" />
								<CardTitle>FERPA Compliant</CardTitle>
								<CardDescription>
									Fully compliant with the Family Educational Rights and Privacy Act.
									All student data is protected according to federal standards.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Lock className="size-12 text-blue-600 mb-3" />
								<CardTitle>Encrypted Data</CardTitle>
								<CardDescription>
									All data is encrypted in transit and at rest using bank-level security.
									Your data is safe from unauthorized access.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Eye className="size-12 text-blue-600 mb-3" />
								<CardTitle>Transparent Practices</CardTitle>
								<CardDescription>
									We're transparent about what data we collect, how we use it, and who can access it.
									No hidden practices or data selling.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* FERPA Compliance Details */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
							FERPA Compliance Measures
						</h2>
						<Card>
							<CardContent className="pt-6">
								<div className="space-y-6">
									<div className="flex gap-4">
										<FileCheck className="size-6 text-blue-600 flex-shrink-0 mt-1" />
										<div>
											<h3 className="font-semibold text-gray-900 mb-2">
												Limited Access to Education Records
											</h3>
											<p className="text-gray-600">
												Only authorized school personnel with legitimate educational interest
												can access student attendance records. Role-based permissions ensure
												data is only visible to those who need it.
											</p>
										</div>
									</div>
									<div className="flex gap-4">
										<UserX className="size-6 text-blue-600 flex-shrink-0 mt-1" />
										<div>
											<h3 className="font-semibold text-gray-900 mb-2">
												No Third-Party Data Sharing
											</h3>
											<p className="text-gray-600">
												We never sell, rent, or share student data with third parties for
												marketing or advertising purposes. Your data stays within your school.
											</p>
										</div>
									</div>
									<div className="flex gap-4">
										<Database className="size-6 text-blue-600 flex-shrink-0 mt-1" />
										<div>
											<h3 className="font-semibold text-gray-900 mb-2">
												Secure Data Storage
											</h3>
											<p className="text-gray-600">
												All data is stored in SOC 2 Type II certified data centers with
												redundant backups. Data retention policies align with school district
												requirements.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Ethical Use Guidelines */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
							Ethical Use Guidelines
						</h2>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									How do we protect student privacy?
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-gray-600">
										We implement multiple layers of privacy protection: (1) All personally
										identifiable information is encrypted, (2) Access is restricted based on
										role and need, (3) Audit logs track all data access, (4) Students and
										parents can request to review their data at any time, and (5) Data is
										automatically purged according to your retention policies.
									</p>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									What data do we collect?
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-gray-600">
										SmartTrack collects only essential data: student ID, timestamp of scan,
										location code, and attendance status. We do NOT collect: biometric data,
										location tracking outside of school premises, browsing history, or any
										data unrelated to attendance tracking.
									</p>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									Who owns the data?
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-gray-600">
										Your school owns all student data. SmartTrack is a data processor, not a
										data owner. You can export or delete your data at any time. If you
										terminate your contract, all data is securely deleted within 30 days
										unless you request otherwise.
									</p>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4">
								<AccordionTrigger>
									How long is data retained?
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-gray-600">
										Data retention periods are configurable based on your school's policies
										and state requirements. By default, attendance records are retained for
										the current academic year plus 5 years, in compliance with typical state
										education records retention requirements.
									</p>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-5">
								<AccordionTrigger>
									What happens in a data breach?
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-gray-600">
										In the unlikely event of a data breach, we immediately notify affected
										schools within 72 hours, conduct a full investigation, and work with
										cybersecurity experts to remediate the issue. We maintain comprehensive
										cyber insurance and have an incident response plan in place.
									</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>

			{/* Student Privacy Safeguards */}
			<section className="bg-blue-50 py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-6">
							Student Privacy Safeguards
						</h2>
						<div className="space-y-4 text-left">
							<div className="bg-white p-4 rounded-lg">
								<h3 className="font-semibold text-gray-900 mb-2">Anonymization Options</h3>
								<p className="text-gray-600">
									For reporting and analytics, data can be anonymized to show trends without
									identifying individual students.
								</p>
							</div>
							<div className="bg-white p-4 rounded-lg">
								<h3 className="font-semibold text-gray-900 mb-2">Parent/Guardian Rights</h3>
								<p className="text-gray-600">
									Parents and guardians can request access to their child's attendance records
									at any time through your school's designated process.
								</p>
							</div>
							<div className="bg-white p-4 rounded-lg">
								<h3 className="font-semibold text-gray-900 mb-2">Minimal Data Collection</h3>
								<p className="text-gray-600">
									We follow the principle of data minimization, collecting only what's
									necessary for attendance tracking and nothing more.
								</p>
							</div>
							<div className="bg-white p-4 rounded-lg">
								<h3 className="font-semibold text-gray-900 mb-2">Regular Security Audits</h3>
								<p className="text-gray-600">
									Our systems undergo regular third-party security audits and penetration
									testing to ensure continued protection.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Questions About Privacy?
						</h2>
						<p className="text-lg text-gray-600 mb-8">
							We're happy to discuss our privacy practices and compliance measures in detail.
						</p>
						<Link to="/contact">
							<Button size="lg" className="text-lg px-8 py-6">
								Contact Us
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
