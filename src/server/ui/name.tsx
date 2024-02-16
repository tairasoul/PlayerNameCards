import Roact from "@rbxts/roact";
import DisplayName from "./DisplayName";
import { Players } from "@rbxts/services";
import Ping from "./DisplayName/ping";
import Platform from "./DisplayName/platform";
import PlayerName from "./DisplayName/label";

const trees: { [key: string]: Roact.Tree | undefined} = {};
const connections: { [key: string]: RBXScriptConnection} = {};

function PlayerConnected(player: Player) {
    connections[player.UserId] = player.CharacterAdded.Connect(CharacterAdded);
}

const refs = new class Refs {
    componentRefs: Map<number, { pingRef?: Roact.Ref<Ping>, platformRef?: Roact.Ref<Platform>, labelRef?: Roact.Ref<PlayerName> }> = new Map();
}

function CharacterAdded(char: Model) {
    const player = Players.GetPlayerFromCharacter(char);
    if (!player) return;
    const humanoid = char.WaitForChild("Humanoid") as Humanoid;
    humanoid.NameDisplayDistance = 0;
    humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None;
    if (trees[player.UserId] !== undefined) {
        Roact.unmount(trees[player.UserId] as Roact.Tree);
    }
    const head = char.WaitForChild("Head");

    // Create refs for Ping and Platform components
    const pingRef = Roact.createRef<Ping>();
    const platformRef = Roact.createRef<Platform>();
    const nameRef = Roact.createRef<PlayerName>();
    trees[player.UserId] = Roact.mount(<DisplayName playerName={player.DisplayName} pingRef={pingRef} platformRef={platformRef} nameRef={nameRef}/>, head);

    while (!(nameRef.current  && pingRef.current && platformRef.current)) {
        task.wait();
    }

    if (nameRef.current  && pingRef.current && platformRef.current) {
        const label = nameRef.current.getLabel().current;
        const ping = pingRef.current.getLabel().current;
        const platform = platformRef.current.getLabel().current;
        if (label && ping && platform) {
            label.Size = UDim2.fromOffset(0, label.Size.Y.Offset);
            while (label.TextFits === false) {
                label.Size = UDim2.fromOffset(label.Size.X.Offset + 1, label.Size.Y.Offset);
            }
            const final = UDim2.fromOffset(label.Size.X.Offset + ping.Size.X.Offset + platform.Size.X.Offset + 20, label.Size.Y.Offset);
            label.Size = final;
            const parent = label.Parent as BillboardGui;
            if (parent) {
                parent.Size = final;
            }
        }
    }

    // Store refs in the map
    refs.componentRefs.set(player.UserId, { pingRef, platformRef, labelRef: nameRef})
}

function PlayerDisconnected(player: Player) {
    trees[player.UserId] = undefined;
    connections[player.UserId]?.Disconnect();
    
    // Remove player's refs from the map
    refs.componentRefs.delete(player.UserId);
}

Players.PlayerAdded.Connect(PlayerConnected);
Players.PlayerRemoving.Connect(PlayerDisconnected);

export = refs