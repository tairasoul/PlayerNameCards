import Roact from "@rbxts/roact";
import PlayerName from "./label";
import Ping from "./ping";
import Platform from "./platform";

interface DisplayNameProps {
    playerName: string;
    pingRef: Roact.Ref<Ping>;
    platformRef: Roact.Ref<Platform>;
    nameRef: Roact.Ref<PlayerName>;
}

export default class DisplayName extends Roact.Component<DisplayNameProps> {
    constructor(props: DisplayNameProps) {
        super(props);
        this.state = {
            pingRef: Roact.createRef<Ping>(),
            platformRef: Roact.createRef<Platform>(),
        };
    }

    public render(): Roact.Element {
        return (
            <billboardgui
                MaxDistance={69}
                Size={new UDim2(0, 97, 0, 25)}
                StudsOffset={new Vector3(0, 1, 0)}
                StudsOffsetWorldSpace={new Vector3(0, 1, 0)}
            >
                <PlayerName PlayerName={this.props.playerName} ref={this.props.nameRef}>
                    <Ping
                        fallbackImage="http://www.roblox.com/asset/?id=46539002"
                        badPing="rbxassetid://15161914787"
                        decentPing="rbxassetid://15161924189"
                        goodPing="rbxassetid://15161917441"
                        ref={this.props.pingRef}
                    />
                    <Platform
                        fallbackImage="http://www.roblox.com/asset/?id=46539002"
                        VR="rbxassetid://16395094493"
                        Console="rbxassetid://15161925812"
                        PC="rbxassetid://15161926536"
                        Mobile="rbxassetid://15161929982"
                        ref={this.props.platformRef}
                    />
                </PlayerName>
            </billboardgui>
        );
    }
}
