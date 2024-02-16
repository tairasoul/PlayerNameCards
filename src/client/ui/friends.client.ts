import { Players } from "@rbxts/services";
import FriendLabel = require("./FriendLabel");
import Roact = require("@rbxts/roact");

const trees: { [playerid: string]: Roact.Tree | undefined} = {};

Players.PlayerAdded.Connect((player) => {
    if (player.IsFriendsWith(Players.LocalPlayer.UserId)) 
        player.CharacterAdded.Connect((model) => {
            if (trees[player.UserId] !== undefined) {
                Roact.unmount(trees[player.UserId] as Roact.Tree);
            }
            const head = model.WaitForChild("Head");
            trees[player.UserId] = Roact.mount(FriendLabel(), head);
        })
})

for (const player of Players.GetPlayers().filter((v) => v !== Players.LocalPlayer)) {
    if (player.IsFriendsWith(Players.LocalPlayer.UserId)) {
        const character = player.Character;
        if (character) {
            const head = character.WaitForChild("Head");
            trees[player.UserId] = Roact.mount(FriendLabel(), head);
        }
        player.CharacterAdded.Connect((model) => {
            if (trees[player.UserId] !== undefined) {
                Roact.unmount(trees[player.UserId] as Roact.Tree);
            }
            const head = model.WaitForChild("Head");
            trees[player.UserId] = Roact.mount(FriendLabel(), head);
        })
    }
}