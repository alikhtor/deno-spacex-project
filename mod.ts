import * as log from "https://deno.land/std/log/mod.ts";

interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    customers: string[];
}

const launches = new Map<number, Launch>();

async function dowloadLaunchData() {
    log.info("Dowloading launch data...");
    const response = await fetch("https://api.spacexdata.com/v3/launches");
    
    if (!response.ok) {
        log.warning("Problem dowloading launch data.");
        throw new Error("Launch data dowloading failed.");       
    }

    const launchData = await response.json();
    for (const launch of launchData) {
        const payloads = (launch["rocket"]["second_stage"]["payloads"] as Array<{}>);
        const customers = payloads.flatMap((payload: any) => {
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
