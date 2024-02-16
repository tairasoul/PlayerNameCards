import remotes from "shared/remotes";
import refs from "./ui/name";
import { RefObject } from "@rbxts/roact";
import Ping from "./ui/DisplayName/ping";
import Platform from "./ui/DisplayName/platform";

remotes.ping.connect((player, ping) => {
    const ref = refs.componentRefs.get(player.UserId)
    if (!ref) return;
    if (!ref.pingRef) return;
    const pingRef = ref.pingRef as RefObject<Ping>;
    if (!pingRef.current) return;
    const images = pingRef.current.getImages();
    if (ping > 150) {
        pingRef.current.setImage(images.bad, new Color3(1, 0, 0));
        return;
    }
    if (ping > 50) {
        pingRef.current.setImage(images.decent, new Color3(1, 0.666667, 0));
        return;
    }
    if (ping < 50) {
        pingRef.current.setImage(images.good, new Color3(0, 1, 0));
        return;
    }
    pingRef.current.setImage(images.fallback, new Color3(0, 0, 0));
})

remotes.platform.connect((player, platform) => {
    const ref = refs.componentRefs.get(player.UserId);
    if (!ref) return;
    if (!ref.platformRef) return;
    const platformRef = ref.platformRef as RefObject<Platform>;
    if (!platformRef.current) return;
    const images = platformRef.current.getImages();
    switch(platform) {
        case "PC":
            platformRef.current.setImage(images.PC);
            break;
        case "Console":
            platformRef.current.setImage(images.Console);
            break;
        case "Mobile":
            platformRef.current.setImage(images.Mobile);
            break;
        case "Unknown":
            platformRef.current.setImage(images.fallback);
            break;
        case "VR":
            platformRef.current.setImage(images.VR);
            break;
    }
})