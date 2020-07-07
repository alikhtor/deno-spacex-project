import * as log from "https://deno.land/std/log/mod.ts";
const launches = new Map();
async function dowloadLaunchData() {
    log.info("Dowloading launch data...");
    const response = await fetch("https://api.spacexdata.com/v3/launches");
    if (!response.ok) {
        log.warning("Problem dowloading launch data.");
        throw new Error("Launch data dowloading failed.");
    }
    const launchData = await response.json();
    for (const launch of launchData) {
        const payloads = launch["rocket"]["second_stage"]["payloads"];
        const customers = payloads.flatMap((payload) => {
            return payload["customers"];
        });
        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["mission_name"],
            rocket: launch["rocket"]["rocket_name"],
            customers: customers
        };
        launches.set(flightData.flightNumber, flightData);
        log.info(JSON.stringify(flightData));
    }
}
if (import.meta.main) {
    await dowloadLaunchData();
    log.warning(JSON.stringify(import.meta));
    log.info(`Dowloaded data for ${launches.size} SpaceX launches.`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sa0NBQWtDLENBQUM7QUFTeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFM0MsS0FBSyxVQUFVLGlCQUFpQjtJQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUV2RSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtRQUNkLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7S0FDckQ7SUFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxLQUFLLE1BQU0sTUFBTSxJQUFJLFVBQVUsRUFBRTtRQUM3QixNQUFNLFFBQVEsR0FBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsVUFBVSxDQUFlLENBQUM7UUFDN0UsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ2pELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUc7WUFDZixZQUFZLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNyQyxPQUFPLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUMvQixNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUN2QyxTQUFTLEVBQUUsU0FBUztTQUN2QixDQUFDO1FBRUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWxELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0FBQ0wsQ0FBQztBQUVELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7SUFDbEIsTUFBTSxpQkFBaUIsRUFBRSxDQUFDO0lBQzFCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixRQUFRLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3BFIn0=