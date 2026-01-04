import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Bell, AlertCircle, Megaphone, Pin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Announcements = () => {
  const announcements = [
    {
      date: "March 15, 2024",
      type: "important",
      title: "Enrollment for School Year 2024-2025 Now Open",
      content: "Enrollment for the upcoming school year is now open for both new and returning students. Visit the Registrar's Office during office hours to complete your enrollment.",
      pinned: true,
    },
    {
      date: "March 10, 2024",
      type: "event",
      title: "Upcoming Foundation Day Celebration",
      content: "Join us in celebrating our school's Foundation Day on March 25, 2024. Various activities and competitions will be held throughout the week.",
      pinned: false,
    },
    {
      date: "March 5, 2024",
      type: "academic",
      title: "Third Quarter Examination Schedule Released",
      content: "The schedule for third quarter examinations has been posted. Students are advised to check their respective class schedules and prepare accordingly.",
      pinned: false,
    },
    {
      date: "February 28, 2024",
      type: "event",
      title: "Science Fair 2024",
      content: "BCSI will host its annual Science Fair on April 5-6, 2024. All students are encouraged to participate and showcase their innovative projects.",
      pinned: false,
    },
    {
      date: "February 20, 2024",
      type: "academic",
      title: "Parent-Teacher Conference",
      content: "Parent-Teacher Conference is scheduled for March 8, 2024. Parents are requested to attend for updates on their children's academic progress.",
      pinned: false,
    },
    {
      date: "February 15, 2024",
      type: "important",
      title: "Scholarship Application Deadline",
      content: "Reminder: The deadline for scholarship applications is March 1, 2024. Submit all requirements to the Scholarship Committee before the due date.",
      pinned: false,
    },
  ];

  const importantDates = [
    { event: "Foundation Day", date: "March 25, 2024" },
    { event: "Third Quarter Exams", date: "March 18-22, 2024" },
    { event: "Science Fair", date: "April 5-6, 2024" },
    { event: "Holy Week Break", date: "March 28 - April 2, 2024" },
    { event: "Fourth Quarter Begins", date: "April 8, 2024" },
    { event: "Recognition Day", date: "May 30, 2024" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-5 w-5" />;
      case "event":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "important":
        return {
          badge: "bg-destructive/10 text-destructive border-destructive/20",
          icon: "bg-destructive text-destructive-foreground",
          border: "border-l-destructive",
        };
      case "event":
        return {
          badge: "bg-accent/20 text-accent-foreground border-accent/30",
          icon: "bg-accent text-accent-foreground",
          border: "border-l-accent",
        };
      default:
        return {
          badge: "bg-primary/10 text-primary border-primary/20",
          icon: "bg-primary text-primary-foreground",
          border: "border-l-primary",
        };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "important":
        return "Important";
      case "event":
        return "Event";
      default:
        return "Academic";
    }
  };

  const pinnedAnnouncements = announcements.filter((a) => a.pinned);
  const regularAnnouncements = announcements.filter((a) => !a.pinned);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Announcements"
        subtitle="Stay Updated with School News and Events"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Pinned Announcement Banner */}
        {pinnedAnnouncements.length > 0 && (
          <div className="mb-10">
            {pinnedAnnouncements.map((announcement, index) => {
              const styles = getTypeStyles(announcement.type);
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-gradient-to-r from-primary/5 via-background to-accent/5 overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-2 bg-primary" />
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Pin className="h-4 w-4" />
                          <span className="text-sm font-semibold uppercase tracking-wide">
                            Pinned
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${styles.badge} font-medium`}
                        >
                          {getTypeLabel(announcement.type)}
                        </Badge>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3">
                        {announcement.title}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-4">
                        {announcement.content}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {announcement.date}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-32 bg-primary/5">
                      <Megaphone className="h-16 w-16 text-primary/30" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Announcements */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Recent Updates
            </h3>
            {regularAnnouncements.map((announcement, index) => {
              const styles = getTypeStyles(announcement.type);
              return (
                <Card
                  key={index}
                  className={`border-0 shadow-md hover:shadow-lg transition-shadow border-l-4 ${styles.border} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 ${styles.icon}`}
                      >
                        {getIcon(announcement.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={`${styles.badge} text-xs font-medium`}
                          >
                            {getTypeLabel(announcement.type)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {announcement.date}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                          {announcement.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {announcement.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Important Dates Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-24 overflow-hidden">
              <div className="bg-primary p-4">
                <h3 className="text-xl font-serif font-bold text-primary-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Important Dates
                </h3>
              </div>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {importantDates.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            {item.event}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
