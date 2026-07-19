import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Eye,
  Globe,
  BarChart3,
  FileText,
  Mail,
  ArrowRight,
  Edit,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const user = await requireUser();

  const db = await import("@portfolio/db");

  const [portfolios, resumes, coverLetters, linkedInProfile, subscription] =
    await Promise.all([
      db.getPortfoliosByUserId(user.id),
      db.getResumesByUserId(user.id),
      db.getCoverLettersByUserId(user.id),
      db.getLinkedInProfileByUserId(user.id),
      db.getSubscriptionByUserId(user.id),
    ]);

  const publishedPortfolios = portfolios.filter((p: any) => p.published);
  const creditsLeft = subscription?.credits ?? 10;
  const hasLinkedIn = !!linkedInProfile;

  const stats = [
    {
      label: "Portfolios",
      value: String(portfolios.length),
      icon: Globe,
      change: `${publishedPortfolios.length} published`,
    },
    {
      label: "Resumes",
      value: String(resumes.length),
      icon: FileText,
      change: resumes.length > 0 ? "Ready to export" : "Generate your first",
    },
    {
      label: "Cover Letters",
      value: String(coverLetters.length),
      icon: Mail,
      change: coverLetters.length > 0 ? "Ready to download" : "Create one",
    },
    {
      label: "AI Credits",
      value: `${creditsLeft}/10`,
      icon: BarChart3,
      change: "Resets in 30 days",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name || "there"}. Here&apos;s your overview.
          </p>
        </div>
        <div className="flex gap-3">
          {!linkedInProfile && (
            <Button variant="outline" asChild>
              <Link href="/onboarding">
                <Linkedin className="mr-2 h-4 w-4" />
                Import LinkedIn
              </Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/generate">
              <Plus className="mr-2 h-4 w-4" />
              New Portfolio
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LinkedIn Profile Status */}
      {!linkedInProfile && (
        <Card className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900">
                <Linkedin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold">Import your LinkedIn profile</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your LinkedIn to generate AI-powered portfolios, resumes, and cover letters.
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/onboarding">
                Import Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Items */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Portfolios */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Portfolios</CardTitle>
              <CardDescription>
                {portfolios.length > 0
                  ? `You have ${portfolios.length} portfolio${portfolios.length !== 1 ? "s" : ""}`
                  : "Create your first portfolio"}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/generate">
                <Plus className="mr-1 h-3 w-3" />
                New
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {portfolios.length > 0 ? (
              <div className="space-y-3">
                {portfolios.slice(0, 3).map((portfolio: any) => (
                  <div
                    key={portfolio.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {portfolio.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={portfolio.published ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {portfolio.published ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          /{portfolio.slug}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/editor/portfolio/${portfolio.id}`}>
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Link>
                      </Button>
                      {portfolio.published ? (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/portfolio/${portfolio.slug}`}>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                <Globe className="mb-4 h-10 w-10 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">No portfolios yet</h3>
                <p className="mb-4 text-sm text-muted-foreground text-center">
                  Create your first AI-powered portfolio from your LinkedIn profile.
                </p>
                <Button asChild>
                  <Link href="/generate">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Portfolio
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resumes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Resumes & Cover Letters</CardTitle>
              <CardDescription>
                {resumes.length + coverLetters.length > 0
                  ? `${resumes.length} resume${resumes.length !== 1 ? "s" : ""}, ${coverLetters.length} cover letter${coverLetters.length !== 1 ? "s" : ""}`
                  : "Generate your first resume"}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/generate">
                <Plus className="mr-1 h-3 w-3" />
                Generate
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {resumes.length > 0 || coverLetters.length > 0 ? (
              <div className="space-y-3">
                {resumes.slice(0, 2).map((resume: any) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{resume.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {resume.template} template
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/editor/resume/${resume.id}`}>
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
                {coverLetters.length > 0 && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-xs text-muted-foreground mb-2">
                      {coverLetters.length} cover letter{coverLetters.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                <FileText className="mb-4 h-10 w-10 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">No resumes yet</h3>
                <p className="mb-4 text-sm text-muted-foreground text-center">
                  Generate AI-powered resumes and cover letters from your LinkedIn profile.
                </p>
                <Button asChild>
                  <Link href="/generate">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with these common tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
              asChild
            >
              <Link href="/onboarding">
                <Linkedin className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Import LinkedIn</div>
                  <div className="text-xs text-muted-foreground">
                    {linkedInProfile
                      ? "Update your profile"
                      : "Connect your LinkedIn"}
                  </div>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
              asChild
            >
              <Link href="/generate">
                <Globe className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Generate Portfolio</div>
                  <div className="text-xs text-muted-foreground">
                    AI-powered from your profile
                  </div>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
              asChild
            >
              <Link href="/generate">
                <FileText className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Create Resume</div>
                  <div className="text-xs text-muted-foreground">
                    ATS-optimized from your data
                  </div>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
              asChild
            >
              <Link href="/generate">
                <Mail className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Write Cover Letter</div>
                  <div className="text-xs text-muted-foreground">
                    Tailored for each application
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
