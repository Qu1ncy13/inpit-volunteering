export async function getEvents() {
    const responce = await fetch("http://127.0.0.1:3000/events");
    const events = await responce.json();

    return events;
}

