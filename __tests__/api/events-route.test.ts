type PrismaEventMock = {
  event: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
  };
};

jest.mock('@prisma/client', () => {
  const prismaMock: PrismaEventMock = {
    event: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  return {
    __esModule: true,
    PrismaClient: jest.fn(() => prismaMock),
    prismaMock,
  };
});

const { prismaMock } = jest.requireMock('@prisma/client') as {
  prismaMock: PrismaEventMock;
};

import { GET as getEvents } from '@/app/api/events/route';
import { GET as getEventById } from '@/app/api/events/[id]/route';

describe('Events API route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns events ordered by date ascending', async () => {
    const fakeEvents = [
      {
        id: '1',
        title: 'Tech Returners Community',
        description: 'A fake event',
        location: 'Online',
        dateTime: new Date('2024-01-01T12:00:00Z'),
        durationMins: 60,
        capacity: 100,
        imageUrl: null,
        category: null,
        createdAt: new Date('2023-12-01T00:00:00Z'),
      },
    ];
    prismaMock.event.findMany.mockResolvedValue(fakeEvents);

    const response = await getEvents();

    expect(prismaMock.event.findMany).toHaveBeenCalledWith({ orderBy: { dateTime: 'asc' } });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(
      fakeEvents.map((event) => ({
        ...event,
        dateTime: event.dateTime.toISOString(),
        createdAt: event.createdAt.toISOString(),
      })),
    );
  });

  it('returns the requested event by id', async () => {
    const fakeEvent = {
      id: 'event-123',
      title: 'Another Event',
      description: 'Second fake event',
      location: 'Manchester',
      dateTime: new Date('2024-01-02T12:00:00Z'),
      durationMins: 90,
      capacity: 50,
      imageUrl: 'https://example.com/image.jpg',
      category: 'Tech',
      createdAt: new Date('2023-12-02T00:00:00Z'),
    };
    prismaMock.event.findUnique.mockResolvedValue(fakeEvent);

    const response = await getEventById({} as Request, { params: { id: fakeEvent.id } });

    expect(prismaMock.event.findUnique).toHaveBeenCalledWith({ where: { id: fakeEvent.id } });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ...fakeEvent,
      dateTime: fakeEvent.dateTime.toISOString(),
      createdAt: fakeEvent.createdAt.toISOString(),
    });
  });
});
