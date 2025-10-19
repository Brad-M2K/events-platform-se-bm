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
        description: "Ease into the day with friendly chatter, artisan brews, and pastries in a relaxed lounge corner. Hosts facilitate introductions so newcomers instantly feel part of the neighbourhood.",
        dateTime: new Date('2026-07-10T09:00:00'),
        durationMins: 90,
        location: "Greenwood Community Center",
        capacity: 30,
        price: 8,
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1517224215055-34e33205d461?q=80&w=3250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Saturday Park Run",
        description: "Set your own pace on a marshalled 5k loop supported by pacers for walkers, joggers, and seasoned runners. Finish-line cooldown stretches and fresh fruit await every participant.",
        dateTime: new Date('2026-07-13T08:00:00'),
        durationMins: 60,
        location: "City Park",
        capacity: 100,
        category: "Fitness",
        imageUrl: "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Open Mic Night",
        description: "Share your voice on a well-equipped stage or cheer on poets, comics, and acoustic artists from cosy café seating. An energetic emcee keeps the night flowing while the bar serves specials.",
        dateTime: new Date('2026-07-15T19:30:00'),
        durationMins: 120,
        location: "The Blue Note Cafe",
        capacity: 50,
        price: 12,
        category: "Music",
        imageUrl: "https://images.unsplash.com/photo-1648808678096-18f488fd6858?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3BlbiUyMG1pY3xlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Photography Workshop",
        description: "Master composition, lighting, and storytelling through guided studio demos followed by outdoor shooting walks. Tutors provide live feedback so you leave with portfolio-ready shots.",
        dateTime: new Date('2026-07-20T14:00:00'),
        durationMins: 180,
        location: "Art Studio 12",
        capacity: 20,
        price: 45,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1744080213179-091b07d559d8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBob3RvZ3JhcGh5JTIwd29ya3Nob3B8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Family Fun Day",
        description: "Bring the whole crew for craft tents, inflatables, sensory play zones, and story corners spread across the park. Rotating activity leaders keep kids engaged while parents enjoy picnic spots.",
        dateTime: new Date('2026-07-22T10:00:00'),
        durationMins: 240,
        location: "Riverside Park",
        capacity: 150,
        category: "Family",
        imageUrl: "https://images.unsplash.com/photo-1595239094789-4e00e532528a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFtaWx5JTIwZnVuJTIwZGF5fGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Community Social Evening",
        description: "Catch up with neighbours over buffet tables of local flavours, unplugged music, and conversation prompts. Icebreakers and themed seating make meeting someone new effortless.",
        dateTime: new Date('2026-07-25T18:00:00'),
        durationMins: 150,
        location: "Town Hall",
        capacity: 80,
        price: 5,
        category: "Social",
        imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Yoga in the Park",
        description: "Awaken your body with sunrise vinyasa surrounded by birdsong and fresh air. Instructors offer gentle and advanced variations so every level leaves grounded and energised.",
        dateTime: new Date('2026-07-27T08:30:00'),
        durationMins: 75,
        location: "Lakeview Park",
        capacity: 60,
        category: "Wellbeing",
        imageUrl: "https://images.unsplash.com/photo-1686243694059-0d5333940670?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9nYSUyMGluJTIwdGhlJTIwcGFya3xlbnwwfDB8MHx8fDI%3D" 
    },
    {
        title: "Neighborhood Book Swap",
        description: "Swap favourite reads, discover new authors, and join mini book-club chats curated by librarians. Bring gently used books and leave with recommendations for your next page-turner.",
        dateTime: new Date('2026-07-30T18:30:00'),
        durationMins: 120,
        location: "Maple Street Library",
        capacity: 40,
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1572114113842-9d764ebcfc1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmVpZ2hib3Job29kJTIwYm9vayUyMHN3YXB8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Tech Networking Lunch",
        description: "Connect with engineers, founders, and recruiters over chef-prepared small plates and casual roundtables. Lightning introductions spark collaborations long after dessert is cleared.",
        dateTime: new Date('2026-08-01T12:00:00'),
        durationMins: 90,
        location: "Innovation Hub",
        capacity: 50,
        category: "Networking",
        imageUrl: "https://images.unsplash.com/photo-1561993098-270ea9e1711f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaCUyMG5ldHdvcmtpbmclMjBsdW5jaHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Coding Bootcamp Taster",
        description: "Dip into modern web development with live coding demos, guided exercises, and candid Q&A with mentors. Perfect for curious beginners exploring their first steps toward tech.",
        dateTime: new Date('2026-08-03T10:00:00'),
        durationMins: 180,
        location: "Tech Returners Campus",
        capacity: 25,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1637073849667-91120a924221?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGluZyUyMGJvb3RjYW1wJTIwdGFzdGVyfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Local Art Walk",
        description: "Stroll the creative quarter while a guide reveals hidden murals, pop-up galleries, and the stories behind each artist. Expect spontaneous studio visits and sketching stops.",
        dateTime: new Date('2026-08-05T17:00:00'),
        durationMins: 150,
        location: "Arts District",
        capacity: 35,
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1757782565259-850fbea5e384?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9jYWwlMjBhcnQlMjB3YWxrfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Charity Quiz Night",
        description: "Assemble a team for five rounds of trivia, picture puzzles, and music bingo to raise funds for a local cause. A lively host, spot prizes, and themed cocktails keep energy high.",
        dateTime: new Date('2026-08-07T19:00:00'),
        durationMins: 150,
        location: "Old Oak Pub",
        capacity: 90,
        category: "Social",
        imageUrl: "https://images.unsplash.com/photo-1659459007416-309f836a7b9b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHViJTIwcXVpenxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Small Business Meet & Greet",
        description: "Hear lightning talks from local founders then rotate through networking pods focused on marketing, finance, and partnerships. Showcase tables let you sample products firsthand.",
        dateTime: new Date('2026-08-09T08:00:00'),
        durationMins: 120,
        location: "Chamber of Commerce",
        capacity: 70,
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1565728738359-d68424e53780?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNtYWxsJTIwYnVzaW5lc3MlMjBtZWV0JTIwYW5kJTIwZ3JlZXR8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Mindfulness Workshop",
        description: "Unwind with guided meditation, gentle movement, and journaling prompts you can fold into busy routines. Leave with a personal toolkit for managing stress with ease.",
        dateTime: new Date('2026-08-12T18:00:00'),
        durationMins: 120,
        location: "Willow Wellness Studio",
        capacity: 45,
        category: "Wellbeing",
        imageUrl: "https://images.unsplash.com/photo-1529693662653-9d480530a697?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWluZGZ1bG5lc3MlMjB3b3Jrc2hvcHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "STEM Kids Workshop",
        description: "Young scientists build rockets, code mini robots, and run gooey experiments with expert supervision. Parents receive take-home guides to keep curiosity roaring at home.",
        dateTime: new Date('2026-08-14T15:00:00'),
        durationMins: 120,
        location: "Discovery Centre",
        capacity: 40,
        category: "Family",
        imageUrl: "https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U1RFTSUyMGtpZHMlMjB3b3Jrc2hvcHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Food Truck Fiesta",
        description: "Sample signature dishes from rotating street-food vendors while local DJs spin upbeat sets. Communal seating and lawn games create an all-evening festival vibe.",
        dateTime: new Date('2026-08-16T17:30:00'),
        durationMins: 210,
        location: "Riverfront Promenade",
        capacity: 200,
        price: 18,
        category: "Food",
        imageUrl: "https://images.unsplash.com/photo-1595263431750-b57c02c30102?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMHRydWNrJTIwZmllc3RhfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Trail Cleanup Day",
        description: "Join fellow volunteers to clear litter, trim overgrowth, and log maintenance needs along the ridge. Conservation guides share ecology insights during rest stops.",
        dateTime: new Date('2026-08-18T09:00:00'),
        durationMins: 180,
        location: "Pine Ridge Trailhead",
        capacity: 60,
        category: "Outdoors",
        imageUrl: "https://images.unsplash.com/photo-1658268674345-39efba8d06bc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYWlsJTIwY2xlYW51cCUyMGRheXxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Board Game Marathon",
        description: "Settle in for hours of classics and indie strategy titles with game masters ready to teach every rule set. Refuel at the snack bar and dive into mini tournaments all day long.",
        dateTime: new Date('2026-08-20T13:00:00'),
        durationMins: 240,
        location: "Community Hub",
        capacity: 80,
        category: "Leisure",
        imageUrl: "https://images.unsplash.com/photo-1640461470346-c8b56497850a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9hcmRnYW1lJTIwbWFyYXRob258ZW58MHwwfDB8fHwy"
    },
    {
        title: "Career Coaching Clinic",
        description: "Book micro-sessions with certified coaches to refresh CVs, polish LinkedIn profiles, and rehearse interview stories. Resource stations offer templates and headshot backdrops.",
        dateTime: new Date('2026-08-22T10:00:00'),
        durationMins: 180,
        location: "Civic Centre",
        capacity: 30,
        category: "Professional",
        imageUrl: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZWVyJTIwY29hY2hpbmd8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Salsa Dance Class",
        description: "Learn footwork, partner connection, and expressive styling in a supportive studio with rotating instructors. The final social sets give you time to try new moves with the group.",
        dateTime: new Date('2026-08-24T19:00:00'),
        durationMins: 120,
        location: "Harbour Dance Studio",
        capacity: 55,
        category: "Dance",
        imageUrl: "https://images.unsplash.com/photo-1750863773786-52e7d30d6ed9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Fsc2ElMjBkYW5jZSUyMGNsYXNzfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Farmers Market Preview",
        description: "Meet growers, sample peak-season produce, and preorder subscriptions before the main market opens. Micro workshops cover zero-waste cooking and balcony gardening.",
        dateTime: new Date('2026-08-27T07:30:00'),
        durationMins: 180,
        location: "Harvest Hall",
        capacity: 120,
        category: "Food",
        imageUrl: "https://images.unsplash.com/photo-1567306295427-94503f8300d7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVycyUyMG1hcmtldHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Craft Beer Tasting",
        description: "Explore limited releases with guided tasting notes from master brewers paired with palate-cleansing snacks. Guests vote for the standout brew to feature at the next tap takeover.",
        dateTime: new Date('2026-08-29T18:30:00'),
        durationMins: 150,
        location: "Hop House",
        capacity: 45,
        price: 28,
        category: "Social",
        imageUrl: "https://images.unsplash.com/photo-1687771454203-97d0b08bbeb2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JhZnQlMjBiZWVyfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Parent & Toddler Playgroup",
        description: "Soft play zones, sensory bins, and sing-along circles keep little ones joyful while carers swap tips over coffee. Staff lead storytime and nursery rhymes every half hour.",
        dateTime: new Date('2026-09-02T09:30:00'),
        durationMins: 120,
        location: "Sunny Start Centre",
        capacity: 35,
        category: "Family",
        imageUrl: "https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyZW50JTIwdG9kZGxlciUyMHBsYXlncm91cHxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Community Film Screening",
        description: "Bring blankets for an outdoor cinema experience projecting a beloved classic under the stars. Food stalls and trivia intervals make it a full evening out.",
        dateTime: new Date('2026-09-04T20:00:00'),
        durationMins: 150,
        location: "Elm Street Amphitheatre",
        capacity: 180,
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tbXVuaXR5JTIwZmlsbSUyMHNjcmVlbmluZ3xlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Senior Fitness Class",
        description: "Stay active with low-impact cardio, balance drills, and chair-supported strength work tailored for seniors. Physiotherapists provide individual adjustments and home plans.",
        dateTime: new Date('2026-09-06T10:30:00'),
        durationMins: 75,
        location: "Harmony Health Club",
        capacity: 40,
        category: "Wellbeing",
        imageUrl: "https://images.unsplash.com/photo-1658314755561-389d5660ee54?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VuaW9yJTIwZml0bmVzc3xlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Photography Walkabout",
        description: "Join a pro photographer for golden-hour walks capturing architecture, people, and hidden textures. Receive composition challenges and live critiques as you shoot.",
        dateTime: new Date('2026-09-08T18:00:00'),
        durationMins: 120,
        location: "Old Town Square",
        capacity: 30,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1535555898298-d5a8f73af8b9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFBob3RvZ3JhcGh5JTIwV2Fsa2Fib3V0fGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Cooking with Local Chefs",
        description: "Roll up your sleeves to prep seasonal dishes while chefs guide knife skills, seasoning, and plating. Enjoy a shared supper and recipe cards to recreate at home.",
        dateTime: new Date('2026-09-10T17:30:00'),
        durationMins: 180,
        location: "Harvest Kitchen",
        capacity: 28,
        category: "Food",
        imageUrl: "https://images.unsplash.com/photo-1702767617236-709d896049c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZyUyMHdpdGglMjBsb2NhbCUyMGNoZWZzfGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Startup Pitch Practice",
        description: "Early-stage founders deliver five-minute pitches followed by targeted mentor feedback. Peer networking and investor office hours help refine the next funding steps.",
        dateTime: new Date('2026-09-12T16:00:00'),
        durationMins: 150,
        location: "Venture Lab",
        capacity: 35,
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhcnR1cCUyMHBpdGNofGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Crafting for Charity",
        description: "Gather with makers to sew, knit, and assemble care packages while charities brief you on recipient needs. Supplies are provided—just bring enthusiasm and patience.",
        dateTime: new Date('2026-09-14T11:00:00'),
        durationMins: 180,
        location: "Makerspace Studio",
        capacity: 50,
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1560831340-b9679dc9e9f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3JhZnRpbmd8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Evening Coding Dojo",
        description: "Pair up for algorithm katas, refactoring challenges, and retrospectives guided by experienced facilitators. Lightning talks break up the hands-on problem solving.",
        dateTime: new Date('2026-09-16T18:30:00'),
        durationMins: 150,
        location: "Tech Returners Campus",
        capacity: 45,
        category: "Learning",
        imageUrl: "https://images.unsplash.com/photo-1637073849667-91120a924221?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFja2F0aG9ufGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Urban Sketchers Meetup",
        description: "Pack pens and watercolours to explore city corners with fellow sketchers capturing light, lines, and movement. Compare techniques over a café debrief afterward.",
        dateTime: new Date('2026-09-18T17:00:00'),
        durationMins: 120,
        location: "Central Plaza",
        capacity: 30,
        category: "Art",
        imageUrl: "https://images.unsplash.com/photo-1605901755904-7daf5ddf5fb4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJiYW4lMjBza2V0Y2hlcnMlMjBtZWV0dXB8ZW58MHwwfDB8fHwy"
    },
    {
        title: "Acoustic Garden Concert",
        description: "Unplug and unwind to stripped-back sets surrounded by fragrant blooms and lantern lighting. Artisans pour refreshments while music drifts through the garden.",
        dateTime: new Date('2026-09-20T19:00:00'),
        durationMins: 150,
        location: "Botanical Gardens",
        capacity: 120,
        category: "Music",
        imageUrl: "https://images.unsplash.com/photo-1722709610259-0e560a9bf1d8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWNvdXN0aWMlMjBnYXJkZW4lMjBjb25jZXJ0fGVufDB8MHwwfHx8Mg%3D%3D"
    },
    {
        title: "Local History Walking Tour",
        description: "Step back in time as historians guide you through hidden alleys, landmark buildings, and tales of influential residents. Vintage photographs help you picture each era.",
        dateTime: new Date('2026-09-22T14:00:00'),
        durationMins: 120,
        location: "Heritage Square",
        capacity: 40,
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1758328399166-ddaa01ed73e4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9jYWwlMjBoaXN0b3J5JTIwdG91cnxlbnwwfDB8MHx8fDI%3D"
    },
    {
        title: "Podcasting 101",
        description: "Demystify planning, recording, and publishing with hands-on demos using accessible gear. Build a content plan and leave ready to launch your first episode.",
        dateTime: new Date('2026-09-24T18:00:00'),
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
