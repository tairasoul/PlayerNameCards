import Roact from "@rbxts/roact";

export = function() {
    return (
        <billboardgui 
            Size={new UDim2(0, 30, 0, 30)}
            ExtentsOffsetWorldSpace={new Vector3(0, 1.5, 0)}
            ExtentsOffset={new Vector3(0, 1.5, 0)}
            MaxDistance={200}
            SizeOffset={new Vector2(0, 1)}
            StudsOffset={new Vector3(0, 1, 0)}
            StudsOffsetWorldSpace={new Vector3(0, 1, 0)}
        >
            <imagelabel
                Size={new UDim2(0, 29, 0, 29)}
                BackgroundTransparency={0.3}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                Image={"rbxassetid://16396397485"}
                ImageColor3={Color3.fromRGB(0, 255, 0)}
            >
                <uicorner 
                    CornerRadius={new UDim(1, 0)}
                />
            </imagelabel>
        </billboardgui>
    )
}