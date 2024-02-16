import Roact, { RefObject } from "@rbxts/roact";

interface PingProps extends Roact.PropsWithChildren {
    fallbackImage: string;
    badPing: string;
    decentPing: string;
    goodPing: string;
    ref?: Roact.Ref<Ping>;
}

interface PingState {
    CurrentImage: string;
    ImageColor: Color3;
}

export default class Ping extends Roact.Component<PingProps, PingState> {
    private ref: Roact.Ref<ImageLabel>;

    constructor(props: PingProps) {
        super(props);
        this.state = {
            CurrentImage: this.props.fallbackImage,
            ImageColor: Color3.fromRGB(255, 0, 0), // Default color (red)
        };
        this.ref = Roact.createRef<ImageLabel>();
    }

    public setImage(image: string, color: Color3) {
        this.setState({
            CurrentImage: image,
            ImageColor: color,
        });
    }

    getImages() {
        return {
            fallback: this.props.fallbackImage, 
            bad: this.props.badPing, 
            decent: this.props.decentPing, 
            good: this.props.goodPing
        };
    }

    getLabel() {
        return this.ref as RefObject<ImageLabel>
    }

    public render(): Roact.Element | undefined {
        return (
            <imagelabel
                Image={this.state.CurrentImage}
                ImageColor3={this.state.ImageColor}
                BackgroundTransparency={0.3}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                ScaleType={"Stretch"}
                Position={new UDim2(1, -25, 0, 0)}
                Size={new UDim2(0, 25, 0, 25)}
                Ref={this.ref}
            >
                <uicorner 
                    CornerRadius={new UDim(100, 0)}
                />
                {this.props.children}
            </imagelabel>
        )
    }
}