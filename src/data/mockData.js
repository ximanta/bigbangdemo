export const categories = [
  'Politics',
  'Technology',
  'Sports',
  'Lifestyle',
  'Health',
  'Science'
];

export const articles = [
  {
    id: '1',
    slug: 'future-of-ai-in-daily-life',
    title: 'The Future of AI: Integrating Intelligence into Daily Life',
    category: 'Technology',
    author: 'Alice Johnson',
    date: '2023-10-26',
    image: 'https://via.placeholder.com/600x400?text=AI+Future',
    excerpt: 'Artificial intelligence continues to advance at an unprecedented pace, promising to reshape how we live, work, and interact. From smart homes to personalized healthcare, AI is set to become an invisible yet integral part of our daily routines.',
    content: [
      { type: 'paragraph', text: 'Artificial intelligence is no longer a futuristic concept but a rapidly evolving reality. Its integration into daily life is accelerating, promising a transformation in various sectors.' },
      { type: 'image', src: 'https://via.placeholder.com/800x450?text=AI+Robots', caption: 'AI-powered robots assisting in daily tasks.' },
      { type: 'paragraph', text: 'One of the most significant impacts will be seen in smart home technology. AI-powered assistants will learn user preferences, anticipate needs, and manage everything from lighting and temperature to security systems, creating truly intelligent living spaces.' },
      { type: 'paragraph', text: 'In healthcare, AI is already revolutionizing diagnostics, drug discovery, and personalized treatment plans. Wearable devices will monitor health metrics in real-time, providing predictive insights and preventative care.' },
      { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Watch a brief overview of AI in healthcare.' },
      { type: 'paragraph', text: 'The ethical considerations surrounding AI development, such as data privacy and algorithmic bias, remain crucial. Ensuring responsible AI deployment will be key to harnessing its full potential while mitigating risks.' }
    ]
  },
  {
    id: '2',
    slug: 'global-economy-outlook-2024',
    title: 'Global Economic Outlook 2024: Navigating Uncertainty',
    category: 'Politics',
    author: 'Robert Smith',
    date: '2023-10-25',
    image: 'https://via.placeholder.com/600x400?text=Global+Economy',
    excerpt: 'Economists predict a year of cautious growth and persistent challenges for the global economy in 2024. Inflation, geopolitical tensions, and supply chain disruptions continue to be major concerns for policymakers worldwide.',
    content: [
      { type: 'paragraph', text: 'The global economy is poised for a period of careful navigation in 2024, with various factors influencing its trajectory. Central banks worldwide are grappling with inflation.' },
      { type: 'paragraph', text: 'Geopolitical events, particularly ongoing conflicts and trade disputes, are expected to cast long shadows over economic stability. Energy prices and supply chain resilience remain critical vulnerabilities.' },
      { type: 'paragraph', text: 'Emerging markets may face particular challenges, but also opportunities for growth if they can attract investment and diversify their economies. Digital transformation continues to be a driving force.' }
    ]
  },
  {
    id: '3',
    slug: 'new-training-regimen-for-marathon-runners',
    title: 'Revolutionary Training Regimen for Marathon Runners',
    category: 'Sports',
    author: 'Emily White',
    date: '2023-10-24',
    image: 'https://via.placeholder.com/600x400?text=Marathon+Training',
    excerpt: 'A new science-backed training methodology promises to significantly improve marathon performance and reduce injury risk. This regimen focuses on personalized intensity zones and recovery techniques.',
    content: [
      { type: 'paragraph', text: 'Marathon training often involves pushing physical limits, but a new approach emphasizes smart, data-driven preparation. This method combines advanced physiological insights with practical training schedules.' },
      { type: 'paragraph', text: 'Key components include tailored heart rate zone training, strength and conditioning exercises specifically designed for runners, and an emphasis on active recovery and nutrition. The goal is to optimize performance without overtraining.' },
      { type: 'image', src: 'https://via.placeholder.com/800x450?text=Runner+Training', caption: 'A runner executing a new interval training session.' }
    ]
  },
  {
    id: '4',
    slug: 'mindful-eating-for-better-health',
    title: 'Mindful Eating: A Path to Better Health and Well-being',
    category: 'Lifestyle',
    author: 'Sophia Lee',
    date: '2023-10-23',
    image: 'https://via.placeholder.com/600x400?text=Mindful+Eating',
    excerpt: 'Beyond diets and calorie counting, mindful eating encourages a deeper connection with food, promoting healthier habits, improved digestion, and a more positive relationship with what you consume.',
    content: [
      { type: 'paragraph', text: 'In a fast-paced world, eating often becomes a hurried affair. Mindful eating offers an alternative, inviting individuals to slow down and truly experience their food.' },
      { type: 'paragraph', text: 'It involves paying attention to the senses during a meal – the aroma, texture, and taste – and recognizing hunger and fullness cues. This practice can lead to better portion control and reduced emotional eating.' },
      { type: 'paragraph', text: 'Studies suggest that mindful eating can help in weight management, reduce symptoms of binge eating, and improve overall digestive health. It is a holistic approach to nutrition that focuses on awareness rather than strict rules.' }
    ]
  },
  {
    id: '5',
    slug: 'breakthroughs-in-cancer-research',
    title: 'New Breakthroughs in Cancer Research Offer Hope',
    category: 'Health',
    author: 'David Chen',
    date: '2023-10-22',
    image: 'https://via.placeholder.com/600x400?text=Cancer+Research',
    excerpt: 'Recent advancements in oncology, including novel immunotherapies and targeted drug delivery systems, are showing promising results in clinical trials, bringing new hope to patients.',
    content: [
      { type: 'paragraph', text: 'The fight against cancer continues to see remarkable progress. Scientists are constantly discovering new ways to understand and combat the disease, leading to more effective treatments.' },
      { type: 'paragraph', text: 'Immunotherapy, which harnesses the body\'s own immune system to fight cancer, has been a game-changer. New forms of CAR T-cell therapy and checkpoint inhibitors are being developed with higher efficacy and fewer side effects.' },
      { type: 'image', src: 'https://via.placeholder.com/800x450?text=Medical+Lab', caption: 'Researchers working on new cancer therapies.' },
      { type: 'paragraph', text: 'Another exciting area is targeted drug delivery, where therapies are designed to specifically attack cancer cells while sparing healthy tissue. Nanotechnology is playing a crucial role in making this possible.' }
    ]
  },
  {
    id: '6',
    slug: 'exploring-the-deepest-ocean-trenches',
    title: 'Exploring the Deepest Ocean Trenches: New Discoveries',
    category: 'Science',
    author: 'Laura Green',
    date: '2023-10-21',
    image: 'https://via.placeholder.com/600x400?text=Ocean+Exploration',
    excerpt: 'Submersible missions to the deepest parts of the ocean are revealing bizarre new species and shedding light on extremophile ecosystems, expanding our understanding of life on Earth.',
    content: [
      { type: 'paragraph', text: 'The ocean\'s abyssal zones remain one of Earth\'s last unexplored frontiers. Recent expeditions equipped with advanced submersibles are piercing the darkness to uncover its secrets.' },
      { type: 'paragraph', text: 'Researchers have identified several new species of fish, crustaceans, and microorganisms adapted to extreme pressure and lack of light. These discoveries provide insights into the resilience of life.' },
      { type: 'video', src: 'https://www.youtube.com/embed/Pj1E0aE_r0U', caption: 'Footage from a deep-sea submersible mission.' },
      { type: 'paragraph', text: 'The data collected also helps us understand plate tectonics, seismic activity, and the role of deep-sea ecosystems in global carbon cycles. Protecting these fragile environments is becoming increasingly important.' }
    ]
  },
  {
    id: '7',
    slug: 'the-rise-of-sustainable-fashion',
    title: 'The Rise of Sustainable Fashion: Eco-Conscious Trends',
    category: 'Lifestyle',
    author: 'Chloe Brown',
    date: '2023-10-20',
    image: 'https://via.placeholder.com/600x400?text=Sustainable+Fashion',
    excerpt: 'The fashion industry is undergoing a green revolution, with designers and consumers alike embracing sustainable practices, ethical sourcing, and upcycled materials to reduce environmental impact.',
    content: [
      { type: 'paragraph', text: 'Consumers are increasingly aware of the environmental and social costs of fast fashion. This awareness is driving a significant shift towards sustainable practices across the industry.' },
      { type: 'paragraph', text: 'Brands are focusing on using organic, recycled, and upcycled materials, reducing water consumption, and ensuring fair labor practices throughout their supply chains. Transparency is becoming a key differentiator.' },
      { type: 'image', src: 'https://via.placeholder.com/800x450?text=Eco+Clothing', caption: 'Eco-friendly clothing made from recycled materials.' },
      { type: 'paragraph', text: 'The trend extends beyond production to consumption, with growing interest in clothing rental, repair, and second-hand markets. This collective effort aims to create a more circular and responsible fashion ecosystem.' }
    ]
  },
  {
    id: '8',
    slug: 'advances-in-quantum-computing',
    title: 'Quantum Computing: From Theory to Practical Applications',
    category: 'Technology',
    author: 'Michael Taylor',
    date: '2023-10-19',
    image: 'https://via.placeholder.com/600x400?text=Quantum+Computing',
    excerpt: 'Once a theoretical concept, quantum computing is rapidly moving towards practical applications, promising to solve complex problems intractable for classical computers, from drug discovery to financial modeling.',
    content: [
      { type: 'paragraph', text: 'Quantum computing harnesses the principles of quantum mechanics to perform calculations far beyond the capabilities of even the most powerful supercomputers. This field is on the cusp of delivering groundbreaking solutions.' },
      { type: 'paragraph', text: 'Applications include accelerating drug discovery by simulating molecular interactions, optimizing complex logistical problems, breaking modern encryption, and developing highly sophisticated AI algorithms.' },
      { type: 'image', src: 'https://via.placeholder.com/800x450?text=Quantum+Processor', caption: 'A quantum processor chip.' },
      { type: 'paragraph', text: 'Despite significant progress, challenges remain in building stable and scalable quantum computers. However, research continues to push the boundaries, making quantum supremacy a tangible goal.' }
    ]
  },
  {
    id: '9',
    slug: 'olympic-games-preparations-underway',
    title: 'Olympic Games Preparations Underway: A Look Behind the Scenes',
    category: 'Sports',
    author: 'Jessica Adams',
    date: '2023-10-18',
    image: 'https://via.placeholder.com/600x400?text=Olympic+Stadium',
    excerpt: 'With the next Olympic Games just around the corner, host cities are bustling with activity. We take a look at the massive undertaking of preparing venues, infrastructure, and security for the world\'s biggest sporting event.',
    content: [
      { type: 'paragraph', text: 'Hosting the Olympic Games is a monumental task that requires years of meticulous planning and execution. From state-of-the-art stadiums to athlete villages, every detail is carefully considered.' },
      { type: 'paragraph', text: 'Infrastructure development, including transportation networks and accommodation, is a major focus. Security measures are also paramount to ensure the safety of athletes, officials, and spectators.' },
      { type: 'paragraph', text: 'Beyond the physical preparations, cultural programs and sustainability initiatives are increasingly integrated into the planning, aiming to leave a positive and lasting legacy for the host city and its residents.' }
    ]
  },
  {
    id: '10',
    slug: 'mediterranean-diet-long-term-benefits',
    title: 'The Mediterranean Diet: Proven Long-Term Health Benefits',
    category: 'Health',
    author: 'Dr. Anya Sharma',
    date: '2023-10-17',
    image: 'https://via.placeholder.com/600x400?text=Mediterranean+Food',
    excerpt: 'Consistently ranked as one of the healthiest eating patterns, the Mediterranean diet is celebrated for its emphasis on whole foods, healthy fats, and plant-based proteins, offering a wealth of long-term health advantages.',
    content: [
      { type: 'paragraph', text: 'The Mediterranean diet is more than just a diet; it\'s a lifestyle pattern rooted in the traditional eating habits of countries bordering the Mediterranean Sea. Its benefits are extensively researched and widely acclaimed.' },
      { type: 'paragraph', text: 'Key components include a high intake of vegetables, fruits, whole grains, nuts, seeds, and olive oil as the primary fat source. Fish and poultry are consumed in moderation, while red meat is limited.' },
      { type: 'image', src: 'https://via.placeholder.com/800x450?text=Healthy+Plate', caption: 'A typical healthy Mediterranean meal.' },
      { type: 'paragraph', text: 'Studies consistently link the Mediterranean diet to a reduced risk of heart disease, stroke, type 2 diabetes, and certain cancers. It also supports brain health and promotes longevity.' }
    ]
  },
  {
    id: '11',
    slug: 'political-landscape-midterm-elections',
    title: 'Analyzing the Political Landscape After Midterm Elections',
    category: 'Politics',
    author: 'Chris Evans',
    date: '2023-10-16',
    image: 'https://via.placeholder.com/600x400?text=Election+Results',
    excerpt: 'The recent midterm elections have reshaped the political landscape, bringing new dynamics to legislative bodies and setting the stage for future policy debates. We break down the key outcomes and their implications.',
    content: [
      { type: 'paragraph', text: 'Midterm elections often serve as a temperature check on the current administration and can significantly alter the balance of power. The latest results have introduced new complexities.' },
      { type: 'paragraph', text: 'Key races saw surprising upsets and tight contests, reflecting a divided electorate. The shift in control of legislative chambers will impact the passage of bills and the national agenda for the coming years.' },
      { type: 'paragraph', text: 'Analysts are now looking at how these results will influence upcoming presidential elections, international relations, and critical domestic policies such as economic reform and social programs.' }
    ]
  },
  {
    id: '12',
    slug: 'space-tourism-next-frontier',
    title: 'Space Tourism: The Next Frontier for Adventure Seekers',
    category: 'Science',
    author: 'Dr. Elena Petrova',
    date: '2023-10-15',
    image: 'https://via.placeholder.com/600x400?text=Space+Tourism',
    excerpt: 'What was once the realm of science fiction is rapidly becoming a reality. Commercial spaceflight companies are making strides in offering suborbital and orbital trips to civilians, opening up a new era of tourism.',
    content: [
      { type: 'paragraph', text: 'The dream of space travel is no longer exclusive to astronauts. Private companies are investing heavily in developing safe and accessible ways for civilians to experience the cosmos.' },
      { type: 'paragraph', text: 'Suborbital flights offer breathtaking views of Earth from the edge of space, while orbital trips provide longer stays and the unique experience of weightlessness. The costs are high, but gradually becoming more accessible.' },
      { type: 'video', src: 'https://www.youtube.com/embed/EE_1y_1T720', caption: 'A simulated view of Earth from a suborbital flight.' },
      { type: 'paragraph', text: 'Beyond the thrill, space tourism also drives innovation in aerospace engineering and could eventually pave the way for more widespread space exploration and colonization.' }
    ]
  }
];
