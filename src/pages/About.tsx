import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import placeholderPerson from "@/assets/placeholder-person.jpg";

const About = () => {
  const formerDirectors = [
    { name: "[Former Director Name]", years: "[Year - Year]" },
    { name: "[Former Director Name]", years: "[Year - Year]" },
  ];

  const formerSHSPrincipals = [
    { name: "[Former SHS Principal]", years: "[Year - Year]" },
  ];

  const formerJHSPrincipals = [
    { name: "[Former JHS Principal]", years: "[Year - Year]" },
    { name: "[Former JHS Principal]", years: "[Year - Year]" },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="About BCSI"
        subtitle="Our History, Mission, and Vision"
      />

      <div className="container mx-auto px-4 py-16">
        {/* History */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our History</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              Binmaley Catholic School, Inc. was founded with a vision to provide quality Catholic
              education to the youth of Binmaley and surrounding communities. Since our establishment,
              we have remained committed to our founding principles of academic excellence, moral
              integrity, and spiritual growth.
            </p>
            <p className="mb-4">
              Throughout the years, BCSI has grown from a small institution into a respected
              educational facility known for producing well-rounded graduates who excel in their
              chosen fields. Our alumni have gone on to become leaders in various industries,
              carrying with them the values and principles instilled during their time at BCSI.
            </p>
            <p>
              Today, we continue to uphold our tradition of excellence while adapting to modern
              educational standards and methodologies, ensuring our students receive the best
              possible preparation for their future.
            </p>
          </div>
        </section>

        {/* Former School Directors */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Former School Directors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {formerDirectors.map((director, index) => (
              <Card key={index} className="border-0 shadow-md text-center">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <img
                      src={placeholderPerson}
                      alt={director.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                    />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{director.name}</h4>
                  <p className="text-xs text-muted-foreground">{director.years}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Former Principals */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Former Principals</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* SHS Principals */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Senior High School</h3>
              <div className="grid grid-cols-2 gap-4">
                {formerSHSPrincipals.map((principal, index) => (
                  <Card key={index} className="border-0 shadow-md text-center">
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <img
                          src={placeholderPerson}
                          alt={principal.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary"
                        />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{principal.name}</h4>
                      <p className="text-xs text-muted-foreground">{principal.years}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* JHS Principals */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Junior High School</h3>
              <div className="grid grid-cols-2 gap-4">
                {formerJHSPrincipals.map((principal, index) => (
                  <Card key={index} className="border-0 shadow-md text-center">
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <img
                          src={placeholderPerson}
                          alt={principal.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary"
                        />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{principal.name}</h4>
                      <p className="text-xs text-muted-foreground">{principal.years}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Core Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Mission</h3>
                <p className="text-muted-foreground">
                  To provide quality Catholic education that nurtures the spiritual, intellectual,
                  and social development of every student, empowering them to become responsible
                  citizens and effective leaders guided by Christian values.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Vision</h3>
                <p className="text-muted-foreground">
                  To be a premier Catholic educational institution recognized for academic excellence,
                  strong moral foundation, and producing graduates who are competent, compassionate,
                  and committed to serving God and community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Core Values</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Faith:</strong> Rooted in Catholic teachings</li>
                  <li>• <strong>Excellence:</strong> Pursuit of academic quality</li>
                  <li>• <strong>Integrity:</strong> Honesty and moral uprightness</li>
                  <li>• <strong>Service:</strong> Commitment to community</li>
                  <li>• <strong>Respect:</strong> Dignity for all persons</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Campus Map */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Campus Map</h2>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-secondary h-96 flex items-center justify-center">
                <p className="text-muted-foreground text-lg">
                  [Campus Map Placeholder - To be replaced with actual map image]
                </p>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Our campus features modern classrooms, a well-equipped library, science laboratories,
            computer rooms, chapel, sports facilities, and spacious grounds for student activities.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
