import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	CheckCircle2,
	BarChart3,
	Bell,
	FileText,
	Users,
	Clock,
	Shield,
	Zap,
	TrendingUp,
	Filter,
	Download,
	UserCheck
} from "lucide-react";

export const Route = createFileRoute("/features")({
	component: FeaturesPage,
});

function FeaturesPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Powerful Features for Schools
						</h1>
						<p className="text-lg text-gray-600">
							Everything you need to manage attendance and track student movement,
							from real-time dashboards to automated reports.
						</p>
					</div>
				</div>
			</section>

			{/* Dashboard Tabs */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<Tabs defaultValue="teacher" className="max-w-5xl mx-auto">
						<TabsList className="grid w-full grid-cols-2 mb-8">
							<TabsTrigger value="teacher">Teacher Dashboard</TabsTrigger>
							<TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
						</TabsList>

						<TabsContent value="teacher">
							<div className="space-y-6">
								<div className="text-center mb-8">
									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										Teacher Dashboard
									</h2>
									<p className="text-gray-600">
										Everything teachers need to track attendance and manage their classroom
									</p>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<Card>
										<CardHeader>
											<UserCheck className="size-10 text-blue-600 mb-3" />
											<CardTitle>Real-Time Attendance</CardTitle>
											<CardDescription>
												See who's present in your classroom at a glance. Get instant notifications
												when students enter or leave.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<Clock className="size-10 text-blue-600 mb-3" />
											<CardTitle>Attendance History</CardTitle>
											<CardDescription>
												View complete attendance records for any student. Track patterns and
												identify chronic absences early.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<Bell className="size-10 text-blue-600 mb-3" />
											<CardTitle>Smart Alerts</CardTitle>
											<CardDescription>
												Receive automatic alerts for tardiness, unusual patterns, or students
												who haven't checked in.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<FileText className="size-10 text-blue-600 mb-3" />
											<CardTitle>Quick Reports</CardTitle>
											<CardDescription>
												Generate attendance reports for any date range. Export to CSV or PDF
												for record-keeping.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<TrendingUp className="size-10 text-blue-600 mb-3" />
											<CardTitle>Attendance Trends</CardTitle>
											<CardDescription>
												Visualize attendance patterns over time. Identify students who need
												additional support.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<Zap className="size-10 text-blue-600 mb-3" />
											<CardTitle>One-Click Actions</CardTitle>
											<CardDescription>
												Mark absences, send parent notifications, and update records with
												simple, intuitive controls.
											</CardDescription>
										</CardHeader>
									</Card>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="admin">
							<div className="space-y-6">
								<div className="text-center mb-8">
									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										Administrator Dashboard
									</h2>
									<p className="text-gray-600">
										Comprehensive tools for school-wide attendance management and insights
									</p>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<Card>
										<CardHeader>
											<BarChart3 className="size-10 text-blue-600 mb-3" />
											<CardTitle>School-Wide Analytics</CardTitle>
											<CardDescription>
												View attendance metrics across all grades, classes, and demographics.
												Track trends and identify areas for improvement.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<Users className="size-10 text-blue-600 mb-3" />
											<CardTitle>Student Movement Tracking</CardTitle>
											<CardDescription>
												Monitor student location history throughout the school day. Ensure
												safety and accountability.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<Filter className="size-10 text-blue-600 mb-3" />
											<CardTitle>Advanced Filtering</CardTitle>
											<CardDescription>
												Filter data by grade, class, teacher, date range, or custom criteria.
												Drill down into specific cohorts.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<Download className="size-10 text-blue-600 mb-3" />
											<CardTitle>Automated Reports</CardTitle>
											<CardDescription>
												Schedule daily, weekly, or monthly reports. Automatically email
												summaries to stakeholders.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<Shield className="size-10 text-blue-600 mb-3" />
											<CardTitle>Role-Based Access</CardTitle>
											<CardDescription>
												Control who sees what data. Assign permissions by role to protect
												student privacy.
											</CardDescription>
										</CardHeader>
									</Card>
									<Card>
										<CardHeader>
											<CheckCircle2 className="size-10 text-blue-600 mb-3" />
											<CardTitle>Compliance Reporting</CardTitle>
											<CardDescription>
												Generate reports that meet state and federal requirements. Ensure
												compliance with attendance regulations.
											</CardDescription>
										</CardHeader>
									</Card>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Additional Features */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
							Built for Modern Schools
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
									<Shield className="size-8" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
								<p className="text-sm text-gray-600">
									Bank-level encryption and FERPA compliance built in from day one
								</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
									<Zap className="size-8" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
								<p className="text-sm text-gray-600">
									Real-time updates and instant insights with no lag or delays
								</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
									<Users className="size-8" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
								<p className="text-sm text-gray-600">
									Intuitive interface designed with teachers and admins in mind
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
							Experience All Features in a Live Demo
						</h2>
						<p className="text-lg text-gray-600 mb-8">
							See how SmartTrack's powerful features can transform attendance management at your school.
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
