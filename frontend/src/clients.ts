export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const clients: Client[] = [
  { id: "c41", name: "Richard Burke", email: "richardburke.acc@gmail.com", phone: "" },
  { id: "c42", name: "Katia Egorova", email: "eev.egorova@gmail.com", phone: "" },
  { id: "c43", name: "George Nayda", email: "hello@georgenayda.com", phone: "+34 951 870 121" },
  { id: "c01", name: "Amelia Hart", email: "amelia.hart@example.com", phone: "+34 611 204 118" },
  { id: "c02", name: "James Whitaker", email: "james.whitaker@example.com", phone: "+34 622 418 903" },
  { id: "c03", name: "Sofia Navarro", email: "sofia.navarro@example.com", phone: "+34 633 771 240" },
  { id: "c04", name: "Henrik Lindqvist", email: "henrik.lindqvist@example.com", phone: "+46 70 412 88 19" },
  { id: "c05", name: "Claire Dubois", email: "claire.dubois@example.com", phone: "+33 6 18 44 29 07" },
  { id: "c06", name: "Oliver Bennett", email: "oliver.bennett@example.com", phone: "+44 7700 900 218" },
  { id: "c07", name: "Lucia Moretti", email: "lucia.moretti@example.com", phone: "+39 347 220 1844" },
  { id: "c08", name: "Marcus Keller", email: "marcus.keller@example.com", phone: "+49 151 4482 1903" },
  { id: "c09", name: "Elena Varga", email: "elena.varga@example.com", phone: "+34 644 902 551" },
  { id: "c10", name: "Thomas Reed", email: "thomas.reed@example.com", phone: "+44 7700 900 441" },
  { id: "c11", name: "Ingrid Solberg", email: "ingrid.solberg@example.com", phone: "+47 412 88 903" },
  { id: "c12", name: "Pablo Herrera", email: "pablo.herrera@example.com", phone: "+34 655 318 772" },
  { id: "c13", name: "Charlotte Hughes", email: "charlotte.hughes@example.com", phone: "+44 7700 900 662" },
  { id: "c14", name: "Antoine Laurent", email: "antoine.laurent@example.com", phone: "+33 6 72 19 44 08" },
  { id: "c15", name: "Nina Kowalski", email: "nina.kowalski@example.com", phone: "+48 512 440 918" },
  { id: "c16", name: "Daniel Okonkwo", email: "daniel.okonkwo@example.com", phone: "+34 666 120 884" },
  { id: "c17", name: "Freya Janssen", email: "freya.janssen@example.com", phone: "+31 6 1844 2901" },
  { id: "c18", name: "Miguel Santos", email: "miguel.santos@example.com", phone: "+351 912 448 203" },
  { id: "c19", name: "Hannah Cole", email: "hannah.cole@example.com", phone: "+44 7700 900 773" },
  { id: "c20", name: "Leo Fischer", email: "leo.fischer@example.com", phone: "+41 79 448 21 90" },
  { id: "c21", name: "Isabel Romero", email: "isabel.romero@example.com", phone: "+34 677 204 331" },
  { id: "c22", name: "Patrick Byrne", email: "patrick.byrne@example.com", phone: "+353 87 441 2908" },
  { id: "c23", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", phone: "+81 90 4412 8803" },
  { id: "c24", name: "Emma Larsson", email: "emma.larsson@example.com", phone: "+46 73 220 1844" },
  { id: "c25", name: "Carlos Mendes", email: "carlos.mendes@example.com", phone: "+34 688 441 902" },
  { id: "c26", name: "Sophie Martin", email: "sophie.martin@example.com", phone: "+33 6 44 18 29 70" },
  { id: "c27", name: "William Price", email: "william.price@example.com", phone: "+44 7700 900 884" },
  { id: "c28", name: "Anouk de Vries", email: "anouk.devries@example.com", phone: "+31 6 2204 8819" },
  { id: "c29", name: "Rafael Costa", email: "rafael.costa@example.com", phone: "+351 934 118 440" },
  { id: "c30", name: "Grace Campbell", email: "grace.campbell@example.com", phone: "+44 7700 900 995" },
  { id: "c31", name: "Mateo Alvarez", email: "mateo.alvarez@example.com", phone: "+34 699 218 440" },
  { id: "c32", name: "Helene Berg", email: "helene.berg@example.com", phone: "+47 922 44 180" },
  { id: "c33", name: "Jonathan Hale", email: "jonathan.hale@example.com", phone: "+1 415 555 0148" },
  { id: "c34", name: "Camila Rossi", email: "camila.rossi@example.com", phone: "+39 333 448 2190" },
  { id: "c35", name: "Owen Murphy", email: "owen.murphy@example.com", phone: "+353 86 220 4418" },
  { id: "c36", name: "Lara Petrov", email: "lara.petrov@example.com", phone: "+34 610 884 229" },
  { id: "c37", name: "Hugo Bernard", email: "hugo.bernard@example.com", phone: "+33 6 90 22 18 44" },
  { id: "c38", name: "Priya Shah", email: "priya.shah@example.com", phone: "+44 7700 900 126" },
  { id: "c39", name: "Anders Holm", email: "anders.holm@example.com", phone: "+45 20 44 18 92" },
  { id: "c40", name: "Victoria Lane", email: "victoria.lane@example.com", phone: "+44 7700 900 337" },
].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

function compact(value: string): string {
  return value.toLowerCase().replace(/[\s+()-]/g, "");
}

export function matchingClients(query: string): Client[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return clients;
  const digits = compact(needle);
  return clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(needle) ||
      client.email.toLowerCase().includes(needle) ||
      compact(client.phone).includes(digits)
    );
  });
}
