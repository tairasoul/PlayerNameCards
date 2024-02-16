import Roact, { RefObject } from "@rbxts/roact";

interface PlayerProps extends Roact.PropsWithChildren {
    PlayerName: string;
	ref?: Roact.Ref<PlayerName>;
}

export default class PlayerName extends Roact.Component<PlayerProps> {
	private TextRef: Roact.Ref<TextLabel> = Roact.createRef<TextLabel>();
	getLabel() {
		return this.TextRef as RefObject<TextLabel>;
	}

    render(): Roact.Element | undefined {
        return (
            <textlabel
                ref={this.TextRef}
                Text={this.props.PlayerName}
                Size={new UDim2(0, 207, 0, 25)}
                AutomaticSize={"None"}
                BackgroundTransparency={0.3}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                TextSize={14}
                TextXAlignment={"Center"}
                TextYAlignment={"Center"}
                Font={Enum.Font.GothamMedium}
            >
                <uicorner
                    CornerRadius={new UDim(100, 0)}
                />
                {this.props.children}
            </textlabel>
        );
    }
}
