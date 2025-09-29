import { AppEvent, Signup } from './types'

export const signups: Signup[] = []

export const events: AppEvent[] = [
    {
        id: 'evt-1',
        title: 'Community Coffee Morning',
        description: 'Meet neighbours and chat.',
        dateTime: new Date(Date.now() + 86400000).toISOString(),
        durationMins: 60,
        location: 'Town Hall',
        capacity: 20,
        get available() {
        return this.capacity - signups.filter(s => s.eventId === this.id).length
        }
    },
    {
        id: 'evt-2',
        title: 'Park Run',
        description: '5k social run.',
        dateTime: new Date(Date.now() + 2 * 86400000).toISOString(),
        durationMins: 45,
        location: 'Riverside Park',
        capacity: 50,
        get available() {
        return this.capacity - signups.filter(s => s.eventId === this.id).length
        }
    }
]

export function addSignup(eventId: string, name: string, email: string): Signup {
    const ev = events.find(e => e.id === eventId)
    if (!ev) throw new Error('Event not found')
    if (ev.available <= 0) throw new Error('Event full')
    const signup: Signup = {
        id: crypto.randomUUID(),
        eventId,
        name,
        email,
        createdAt: new Date().toISOString()
    }
    signups.push(signup)
    return signup
}