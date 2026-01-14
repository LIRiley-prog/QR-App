import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							About SmartTrack
						</h1>
						<p className="text-lg text-gray-600">
							We're on a mission to modernize school attendance tracking while
							protecting student privacy and empowering educators.
						</p>
					</div>
				</div>
			</section>

			{/* Mission Statement */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<Card className="bg-blue-50 border-none">
							<CardContent className="pt-6">
								<div className="flex items-start gap-4">
									<Target className="size-12 text-blue-600 flex-shrink-0" />
									<div>
										<h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
										<p className="text-lg text-gray-700 leading-relaxed">
											SmartTrack was founded by educators and technologists who saw firsthand
											the challenges schools face with outdated attendance systems. We believe
											that tracking student attendance shouldn't require expensive hardware,
											complex training, or compromise on privacy. Our mission is to provide
											schools with a simple, secure, and affordable solution that helps
											educators focus on what matters most: teaching and supporting students.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Our Values */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						Our Values
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<Card>
							<CardHeader>
								<Heart className="size-12 text-blue-600 mb-3" />
								<CardTitle>Student-First Approach</CardTitle>
								<CardDescription>
									Every decision we make prioritizes student privacy, safety, and well-being.
									We're committed to building technology that serves students and educators,
									not the other way around.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Users className="size-12 text-blue-600 mb-3" />
								<CardTitle>Educator Partnership</CardTitle>
								<CardDescription>
									We work closely with teachers and administrators to understand their needs.
									Our product roadmap is driven by feedback from the education community.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Lightbulb className="size-12 text-blue-600 mb-3" />
								<CardTitle>Continuous Innovation</CardTitle>
								<CardDescription>
									We're constantly improving SmartTrack with new features, better security,
									and enhanced usability based on the latest educational technology research.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Our Story */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
							Our Story
						</h2>
						<div className="space-y-6 text-gray-700">
							<p className="text-lg">
								SmartTrack began in 2024 when our founding team—former teachers, school
								administrators, and software engineers—came together with a shared frustration.
								Schools were spending tens of thousands of dollars on complex attendance systems
								that required dedicated hardware, extensive training, and often failed to deliver
								the real-time insights educators needed.
							</p>
							<p className="text-lg">
								We knew there had to be a better way. With smartphones already in students' hands
								or provided by schools, and QR codes being universally understood and easy to use,
								we set out to build a solution that would be both powerful and simple.
							</p>
							<p className="text-lg">
								Today, SmartTrack serves hundreds of schools across the country, helping track
								millions of student check-ins each month. But we're just getting started. We're
								committed to continually improving our platform, expanding our features, and
								supporting schools in their mission to provide the best possible education for
								every student.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="bg-blue-50 py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-6">
							Built by Educators, for Educators
						</h2>
						<p className="text-lg text-gray-700 mb-8">
							Our team combines decades of experience in education, software development,
							and data privacy. We understand the unique challenges schools face because
							many of us have lived them firsthand.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-white p-6 rounded-lg">
								<div className="text-5xl mb-4">🎓</div>
								<h3 className="font-semibold text-gray-900 mb-2">15+</h3>
								<p className="text-sm text-gray-600">Years of combined education experience</p>
							</div>
							<div className="bg-white p-6 rounded-lg">
								<div className="text-5xl mb-4">🏫</div>
								<h3 className="font-semibold text-gray-900 mb-2">500+</h3>
								<p className="text-sm text-gray-600">Schools using SmartTrack</p>
							</div>
							<div className="bg-white p-6 rounded-lg">
								<div className="text-5xl mb-4">🔒</div>
								<h3 className="font-semibold text-gray-900 mb-2">100%</h3>
								<p className="text-sm text-gray-600">FERPA compliance commitment</p>
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
							Join the SmartTrack Community
						</h2>
						<p className="text-lg text-gray-600 mb-8">
							Discover how SmartTrack can help your school modernize attendance tracking
							while keeping student privacy at the forefront.
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
