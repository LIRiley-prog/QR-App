import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DemoRequestORM, type DemoRequestModel } from "@/sdk/database/orm/orm_demo_request";
import { CheckCircle2, Calendar, Users, Building2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

const formSchema = z.object({
	school_name: z.string().min(2, "School name must be at least 2 characters"),
	contact_person_name: z.string().min(2, "Contact name must be at least 2 characters"),
	contact_email: z.string().email("Please enter a valid email address"),
	contact_phone: z.string().optional(),
	student_count: z.number().min(1, "Student count must be at least 1"),
	preferred_demo_time: z.string().optional(),
	additional_notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			school_name: "",
			contact_person_name: "",
			contact_email: "",
			contact_phone: "",
			student_count: 0,
			preferred_demo_time: "",
			additional_notes: "",
		},
	});

	async function onSubmit(values: FormData) {
		setIsSubmitting(true);
		try {
			const orm = DemoRequestORM.getInstance();
			const demoRequest: Partial<DemoRequestModel> = {
				school_name: values.school_name,
				contact_person_name: values.contact_person_name,
				contact_email: values.contact_email,
				contact_phone: values.contact_phone || null,
				student_count: values.student_count,
				preferred_demo_time: values.preferred_demo_time || null,
				additional_notes: values.additional_notes || null,
			};

			await orm.insertDemoRequest([demoRequest as DemoRequestModel]);

			setIsSubmitted(true);
			toast.success("Demo request submitted successfully!");
			form.reset();
		} catch (error) {
			console.error("Error submitting demo request:", error);
			toast.error("Failed to submit demo request. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (isSubmitted) {
		return (
			<div className="py-16">
				<div className="container mx-auto px-4">
					<Card className="max-w-2xl mx-auto text-center">
						<CardContent className="pt-16 pb-16">
							<CheckCircle2 className="size-20 text-green-600 mx-auto mb-6" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Thank You!
							</h2>
							<p className="text-lg text-gray-600 mb-8">
								We've received your demo request and will be in touch within 24 hours
								to schedule your personalized SmartTrack demonstration.
							</p>
							<Button
								onClick={() => setIsSubmitted(false)}
								variant="outline"
							>
								Submit Another Request
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Request a Demo
						</h1>
						<p className="text-lg text-gray-600">
							See SmartTrack in action. Fill out the form below and we'll schedule
							a personalized demo for your school.
						</p>
					</div>
				</div>
			</section>

			{/* Form Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{/* Form */}
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle>Demo Request Form</CardTitle>
								<CardDescription>
									Tell us about your school and we'll get back to you within 24 hours
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
										<FormField
											control={form.control}
											name="school_name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>School/District Name *</FormLabel>
													<FormControl>
														<Input placeholder="Lincoln Elementary School" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="contact_person_name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Contact Person Name *</FormLabel>
													<FormControl>
														<Input placeholder="Jane Smith" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<FormField
												control={form.control}
												name="contact_email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email Address *</FormLabel>
														<FormControl>
															<Input type="email" placeholder="jane@school.edu" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="contact_phone"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Phone Number</FormLabel>
														<FormControl>
															<Input type="tel" placeholder="(555) 123-4567" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name="student_count"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Number of Students *</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="500"
															{...field}
															onChange={(e) => field.onChange(Number(e.target.value))}
														/>
													</FormControl>
													<FormDescription>
														Approximate number of students in your school
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="preferred_demo_time"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Preferred Demo Time</FormLabel>
													<FormControl>
														<Input
															type="datetime-local"
															{...field}
														/>
													</FormControl>
													<FormDescription>
														Optional: Select your preferred date and time
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="additional_notes"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Additional Notes or Questions</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Tell us about any specific requirements or questions you have..."
															className="min-h-32"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
											{isSubmitting ? "Submitting..." : "Request Demo"}
										</Button>
									</form>
								</Form>
							</CardContent>
						</Card>

						{/* Sidebar */}
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">What to Expect</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex gap-3">
										<Calendar className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<div>
											<h4 className="font-semibold text-sm text-gray-900">Quick Response</h4>
											<p className="text-sm text-gray-600">We'll contact you within 24 hours</p>
										</div>
									</div>
									<div className="flex gap-3">
										<Users className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<div>
											<h4 className="font-semibold text-sm text-gray-900">Personalized Demo</h4>
											<p className="text-sm text-gray-600">Tailored to your school's needs</p>
										</div>
									</div>
									<div className="flex gap-3">
										<CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
										<div>
											<h4 className="font-semibold text-sm text-gray-900">No Obligation</h4>
											<p className="text-sm text-gray-600">Free demo with no commitment</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-blue-50 border-none">
								<CardContent className="pt-6">
									<h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-2 text-sm text-gray-700">
											<Mail className="size-4 text-blue-600" />
											<span>demo@smarttrack.edu</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-700">
											<Phone className="size-4 text-blue-600" />
											<span>(555) 123-4567</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-700">
											<Building2 className="size-4 text-blue-600" />
											<span>Available Mon-Fri, 9AM-5PM EST</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
