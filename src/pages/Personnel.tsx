import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import placeholderPerson from "@/assets/placeholder-person.jpg";

const Personnel = () => {
  const administration = [
    {
      name: "Rev. Fr. [Name]",
      position: "School Director",
      description: "Provides spiritual guidance and overall direction for the school.",
    },
    {
      name: "[Name]",
      position: "Senior High School Principal",
      description: "Oversees academic programs and student affairs for Senior High School.",
    },
    {
      name: "[Name]",
      position: "Junior High School Principal",
      description: "Manages curriculum and student development for Junior High School.",
    },
  ];

  const departments = [
    {
      name: "English Department",
      teachers: ["[Teacher Name 1]", "[Teacher Name 2]", "[Teacher Name 3]"],
    },
    {
      name: "Mathematics Department",
      teachers: ["[Teacher Name 1]", "[Teacher Name 2]", "[Teacher Name 3]"],
    },
    {
      name: "Science Department",
      teachers: ["[Teacher Name 1]", "[Teacher Name 2]", "[Teacher Name 3]"],
    },
    {
      name: "Filipino Department",
      teachers: ["[Teacher Name 1]", "[Teacher Name 2]"],
    },
    {
      name: "Social Studies Department",
      teachers: ["[Teacher Name 1]", "[Teacher Name 2]"],
    },
    {
      name: "MAPEH Department",
      teachers: ["[Teacher Name 1]", "[Teacher Name 2]"],
    },
  ];

  const supportStaff = [
    {
      name: "[Name]",
      position: "Librarian",
      description: "Manages library resources and assists students with research needs.",
    },
    {
      name: "[Name]",
      position: "Guidance Counselor",
      description: "Provides academic and personal counseling services to students.",
    },
    {
      name: "[Names]",
      position: "Canteen Staff",
      description: "Ensures nutritious meals and snacks are available for students and staff.",
    },
    {
      name: "[Names]",
      position: "Maintenance Staff",
      description: "Maintains cleanliness and upkeep of school facilities.",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="School Personnel"
        subtitle="Meet Our Dedicated Faculty and Staff"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Administration */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            Administration
          </h2>
          
          {/* School Director - Featured at top center */}
          <div className="flex justify-center mb-10">
            <Card className="border-0 shadow-xl text-center max-w-sm bg-gradient-to-b from-primary/5 to-background">
              <CardContent className="p-8">
                <div className="mb-4">
                  <img
                    src={placeholderPerson}
                    alt={administration[0].name}
                    className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-primary shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-1">
                  {administration[0].name}
                </h3>
                <p className="text-base font-semibold text-accent mb-3">{administration[0].position}</p>
                <p className="text-sm text-muted-foreground">{administration[0].description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Other Administrators */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {administration.slice(1).map((person, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={placeholderPerson}
                      alt={person.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-1">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-accent mb-3">{person.position}</p>
                  <p className="text-sm text-muted-foreground">{person.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Teaching Staff */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            Teaching Faculty
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-bold text-primary mb-4">
                    {dept.name}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {dept.teachers.map((teacher, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0" />
                        <span className="text-sm">{teacher}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Staff */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            Support Staff
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportStaff.map((person, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={placeholderPerson}
                      alt={person.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-primary mb-1">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-accent mb-2">{person.position}</p>
                  <p className="text-xs text-muted-foreground">{person.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Personnel;
