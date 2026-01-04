import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import placeholderPerson from "@/assets/placeholder-person.jpg";

interface PersonnelData {
  id: string;
  name: string;
  position: string;
  department: string | null;
  description: string | null;
  photo_url: string | null;
  display_order: number | null;
}

const Personnel = () => {
  const [personnel, setPersonnel] = useState<PersonnelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    const { data, error } = await supabase
      .from("personnel")
      .select("id, name, position, department, description, photo_url, display_order")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data) {
      setPersonnel(data);
    }
    setLoading(false);
  };

  const administration = personnel.filter(p => p.department === "Administration");
  const jhsTeachers = personnel.filter(p => p.department === "Junior High School");
  const shsTeachers = personnel.filter(p => p.department === "Senior High School");
  const supportStaff = personnel.filter(p => p.department === "Support Staff");
  const guidanceOffice = personnel.filter(p => p.department === "Guidance Office");

  const getPhotoUrl = (photoUrl: string | null) => {
    if (!photoUrl) return placeholderPerson;
    return photoUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHeader
          title="School Personnel"
          subtitle="Meet Our Dedicated Faculty and Staff"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading personnel...</p>
        </div>
      </div>
    );
  }

  if (personnel.length === 0) {
    return (
      <div className="min-h-screen">
        <PageHeader
          title="School Personnel"
          subtitle="Meet Our Dedicated Faculty and Staff"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Personnel information coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="School Personnel"
        subtitle="Meet Our Dedicated Faculty and Staff"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Administration */}
        {administration.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Administration
            </h2>
            
            {/* School Director - Featured at top center */}
            {administration.find(p => p.position === "School Director") && (
              <div className="flex justify-center mb-10">
                {administration
                  .filter(p => p.position === "School Director")
                  .map((person) => (
                    <Card key={person.id} className="border-0 shadow-xl text-center max-w-sm bg-gradient-to-b from-primary/5 to-background">
                      <CardContent className="p-8">
                        <div className="mb-4">
                          <img
                            src={getPhotoUrl(person.photo_url)}
                            alt={person.name}
                            className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-primary shadow-lg"
                          />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-primary mb-1">
                          {person.name}
                        </h3>
                        <p className="text-base font-semibold text-accent mb-3">{person.position}</p>
                        {person.description && (
                          <p className="text-sm text-muted-foreground">{person.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}

            {/* Other Administrators */}
            {administration.filter(p => p.position !== "School Director").length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {administration
                  .filter(p => p.position !== "School Director")
                  .map((person) => (
                    <Card key={person.id} className="border-0 shadow-lg text-center">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <img
                            src={getPhotoUrl(person.photo_url)}
                            alt={person.name}
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
                          />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-primary mb-1">
                          {person.name}
                        </h3>
                        <p className="text-sm font-medium text-accent mb-3">{person.position}</p>
                        {person.description && (
                          <p className="text-sm text-muted-foreground">{person.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </section>
        )}

        {/* Junior High School Faculty */}
        {jhsTeachers.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Junior High School Faculty
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jhsTeachers.map((person) => (
                <Card key={person.id} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={getPhotoUrl(person.photo_url)}
                        alt={person.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary mb-1">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-accent mb-2">{person.position}</p>
                    {person.description && (
                      <p className="text-xs text-muted-foreground">{person.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Senior High School Faculty */}
        {shsTeachers.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Senior High School Faculty
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shsTeachers.map((person) => (
                <Card key={person.id} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={getPhotoUrl(person.photo_url)}
                        alt={person.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary mb-1">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-accent mb-2">{person.position}</p>
                    {person.description && (
                      <p className="text-xs text-muted-foreground">{person.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Guidance Office */}
        {guidanceOffice.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Guidance Office
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {guidanceOffice.map((person) => (
                <Card key={person.id} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={getPhotoUrl(person.photo_url)}
                        alt={person.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary mb-1">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-accent mb-2">{person.position}</p>
                    {person.description && (
                      <p className="text-xs text-muted-foreground">{person.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Support Staff */}
        {supportStaff.length > 0 && (
          <section>
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Support Staff
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportStaff.map((person) => (
                <Card key={person.id} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={getPhotoUrl(person.photo_url)}
                        alt={person.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary mb-1">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-accent mb-2">{person.position}</p>
                    {person.description && (
                      <p className="text-xs text-muted-foreground">{person.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Personnel;
