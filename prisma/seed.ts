import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const size = Number(process.env.SEED_SIZE ?? 0);
    if (process.env.NODE_ENV === 'production' && size === 0) {
        console.log('Seed skipped in production.');
        process.exit(0);
    }

faker.seed(42)

const prisma = new PrismaClient();

//? realistic events
const seedEvents = [
    {
        title: "Coffee Morning Meetup",
        description: "Join us for a relaxed morning of coffee and conversation.",
        dateTime: new Date('2024-07-10T09:00:00'),
        durationMins: 90,
        location: "Greenwood Community Center",
        capacity: 30,
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1517224215055-34e33205d461?q=80&w=3250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Saturday Park Run",
        description: "A friendly 5k run around the city park for all fitness levels.",
        dateTime: new Date('2024-07-13T08:00:00'),
        durationMins: 60,
        location: "City Park",
        capacity: 100,
        category: "Fitness",
        imageUrl: "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Open Mic Night",
        description: "Showcase your talent or enjoy performances by local artists.",
        dateTime: new Date('2024-07-15T19:30:00'),
        durationMins: 120,
        location: "The Blue Note Cafe",
        capacity: 50,
        category: "Music",
        imageUrl: "https://images.unsplash.com/photo-1648808678096-18f488fd6858?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3BlbiUyMG1pY3xlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Photography Workshop",
        description: "Learn the basics of photography with hands-on practice.",
        dateTime: new Date('2024-07-20T14:00:00'),
        durationMins: 180,
        location: "Art Studio 12",
        capacity: 20,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1744080213179-091b07d559d8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBob3RvZ3JhcGh5JTIwd29ya3Nob3B8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Family Fun Day",
        description: "A day full of games, crafts, and activities for the whole family.",
        dateTime: new Date('2024-07-22T10:00:00'),
        durationMins: 240,
        location: "Riverside Park",
        capacity: 150,
        category: "Family",
        imageUrl: "https://images.unsplash.com/photo-1595239094789-4e00e532528a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFtaWx5JTIwZnVuJTIwZGF5fGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Community Social Evening",
        description: "Meet your neighbors and enjoy an evening of food and music.",
        dateTime: new Date('2024-07-25T18:00:00'),
        durationMins: 150,
        location: "Town Hall",
        capacity: 80,
        category: "Social",
        imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Yoga in the Park",
        description: "Start the weekend with an energising outdoor yoga session.",
        dateTime: new Date('2024-07-27T08:30:00'),
        durationMins: 75,
        location: "Lakeview Park",
        capacity: 60,
        category: "Wellbeing",
        imageUrl: "https://images.unsplash.com/photo-1686243694059-0d5333940670?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9nYSUyMGluJTIwdGhlJTIwcGFya3xlbnwwfDB8MHx8fDI%3D" 
    },
    {
        title: "Neighborhood Book Swap",
        description: "Bring a book and take a book while meeting fellow readers.",
        dateTime: new Date('2024-07-30T18:30:00'),
        durationMins: 120,
        location: "Maple Street Library",
        capacity: 40,
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1572114113842-9d764ebcfc1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmVpZ2hib3Job29kJTIwYm9vayUyMHN3YXB8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Tech Networking Lunch",
        description: "Connect with local tech professionals over lunch.",
        dateTime: new Date('2024-08-01T12:00:00'),
        durationMins: 90,
        location: "Innovation Hub",
        capacity: 50,
        category: "Networking",
        imageUrl: "https://images.unsplash.com/photo-1561993098-270ea9e1711f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaCUyMG5ldHdvcmtpbmclMjBsdW5jaHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Coding Bootcamp Taster",
        description: "Hands-on introduction to modern web development tools.",
        dateTime: new Date('2024-08-03T10:00:00'),
        durationMins: 180,
        location: "Tech Returners Campus",
        capacity: 25,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1637073849667-91120a924221?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGluZyUyMGJvb3RjYW1wJTIwdGFzdGVyfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Local Art Walk",
        description: "Guided tour of murals and galleries in the creative quarter.",
        dateTime: new Date('2024-08-05T17:00:00'),
        durationMins: 150,
        location: "Arts District",
        capacity: 35,
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1757782565259-850fbea5e384?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9jYWwlMjBhcnQlMjB3YWxrfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Charity Quiz Night",
        description: "Test your trivia knowledge while raising funds for charity.",
        dateTime: new Date('2024-08-07T19:00:00'),
        durationMins: 150,
        location: "Old Oak Pub",
        capacity: 90,
        category: "Social",
        imageUrl: "https://images.unsplash.com/photo-1659459007416-309f836a7b9b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHViJTIwcXVpenxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Small Business Meet & Greet",
        description: "Local entrepreneurs share stories and collaborate on ideas.",
        dateTime: new Date('2024-08-09T08:00:00'),
        durationMins: 120,
        location: "Chamber of Commerce",
        capacity: 70,
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1565728738359-d68424e53780?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNtYWxsJTIwYnVzaW5lc3MlMjBtZWV0JTIwYW5kJTIwZ3JlZXR8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Mindfulness Workshop",
        description: "Practical techniques to bring mindfulness into your day.",
        dateTime: new Date('2024-08-12T18:00:00'),
        durationMins: 120,
        location: "Willow Wellness Studio",
        capacity: 45,
        category: "Wellbeing",
        imageUrl: "https://images.unsplash.com/photo-1529693662653-9d480530a697?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWluZGZ1bG5lc3MlMjB3b3Jrc2hvcHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "STEM Kids Workshop",
        description: "Interactive science experiments for curious kids aged 8-12.",
        dateTime: new Date('2024-08-14T15:00:00'),
        durationMins: 120,
        location: "Discovery Centre",
        capacity: 40,
        category: "Family",
        imageUrl: "https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U1RFTSUyMGtpZHMlMjB3b3Jrc2hvcHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Food Truck Fiesta",
        description: "Taste the best street food from local vendors with live music.",
        dateTime: new Date('2024-08-16T17:30:00'),
        durationMins: 210,
        location: "Riverfront Promenade",
        capacity: 200,
        category: "Food",
        imageUrl: "https://images.unsplash.com/photo-1595263431750-b57c02c30102?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMHRydWNrJTIwZmllc3RhfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Trail Cleanup Day",
        description: "Help keep our hiking trails pristine with this volunteer day.",
        dateTime: new Date('2024-08-18T09:00:00'),
        durationMins: 180,
        location: "Pine Ridge Trailhead",
        capacity: 60,
        category: "Outdoors",
        imageUrl: "https://images.unsplash.com/photo-1658268674345-39efba8d06bc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYWlsJTIwY2xlYW51cCUyMGRheXxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Board Game Marathon",
        description: "Bring your favourite games or try something new at this marathon.",
        dateTime: new Date('2024-08-20T13:00:00'),
        durationMins: 240,
        location: "Community Hub",
        capacity: 80,
        category: "Leisure",
        imageUrl: "https://images.unsplash.com/photo-1640461470346-c8b56497850a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9hcmRnYW1lJTIwbWFyYXRob258ZW58MHwwfDB8fHwy"
    },
    {
        title: "Career Coaching Clinic",
        description: "One-to-one sessions with career coaches to polish your CV.",
        dateTime: new Date('2024-08-22T10:00:00'),
        durationMins: 180,
        location: "Civic Centre",
        capacity: 30,
        category: "Professional",
        imageUrl: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZWVyJTIwY29hY2hpbmd8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Salsa Dance Class",
        description: "Learn the basics of salsa dancing with experienced instructors.",
        dateTime: new Date('2024-08-24T19:00:00'),
        durationMins: 120,
        location: "Harbour Dance Studio",
        capacity: 55,
        category: "Dance",
        imageUrl: "https://images.unsplash.com/photo-1750863773786-52e7d30d6ed9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Fsc2ElMjBkYW5jZSUyMGNsYXNzfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Farmers Market Preview",
        description: "Meet growers and sample produce before the autumn market.",
        dateTime: new Date('2024-08-27T07:30:00'),
        durationMins: 180,
        location: "Harvest Hall",
        capacity: 120,
        category: "Food",
        imageUrl: "https://images.unsplash.com/photo-1567306295427-94503f8300d7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVycyUyMG1hcmtldHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Craft Beer Tasting",
        description: "Sample seasonal brews with guided tasting notes.",
        dateTime: new Date('2024-08-29T18:30:00'),
        durationMins: 150,
        location: "Hop House",
        capacity: 45,
        category: "Social",
        imageUrl: "https://images.unsplash.com/photo-1687771454203-97d0b08bbeb2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JhZnQlMjBiZWVyfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Parent & Toddler Playgroup",
        description: "Soft play, sing-alongs, and coffee for parents and toddlers.",
        dateTime: new Date('2024-09-02T09:30:00'),
        durationMins: 120,
        location: "Sunny Start Centre",
        capacity: 35,
        category: "Family",
        imageUrl: "https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyZW50JTIwdG9kZGxlciUyMHBsYXlncm91cHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Community Film Screening",
        description: "Outdoor screening of a classic film with popcorn provided.",
        dateTime: new Date('2024-09-04T20:00:00'),
        durationMins: 150,
        location: "Elm Street Amphitheatre",
        capacity: 180,
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tbXVuaXR5JTIwZmlsbSUyMHNjcmVlbmluZ3xlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Senior Fitness Class",
        description: "Gentle exercise tailored for seniors to stay active.",
        dateTime: new Date('2024-09-06T10:30:00'),
        durationMins: 75,
        location: "Harmony Health Club",
        capacity: 40,
        category: "Wellbeing",
        imageUrl: "https://images.unsplash.com/photo-1658314755561-389d5660ee54?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VuaW9yJTIwZml0bmVzc3xlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Photography Walkabout",
        description: "Capture golden-hour photos with guidance from a pro photographer.",
        dateTime: new Date('2024-09-08T18:00:00'),
        durationMins: 120,
        location: "Old Town Square",
        capacity: 30,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1535555898298-d5a8f73af8b9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFBob3RvZ3JhcGh5JTIwV2Fsa2Fib3V0fGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Cooking with Local Chefs",
        description: "Learn seasonal recipes in this interactive cooking class.",
        dateTime: new Date('2024-09-10T17:30:00'),
        durationMins: 180,
        location: "Harvest Kitchen",
        capacity: 28,
        category: "Food",
        imageUrl: "https://images.unsplash.com/photo-1702767617236-709d896049c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZyUyMHdpdGglMjBsb2NhbCUyMGNoZWZzfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Startup Pitch Practice",
        description: "Early-stage founders pitch for feedback from mentors.",
        dateTime: new Date('2024-09-12T16:00:00'),
        durationMins: 150,
        location: "Venture Lab",
        capacity: 35,
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhcnR1cCUyMHBpdGNofGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Crafting for Charity",
        description: "Make blankets and care packages for local shelters.",
        dateTime: new Date('2024-09-14T11:00:00'),
        durationMins: 180,
        location: "Makerspace Studio",
        capacity: 50,
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1560831340-b9679dc9e9f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3JhZnRpbmd8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Evening Coding Dojo",
        description: "Collaborative coding challenges for all skill levels.",
        dateTime: new Date('2024-09-16T18:30:00'),
        durationMins: 150,
        location: "Tech Returners Campus",
        capacity: 45,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1637073849667-91120a924221?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFja2F0aG9ufGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Urban Sketchers Meetup",
        description: "Sketch city scenes together and share techniques.",
        dateTime: new Date('2024-09-18T17:00:00'),
        durationMins: 120,
        location: "Central Plaza",
        capacity: 30,
        category: "Art",
        imageUrl: "https://images.unsplash.com/photo-1605901755904-7daf5ddf5fb4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJiYW4lMjBza2V0Y2hlcnMlMjBtZWV0dXB8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Acoustic Garden Concert",
        description: "Relax to acoustic sets in a tranquil garden setting.",
        dateTime: new Date('2024-09-20T19:00:00'),
        durationMins: 150,
        location: "Botanical Gardens",
        capacity: 120,
        category: "Music",
        imageUrl: "https://images.unsplash.com/photo-1722709610259-0e560a9bf1d8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWNvdXN0aWMlMjBnYXJkZW4lMjBjb25jZXJ0fGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Local History Walking Tour",
        description: "Discover hidden stories with a guided history walk.",
        dateTime: new Date('2024-09-22T14:00:00'),
        durationMins: 120,
        location: "Heritage Square",
        capacity: 40,
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1758328399166-ddaa01ed73e4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9jYWwlMjBoaXN0b3J5JTIwdG91cnxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Podcasting 101",
        description: "Learn planning, recording, and publishing for your first podcast.",
        dateTime: new Date('2024-09-24T18:00:00'),
        durationMins: 120,
        location: "Media Lab",
        capacity: 32,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1567598125860-7201ff8c9e6f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvZGNhc3Rpbmd8ZW58MHwwfDB8fHwy"
    }
];

