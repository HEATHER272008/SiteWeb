import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Loader2, Users } from "lucide-react";
import placeholderPerson from "@/assets/placeholder-person.jpg";

interface Organization {
  id: string;
  name: string;
  type: string;
  description: string | null;
  teacher_in_charge: string | null;
}

interface OrganizationMember {
  id: string;
  name: string;
  position: string | null;
  photo_url: string | null;
  display_order: number | null;
}

const OrganizationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrganization();
      fetchMembers();
    }
  }, [id]);

  const fetchOrganization = async () => {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      setOrganization(data);
    }
    setLoading(false);
  };

  const fetchMembers = async () => {
    const { data } = await supabase
      .from("organization_members")
      .select("*")
      .eq("organization_id", id)
      .order("display_order", { ascending: true });

    if (data) {
      setMembers(data);
    }
  };

  // Group members by position type
  const groupMembers = () => {
    const officers: OrganizationMember[] = [];
    const representatives: OrganizationMember[] = [];
    const regularMembers: OrganizationMember[] = [];

    members.forEach((member) => {
      const pos = member.position?.toLowerCase() || "";
      if (
        pos.includes("president") ||
        pos.includes("vice") ||
        pos.includes("secretary") ||
        pos.includes("treasurer") ||
        pos.includes("auditor") ||
        pos.includes("pio") ||
        pos.includes("officer")
      ) {
        officers.push(member);
      } else if (pos.includes("representative") || pos.includes("grade")) {
        representatives.push(member);
      } else {
        regularMembers.push(member);
      }
    });

    return { officers, representatives, regularMembers };
  };

  const { officers, representatives, regularMembers } = groupMembers();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Organization Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The organization you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/organizations">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Organizations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const MemberCard = ({ member }: { member: OrganizationMember }) => (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3 bg-muted">
          <img
            src={member.photo_url || placeholderPerson}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderPerson;
            }}
          />
        </div>
        <h4 className="font-semibold text-foreground">{member.name}</h4>
        {member.position && (
          <p className="text-sm text-primary font-medium">{member.position}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <PageHeader
        title={organization.name}
        subtitle={organization.type}
      />

      <div className="container mx-auto px-4 py-12">
        <Link to="/organizations">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Organizations
          </Button>
        </Link>

        {/* Organization Info */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {organization.description || "No description available."}
                </p>
              </div>
              <div>
                {organization.teacher_in_charge && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Teacher-in-Charge</p>
                          <p className="text-xl font-semibold text-primary">
                            {organization.teacher_in_charge}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members Section */}
        {members.length === 0 ? (
          <div className="text-center py-12 bg-secondary rounded-lg">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No members listed yet.</p>
            <p className="text-sm text-muted-foreground">
              Contact the organization adviser for membership information.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Officers */}
            {officers.length > 0 && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                  Officers
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {officers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Grade Level Representatives */}
            {representatives.length > 0 && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                  Grade Level Representatives
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {representatives.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Members */}
            {regularMembers.length > 0 && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                  Members
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {regularMembers.map((member) => (
                    <Card key={member.id} className="border-0 shadow-sm">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={member.photo_url || placeholderPerson}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = placeholderPerson;
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium truncate">{member.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationDetail;
