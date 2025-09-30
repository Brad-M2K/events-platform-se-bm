import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

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
        imageUrl: "https://picsum.photos/seed/coffee/800/500"
    },
    {
        title: "Saturday Park Run",
        description: "A friendly 5k run around the city park for all fitness levels.",
        dateTime: new Date('2024-07-13T08:00:00'),
        durationMins: 60,
        location: "City Park",
        capacity: 100,
        category: "Fitness",
        imageUrl: "https://picsum.photos/seed/parkrun/800/500"
    },
    {
        title: "Open Mic Night",
        description: "Showcase your talent or enjoy performances by local artists.",
        dateTime: new Date('2024-07-15T19:30:00'),
        durationMins: 120,
        location: "The Blue Note Cafe",
        capacity: 50,
        category: "Music",
        imageUrl: "https://picsum.photos/seed/openmic/800/500"
    },
    {
        title: "Photography Workshop",
        description: "Learn the basics of photography with hands-on practice.",
        dateTime: new Date('2024-07-20T14:00:00'),
        durationMins: 180,
        location: "Art Studio 12",
        capacity: 20,
        category: "Learning",
        imageUrl: "https://picsum.photos/seed/photoworkshop/800/500"
    },
    {
        title: "Family Fun Day",
        description: "A day full of games, crafts, and activities for the whole family.",
        dateTime: new Date('2024-07-22T10:00:00'),
        durationMins: 240,
        location: "Riverside Park",
        capacity: 150,
        category: "Family",
        imageUrl: "https://picsum.photos/seed/familyfun/800/500"
    },
    {
        title: "Community Social Evening",
        description: "Meet your neighbors and enjoy an evening of food and music.",
        dateTime: new Date('2024-07-25T18:00:00'),
        durationMins: 150,
        location: "Town Hall",
        capacity: 80,
        category: "Social",
        imageUrl: "https://picsum.photos/seed/socialevening/800/500"
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