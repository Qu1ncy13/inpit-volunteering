export async function getEvents() {
    const responce =  await fetch("http://localhost:3000/events");
    const events = await responce.json();

    return events;
}

