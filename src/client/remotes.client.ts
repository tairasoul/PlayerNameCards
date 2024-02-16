import remotes from "shared/remotes";
import { UserInputService } from "@rbxts/services";
import { Players } from "@rbxts/services";
const localPlayer = Players.LocalPlayer;

const GetPlatform = () => {
    print('getting platform');
    if (UserInputService.MouseEnabled || UserInputService.KeyboardEnabled) {
        remotes.platform.fire("PC");
        return;
    }
    if (UserInputService.TouchEnabled) {
        remotes.platform.fire("Mobile");
        return;
    }
    if (UserInputService.GamepadEnabled || UserInputService.GamepadConnected) {
        remotes.platform.fire("Console");
        return;
    }
    if (UserInputService.VREnabled) {
        remotes.platform.fire("VR");
        return;
    }
    remotes.platform.fire("Unknown");
    return;
}

GetPlatform();

const UpdatePing = () => {
    const ping = localPlayer.GetNetworkPing() * 1000;
    remotes.ping.fire(ping);
}

localPlayer.CharacterAdded.Connect(() => {
    GetPlatform();
    UpdatePing();
})

UpdatePing();

task.spawn(() => {
    while (task.wait(10)) {
        UpdatePing();
        GetPlatform();
    }
});