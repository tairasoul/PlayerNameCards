import { Server, createRemotes, remote } from "@rbxts/remo";

export = createRemotes(
    {
        ping: remote<Server, [ping: number]>(),
        platform: remote<Server, [platform: "PC" | "Console" | "Mobile" | "VR" | "Unknown"]>()
    }
)