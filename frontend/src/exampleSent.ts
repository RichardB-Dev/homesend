import type { SentHome } from "./types";

export type ExampleDraft = {
  id: string;
  sentAt: string;
  clientName: string;
  clientEmail: string;
  properties: SentHome[];
};

export const exampleDrafts: ExampleDraft[] = [
  {
    "id": "example-amelia",
    "sentAt": "2026-11-17T09:15:00.000Z",
    "clientName": "Amelia Hart",
    "clientEmail": "amelia.hart@example.com",
    "properties": [
      {
        "id": "bemd1888",
        "reference": "BEMD1888",
        "title": "Luxury Calanova golf villas for sale with sea views",
        "summary": "La Cala de Mijas is one of the coast’s original fishing villages and it is now a vibrant town with a wonderful selection of boutiques, cafés, restaurants, supermarkets, golf…",
        "price": {
          "amount": 1900000,
          "currency": "EUR"
        },
        "municipality": "Cala de Mijas",
        "bedrooms": 4,
        "bathrooms": 4,
        "builtAreaM2": 407.01,
        "plotAreaM2": 1400,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsV3j2_xtKg7VsU1e9R7uCocKL9tj~ECOa1iXE9E_JzNlMe6CmGMlIjTLeyzoxM-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd1888/"
      },
      {
        "id": "bemd2680",
        "reference": "BEMD2680",
        "title": "Luxury Mijas Costa Townhouses for sale with sea views Mijas Costa townhouses",
        "summary": "Introducing an exclusive collection of 13 one-of-a-kind luxury Mijas Costa townhouses for sale with sea views, where Scandinavian design harmonises with the peaceful embrace of…",
        "price": {
          "amount": 1304485,
          "currency": "EUR"
        },
        "municipality": "Cala de Mijas",
        "bedrooms": 3,
        "bathrooms": 2,
        "builtAreaM2": 426.65,
        "plotAreaM2": 246.34,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaBIkSQf0YTgj4evz5KtesaCBeFat50g1WhvleFqRUhviIWn783crazSXDvZjQ-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2680/"
      },
      {
        "id": "bemd2013",
        "reference": "BEMD2013",
        "title": "Calanova Collection – Apartments & Penthouses Costa del Sol with sea views in Calanova Golf",
        "summary": "Calanova Collection is a fantastic new development of stunning contemporary apartments and penthouses with sea views in the sought-after area of Calanova Golf, just a stone’s…",
        "price": {
          "amount": 720000,
          "currency": "EUR"
        },
        "municipality": "Cala de Mijas",
        "bedrooms": 2,
        "bathrooms": 2,
        "builtAreaM2": 86.45,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsV1smkYZpaoLJgbzvAInHRxHik60MolBm2VYvGWAB0Y2x_fVmAwgAIzWKNQWAM-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2013/"
      },
      {
        "id": "bemd3172",
        "reference": "BEMD3172",
        "title": "Luxury off-plan Apartments in La Cala de Mijas",
        "summary": "Discover the epitome of Mediterranean luxury at Vission Hills, an exclusive gated residential development perfectly situated in the highly sought-after destination of La Cala de…",
        "price": {
          "amount": 684400,
          "currency": "EUR"
        },
        "municipality": "Cala de Mijas",
        "bedrooms": 3,
        "bathrooms": 2,
        "builtAreaM2": 113.51,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsclRg~kSs~laL8S01nLnSw3koCLSijIc2glao0NPaQ_zs6Wo2TUoQ~G6dZ0bGA-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd3172/"
      },
      {
        "id": "bemd3109",
        "reference": "BEMD3109",
        "title": "Contemporary apartments for sale in La Cala de Mijas, Mijas Costa with sea views",
        "summary": "Positioned within one of the most sought-after parts of the Costa del Sol, this newly built collection of contemporary apartments for sale in La Cala de Mijas, Mijas Costa with…",
        "price": {
          "amount": 676000,
          "currency": "EUR"
        },
        "municipality": "Cala de Mijas",
        "bedrooms": 3,
        "bathrooms": 2,
        "builtAreaM2": 100.3,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLscnhT5vgkNchbnL1TlHo0jiAjZa3FdsZOPLmJqSbvEU5p_L9wUtH9xv627PXOo-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd3109/"
      }
    ]
  },
  {
    "id": "example-james",
    "sentAt": "2026-11-15T16:40:00.000Z",
    "clientName": "James Whitaker",
    "clientEmail": "james.whitaker@example.com",
    "properties": [
      {
        "id": "bemv1882",
        "reference": "BEMV1882",
        "title": "Luxury Villa for sale in Nueva Andalucia, Marbella",
        "summary": "This Luxury is an exceptional classical estate nestled in the prestigious enclave of La Cerquilla, Marbella. This exquisite villa seamlessly blends French provincial charm with…",
        "price": {
          "amount": 8975000,
          "currency": "EUR"
        },
        "municipality": "Nueva Andalucia",
        "bedrooms": 6,
        "bathrooms": 6,
        "builtAreaM2": 712,
        "plotAreaM2": 2350,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaA4~Cz5uzrSLeCWNDXxbXsJdOrIatxNG9BX8bUKqWf5qLcH0z05zih0cAy2_U-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemv1882/"
      },
      {
        "id": "bemv1862",
        "reference": "BEMV1862",
        "title": "Semi Detached Villa for sale in Nueva Andalucia, Marbella",
        "summary": "This stunning newly-built modern semi-detached villa, is part of an exclusive project comprising 11 prestigious villas. Nestled within a gated community in Nueva Andalucia, this…",
        "price": {
          "amount": 4495000,
          "currency": "EUR"
        },
        "municipality": "Nueva Andalucia",
        "bedrooms": 4,
        "bathrooms": 4,
        "builtAreaM2": 489,
        "plotAreaM2": 195,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsVzbCYsRSIB3tI~c9v9_f1S~kf4G6TKZP6FgnII9lHI48XQKTYmo2WqI9fJzEI-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemv1862/"
      },
      {
        "id": "bemd2356",
        "reference": "BEMD2356",
        "title": "Contemporary apartments for sale in Marbella",
        "summary": "Welcome to a new standard of luxury living in the heart of Nueva Andalucia, with this new development of contemporary apartments for sale in Marbella, boasting an inspired design…",
        "price": {
          "amount": 749500,
          "currency": "EUR"
        },
        "municipality": "Nueva Andalucia",
        "bedrooms": 3,
        "bathrooms": 3,
        "builtAreaM2": 198,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsVwfQjtyycipHv6HhUnsd9gtbtF01PcFF_oy6dekTJpJPlctE48ITCQ~8dF38s-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2356/"
      },
      {
        "id": "bemd2357",
        "reference": "BEMD2357",
        "title": "Contemporary apartments for sale in Marbella",
        "summary": "Welcome to a new standard of luxury living in the heart of Nueva Andalucia, with this new development of contemporary apartments for sale in Marbella, boasting an inspired design…",
        "price": {
          "amount": 680000,
          "currency": "EUR"
        },
        "municipality": "Nueva Andalucia",
        "bedrooms": 3,
        "bathrooms": 2,
        "builtAreaM2": 208,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsVwfQuuZV3jo~4qrljDo~vMPkzYOhTeQMF5jGqMLW4iR35doo1DR5P96AKYBHk-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2357/"
      },
      {
        "id": "bemd2359",
        "reference": "BEMD2359",
        "title": "Contemporary apartments for sale in Marbella",
        "summary": "Welcome to a new standard of luxury living in the heart of Nueva Andalucia, with this new development of contemporary apartments for sale in Marbella, boasting an inspired design…",
        "price": {
          "amount": 571500,
          "currency": "EUR"
        },
        "municipality": "Nueva Andalucia",
        "bedrooms": 2,
        "bathrooms": 2,
        "builtAreaM2": 166,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsVwfQ3kMQXT6eZ~T7pzx5ztawspO_E6q9e2PZcCUBb39auVlwUtkmWlfqEaEb0-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2359/"
      }
    ]
  },
  {
    "id": "example-sofia",
    "sentAt": "2026-11-13T11:05:00.000Z",
    "clientName": "Sofia Navarro",
    "clientEmail": "sofia.navarro@example.com",
    "properties": [
      {
        "id": "bemv1886",
        "reference": "BEMV1886",
        "title": "Villa for sale in Estepona East, Estepona",
        "summary": "Villa for sale in Estepona East, Estepona with 7 bedrooms, 8 bathrooms, 8 en suite bathrooms and 2 toilets, with private swimming pool, private garage and private garden.…",
        "price": {
          "amount": 7650000,
          "currency": "EUR"
        },
        "municipality": "Estepona",
        "bedrooms": 7,
        "bathrooms": 8,
        "builtAreaM2": 1365,
        "plotAreaM2": 2500,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaA4~T2Vt1l4SG5ziR8AaVoSeNE_aXhLy3PHhMjamZg47not9XjRVNUo~bZDuA-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemv1886/"
      },
      {
        "id": "bemd1336",
        "reference": "BEMD1336",
        "title": "Luxurious beachfront development in Estepona",
        "summary": "This luxurious beachfront development in Estepona is in a prime position for enjoying all this area of coastline has to offer. Located just east of Puerto Banus and Marbella,…",
        "price": {
          "amount": 4290000,
          "currency": "EUR"
        },
        "municipality": "Estepona",
        "bedrooms": 3,
        "bathrooms": 3,
        "builtAreaM2": 547,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsNhqiKObzXiFrKifQJhTQQDuSJUUpgNTCTzlmoiwB6OE4ny6R76mx91Qq9YGdc-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd1336/"
      },
      {
        "id": "bemd2676",
        "reference": "BEMD2676",
        "title": "Luxury Estepona Golf apartments for sale in Los Flamingos  Estepona golf apartments",
        "summary": "Welcome to an exceptional opportunity for investors and homeowners alike – a gateway to an extraordinary life. Situated on the New Golden Mile, these luxury Estepona golf…",
        "price": {
          "amount": 1338000,
          "currency": "EUR"
        },
        "municipality": "Estepona",
        "bedrooms": 3,
        "bathrooms": 3,
        "builtAreaM2": 119.28,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaBIkGr38P~pQ28kvQg3rkvSzSPRXUbk0~2hjJVor66Z7SJk4QC2FsRQRJgIuo-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2676/"
      },
      {
        "id": "bemd1739",
        "reference": "BEMD1739",
        "title": "Stylish contemporary Estepona apartments with sea views",
        "summary": "Estepona is fast becoming one of hot spots of the Costa del Sol and the developers know it. Unique in maintaining its original Andalusian charm with its narrow white washed…",
        "price": {
          "amount": 643500,
          "currency": "EUR"
        },
        "municipality": "Estepona",
        "bedrooms": 2,
        "bathrooms": 2,
        "builtAreaM2": 117.91,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsTMg8MfWwlYK5gM2yczN62De2Q7ad3APEJdxnJvDrm5wKS9qqPpw0Hj~6JH7V8-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd1739/"
      },
      {
        "id": "bemd2411",
        "reference": "BEMD2411",
        "title": "Exclusive Apartments for sale in Las Mesas, Estepona",
        "summary": "Introducing the Las Mesas Collection, exclusive Estepona apartments for sale, nestled in the heart of the popular Costa del Sol resort, offering a luxurious lifestyle within…",
        "price": {
          "amount": 610000,
          "currency": "EUR"
        },
        "municipality": "Estepona",
        "bedrooms": 3,
        "bathrooms": 2,
        "builtAreaM2": 215,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsV~e2pbcEQfmXhecr4r69aS2pTJ6OZYTCxD58BzNuHICih5puqPDhwvm~gK5fY-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2411/"
      },
      {
        "id": "bemd1740",
        "reference": "BEMD1740",
        "title": "Stylish contemporary Estepona apartments with sea views",
        "summary": "Estepona is fast becoming one of hot spots of the Costa del Sol and the developers know it. Unique in maintaining its original Andalusian charm with its narrow white washed…",
        "price": {
          "amount": 537900,
          "currency": "EUR"
        },
        "municipality": "Estepona",
        "bedrooms": 3,
        "bathrooms": 3,
        "builtAreaM2": 157.85,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsTMg8Sgg9ceZJsJe~HOuGo7~_2XsK12h5PHDstAkPmgCvsCfFQzWTkX3gICRyQ-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd1740/"
      }
    ]
  },
  {
    "id": "example-henrik",
    "sentAt": "2026-11-10T14:20:00.000Z",
    "clientName": "Henrik Lindqvist",
    "clientEmail": "henrik.lindqvist@example.com",
    "properties": [
      {
        "id": "bemd2729",
        "reference": "BEMD2729",
        "title": "Luxury Benahavis apartments with Sea views Benahavis apartments",
        "summary": "This extraordinary collection of luxury Benahavis apartments with sea views and private pools, is designed to embody timeless elegance and modern sophistication. A true sanctuary…",
        "price": {
          "amount": 9895000,
          "currency": "EUR"
        },
        "municipality": "Benahavis",
        "bedrooms": 6,
        "bathrooms": 6,
        "builtAreaM2": 1021,
        "plotAreaM2": 921,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaG9G2mkrzSVfcVqyaf~Wz~Xw0tZyy_N2suoihZxVqwNARvRLURRJcTk9zBas0-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2729/"
      },
      {
        "id": "bemd2726",
        "reference": "BEMD2726",
        "title": "Luxury Benahavis apartments with Sea views Benahavis apartments",
        "summary": "This extraordinary collection of luxury Benahavis apartments with sea views and private pools, is designed to embody timeless elegance and modern sophistication. A true sanctuary…",
        "price": {
          "amount": 4950000,
          "currency": "EUR"
        },
        "municipality": "Benahavis",
        "bedrooms": 5,
        "bathrooms": 5,
        "builtAreaM2": 996027,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaG9Gazx1jua91ihfcCeYlOZJO7oQi9CvIwJI~Tmv8C4JM2SU6Xuwi45WCtSN4-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2726/"
      },
      {
        "id": "bemd2725",
        "reference": "BEMD2725",
        "title": "Luxury Benahavis apartments with Sea views Benahavis apartments",
        "summary": "This extraordinary collection of luxury Benahavis apartments with sea views and private pools, is designed to embody timeless elegance and modern sophistication. A true sanctuary…",
        "price": {
          "amount": 3400000,
          "currency": "EUR"
        },
        "municipality": "Benahavis",
        "bedrooms": 4,
        "bathrooms": 4,
        "builtAreaM2": 731.29,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaG9GeFawTfy8MPugJCGzNlzSG7erozpgflMELB6NkcHib1h32hVe3BZGLYFro-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2725/"
      },
      {
        "id": "bemd2724",
        "reference": "BEMD2724",
        "title": "Luxury Benahavis apartments with Sea views Benahavis apartments",
        "summary": "This extraordinary collection of luxury Benahavis apartments with sea views and private pools, is designed to embody timeless elegance and modern sophistication. A true sanctuary…",
        "price": {
          "amount": 1495000,
          "currency": "EUR"
        },
        "municipality": "Benahavis",
        "bedrooms": 2,
        "bathrooms": 2,
        "builtAreaM2": 129.22,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsaG9GRHIIFQ2jOWga9~sMSh6OrrkKIvWw48bVPkjd8ZSUn_1OcCBj4KDA~knKg-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2724/"
      }
    ]
  },
  {
    "id": "example-claire",
    "sentAt": "2026-11-07T10:00:00.000Z",
    "clientName": "Claire Dubois",
    "clientEmail": "claire.dubois@example.com",
    "properties": [
      {
        "id": "bemd2029",
        "reference": "BEMD2029",
        "title": "Luxury apartments & penthouses with sea views and onsite amenities",
        "summary": "Experience the exclusivity and luxury of these brand new apartments and penthouses perched on a hill with spectacular views of the Mediterranean Sea and the Fuengirola coastline…",
        "price": {
          "amount": 2595000,
          "currency": "EUR"
        },
        "municipality": "El Higueron",
        "bedrooms": 3,
        "bathrooms": 4,
        "builtAreaM2": 254.28,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsV1tNMdLj6rohlJVfunADzn5K~vQnUN128Qkcv~ssWw5OIKkzSnlMvF6Y32dA0-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2029/"
      },
      {
        "id": "bemd2027",
        "reference": "BEMD2027",
        "title": "Luxury apartments & penthouses with sea views and onsite amenities",
        "summary": "Experience the exclusivity and luxury of these brand new apartments and penthouses perched on a hill with spectacular views of the Mediterranean Sea and the Fuengirola coastline…",
        "price": {
          "amount": 871000,
          "currency": "EUR"
        },
        "municipality": "El Higueron",
        "bedrooms": 3,
        "bathrooms": 3,
        "builtAreaM2": 156,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsV1tNb5aK8PXSSInK4gZBJMhTbZE8FA1UJ22eI7XQ7~K9oX93tBjaxJqfeNjcM-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2027/"
      },
      {
        "id": "bemd2025",
        "reference": "BEMD2025",
        "title": "Luxury apartments & penthouses with sea views and onsite amenities",
        "summary": "Experience the exclusivity and luxury of these brand new apartments and penthouses perched on a hill with spectacular views of the Mediterranean Sea and the Fuengirola coastline…",
        "price": {
          "amount": 789000,
          "currency": "EUR"
        },
        "municipality": "El Higueron",
        "bedrooms": 3,
        "bathrooms": 2,
        "builtAreaM2": 153,
        "plotAreaM2": 35,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsVy~_Ii5gkpMRWLfiMziJyNQ1XWqEKKhmlK5Jkvjm68_LHHC~thgxT0dZ9gIFk-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd2025/"
      },
      {
        "id": "bemd1895",
        "reference": "BEMD1895",
        "title": "Uber contemporary apartments and penthouses for sale in the Higueron Resort with sea views",
        "summary": "Stunning contemporary Costa del Sol apartments with sea views for sale in the El Higueron Resort, Fuengirola. Exclusivity, an outstanding location, panoramic views of the…",
        "price": {
          "amount": 725000,
          "currency": "EUR"
        },
        "municipality": "El Higueron",
        "bedrooms": 3,
        "bathrooms": 2,
        "builtAreaM2": 146.93,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsV3igsNr3qOCGanbwQvr6KWI_1n_5XzPunLWV0F8BNSSgzyUupjNB3NnhPQk0M-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd1895/"
      },
      {
        "id": "bemd1897",
        "reference": "BEMD1897",
        "title": "Uber contemporary apartments and penthouses for sale in the Higueron Resort with sea views",
        "summary": "Stunning contemporary Costa del Sol apartments with sea views for sale in the El Higueron Resort, Fuengirola. Exclusivity, an outstanding location, panoramic views of the…",
        "price": {
          "amount": 545000,
          "currency": "EUR"
        },
        "municipality": "El Higueron",
        "bedrooms": 2,
        "bathrooms": 2,
        "builtAreaM2": 215.74,
        "plotAreaM2": null,
        "imageUrl": "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegpEFZhS0lI_F8U4XZVzV0gubTf_AnKFvmW8vBUvQb~qQ1~kBOFu3zLsV3igWy1hrEz_l4D8c3LN9aUMZfpKJ2vixod8cWaVuuZIQHA35fwy52iqcCkOE-.jpg",
        "sourceUrl": "https://bromleyestatesmarbella.com/property/bemd1897/"
      }
    ]
  }
];
