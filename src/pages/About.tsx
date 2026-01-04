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
              Binmaley Catholic School, Inc., formerly Binmaley Catholic High School is a hidden gem for any newcomer, built in the heart of the town but beautifully concealed by other structures such as the Our Lady of Purification Church, Stella Maris Hospital (now the Oscar V. Cruz building), and Mary Help of Christian's Seminary. 
            </p>
            <p className="mb-4">
              BCHS, or BCSI, had humble origins. Established in June 1947 by the former parish priest, Rev. Fr. Francis L. Kutscher, SVD, and most Rev. Federico G. Limon, SVD, then assistant parish priest. It housed its first two hundred freshmen and sophomores in a nipa hut building that also served as a Catholic chapel adjacent to the church. A portion of the church served as a makeshift classroom until a concrete one-story structure was built in late 1947. The Bureau of Private Schools approved the operation of the four-year academic high school in 1948, and it was officially recognized in 1950. 
            </p>
            <p className="mb-4">
              To meet the standard requirement for school buildings, the main building was built in 1955 by the school's founder and assistant, Rev. Augustine Herbers, SVD, with the assistance of the new director, Rev. Fr. Henry Lattenkamp, SVD, and the school's principal, Mr. Pedro Castro. Additional lots near the main building were purchased by Fr. Lattenkamp and Fr. Leo Muehi. They also improved the school grounds and constructed school fencing. The late Rev. Alfred Kunze, SVD, succeeded Fr. Rac gave the structure a fresh look by painting it. 
            </p>
            <p className="mb-4">
              Fr. Leo Behneke's administration made significant, large-scale modifications to the school. He had the low-lying rice fields covered, planted, and converted into PMT, and then CAT parade grounds. Additional structures proceeded to sprout, with the first ten classroom buildings built in 1966-1967, the second in 1970, and the third for the faculty room and the Home Economics. These structures were built on the north and west sides of the parade grounds. Pavements leading to the annex buildings were also constructed. The school plant grew rapidly throughout BCHS' silver and golden years. It flew to remarkable success in academic, spiritual, and cultural activities. 
            </p>
            <p className="mb-4">
              The retirement of Fr. Behneke, the school's director in 1990, brought in Fr. Jose Carino, the new school principal, with his assistant, Fr. Juan Joel F. Ynzon, Fr. Carino, during his interim directorship, was able to have a concrete stage built behind the main building. Fr. Ynzon, the new director, constructed a director's residence on school grounds to serve as the director's quarters. A year later, he sought additional upgrades. The elementary department, which served grades 1-3, opened between 1933 and 1994. Following an increase in demand for quality education based on Christian values, a two-story elementary building was built to serve grade school students. To finish the elementary level, another eight-room building was constructed in front of the annex high school building. The expansion did not stop, but rather marched on. The elementary and pre-elementary departments were officially recognized by the government in 1977 and 1988. 
            </p>
            <p className="mb-4">
              Binmaley Catholic High School, Inc. was renamed Binmaley Catholic School, Inc. by amending Article 1 of the modified Articles of Incorporation in accordance with SEC Regulations. No. 105766 was issued on the 29th of July 1998. As a result, the teachers and staff must be limited and the terrain altered. An idea of establishing a gym to accommodate a variety of activities became a reality. Facilities were also upgraded especially with the advancement of modern technology. 
            </p>
            <p className="mb-4">
              Today, Binmaley Catholic School, Inc. endeavors to be a center for quality Catholic education, responding to the changing needs of the times. It has a glorious past to treasure, a proud tradition to preserve, a duty to complete, a high standard to uphold, and a profound dedication to the school's motto, "For God and Country," to live by.
            </p>
            <p className="mb-4">
              

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
                  To achieve the vision, Binmaley Catholic School, Inc.is committed to the following mission: 
                  
                  <li>1 <strong>Authenticity:</strong> To establish among member schools a Catholic identity centered on Jesus Christ, and aligned with the teachings of the church;</li>
                  <li>2 <strong>Leadership:</strong> To ensure a dynamic school operation through efficient governance; </li>
                  <li>3 <strong>Developmental Learning:</strong> To implement a curriculum enriched with Gospel values through effective instruction and witnessing;</li>
                  <li>4 <strong>Community:</strong> To build a harmonious Community in the spirit of synodality with respect to diversity; and;</li>
                   <li>5 <strong>Sustainability:</strong> To promote institutional advancement by establishing partnerships and linkages.</li>
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Vision</h3>
                <p className="text-muted-foreground">
                  In communio, the Binmaley Catholic School, Inc. form Christ-centered stewards through holistic education and formation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Core Values</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>1</strong> To nurture a Catholic identity of the school through faith formation, academic excellence, and service. </li>
                  <li><strong>2</strong> To foster effective and strategic sustainable development through cohesive administrative and financial management. </li>
                  <li><strong>3</strong> To enforce standardization of policies and benefits for the continued survival of the school and global competitiveness. </li>
                  <li><strong>4</strong> To implement a clearly articulated, rigorous curriculum that is responsive to relevant standards, employs 21st-century skills, is responsive to the Gospel values, and appreciative of the local culture through effective instruction. </li>
                  <li><strong>5</strong> To promote communion with the Church, other schools, stakeholders, and other social institutions to strengthen partnerships and linkages. </li>
                  <li><strong>6</strong> To produce worthy Christian citizens who are knowledgeable, skillful, globally competitive, and well-equipped with Filipino values.</li>
                  <li><strong>7</strong> To prepare learners to accept the challenges brought by the ever-changing trend of global innovations with the essential competencies and lifelong understanding they need. </li>
                  <li><strong>8</strong> To give every learner an equal opportunity to the services that the school has to offer and ensure that no learner is left behind.</li>
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
