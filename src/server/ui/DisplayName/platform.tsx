import Roact, { RefObject } from "@rbxts/roact";

interface PlatformProps extends Roact.PropsWithChildren {
    fallbackImage: string;
    PC: string;
    Mobile: string;
    Console: string;
    VR: string;
    ref?: Roact.Ref<Platform>;
}

interface PlatformState {
    CurrentImage: string;
}

export default class Platform extends Roact.Component<PlatformProps, PlatformState> {
    private ref: Roact.Ref<ImageLabel>;

    constructor(props: PlatformProps) {
        super(props);
        this.state = {
            CurrentImage: this.props.fallbackImage,
        };
        this.ref = Roact.createRef<ImageLabel>();
    }

    setImage(image: string) {
        this.setState({
            CurrentImage: image,
        });
    }

    getImages() {
        return {
            fallback: this.props.fallbackImage, 
            PC: this.props.PC, 
            Mobile: this.props.Mobile, 
            Console: this.props.Console,
            VR: this.props.VR
        };
    }

    getLabel() {
        return this.ref as RefObject<ImageLabel>
    }

    public render(): Roact.Element | undefined {
        return (
            <imagelabel
                Image={this.state.CurrentImage}
                BackgroundTransparency={0.3}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                ScaleType={"Stretch"}
                Position={new UDim2(0, 0, 0, 0)}
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