//? faker events
/*
const seedEvents = Array.from({ length: 10 }).map(() => ({
    title: faker.company.catchPhrase(),
    description: faker.lorem.sentence(8),
    dateTime: faker.date.future(),
    durationMins: faker.number.int({ min: 30, max: 180 }),
    location: faker.location.city(),
    capacity: faker.number.int({ min: 10, max: 100 }),
    category: faker.helpers.arrayElement(["Community", "Fitness", "Music", "Learning", "Family", "Social"]),
    imageUrl: `https://picsum.photos/seed/${faker.word.noun()}/800/500`,
}));
*/

async function main() {
    
    
    

    await prisma.signup.deleteMany();
    await prisma.event.deleteMany();



    const created = [];
    
    for (const data of seedEvents) {
        const e = await prisma.event.create({ data });
        created.push(e);
    }

    // console.log(`Created ${created.length} events.`);

    for (const e of created) {


        const signupsCount = faker.number.int({ min: 1, max: Math.min(e.capacity, 20) });
        
        for (let i = 0; i < signupsCount; i++){

            await prisma.signup.create({
                data: {
                    eventId: e.id,
                    name: faker.person.fullName(),
                    email: faker.internet.email()
                }
            })
        }

    }

    // console.log('Added signups to events.');

}

main().catch(console.error).finally(() => prisma.$disconnect());
