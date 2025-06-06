import React from 'react'
import useUpdateUserSettings from '@/app/hooks/useUpdateUserSettings';

const themes = [
    { name: "vscode", displayName: "VS Code", background: "#1e1e1e", primary: "#007acc" },
    { name: "mint", displayName: "Mint", background: "#05385b", primary: "#5cdb95" },
    { name: "dino", displayName: "Dino", background: "#ffffff", primary: "#40d672" },
    { name: "tangerine", displayName: "Tangerine", background: "#ffede0", primary: "#fe5503" },
    { name: "lildragon", displayName: "Lil Dragon", background: "#ebe1ef", primary: "#8a5bd6" },
    { name: "darling", displayName: "Darling", background: "#fec8cd", primary: "#ffffff" },
    { name: "serika", displayName: "Serika", background: "#e1e1e3", primary: "#e2b714" },
    { name: "mexican", displayName: "Mexican", background: "#f8ad34", primary: "#b12189" },
    { name: "honey", displayName: "Honey", background: "#f2aa00", primary: "#fff546" },
    { name: "menthol", displayName: "Menthol", background: "#00c18c", primary: "#ffffff" },
    { name: "trackday", displayName: "Track Day", background: "#464d66", primary: "#e0513e" },
    { name: "sweden", displayName: "Sweden", background: "#0058a3", primary: "#ffcc02" },
    { name: "8008", displayName: "8008", background: "#333a45", primary: "#f44c7f" },
    { name: "onedark", displayName: "One Dark", background: "#2f343f", primary: "#61afef" },
    { name: "watermelon", displayName: "Watermelon", background: "#1f4437", primary: "#d6686f" },
    { name: "carbon", displayName: "Carbon", background: "#313131", primary: "#f66e0d" },
    { name: "futurefunk", displayName: "Future Funk", background: "#2e1a47", primary: "#f7f2ea" },
    { name: "laser", displayName: "Laser", background: "#221b44", primary: "#009eaf" },
    { name: "superuser", displayName: "Superuser", background: "#262a33", primary: "#43ffaf" },
    { name: "nord", displayName: "Nord", background: "#242933", primary: "#88c0d0" },
    { name: "github", displayName: "GitHub", background: "#212830", primary: "#41ce5c" },
    { name: "metaverse", displayName: "Metaverse", background: "#232323", primary: "#d82934" },
    { name: "nightrunner", displayName: "Night Runner", background: "#212121", primary: "#feff04" },
    { name: "grape", displayName: "Grape", background: "#2c003e", primary: "#ff8f00" },
    { name: "metropolis", displayName: "Metropolis", background: "#0f1f2c", primary: "#56c3b7" },
    { name: "darkmagicgirl", displayName: "Dark Magic Girl", background: "#091f2c", primary: "#f5b1cc" },
    { name: "terminal", displayName: "Terminal", background: "#191a1b", primary: "#79a617" },
    { name: "joker", displayName: "Joker", background: "#1a0e25", primary: "#99de1e" },
    { name: "reddragon", displayName: "Red Dragon", background: "#1a0b0c", primary: "#ff3a32" },
    { name: "incognito", displayName: "Incognito", background: "#0e0e0e", primary: "#ff9900" },
    { name: "fire", displayName: "Fire", background: "#0f0000", primary: "#b31313" },
    { name: "matrix", displayName: "Matrix", background: "#000000", primary: "#15ff00" },
    { name: "serikadark", displayName: "Serika Dark", background: "#323437", primary: "#e2b714" }
];




function DrawerComponent() {

    const { mutate:updateSettings } = useUpdateUserSettings();

    const handleThemeChange = (name: string) => {
        if(localStorage.getItem("access_token")) updateSettings({theme: name});
        localStorage.setItem("theme", name);
        document.body.setAttribute("data-theme", name);
    }


    return (
        <div className="flex items-center justify-center flex-wrap gap-y-3 gap-x-4 m-5">
            {
                    themes.map((theme , index) => {
                        return (
                            <div className="bg-white text-lg w-2/9 text-center px-3 py-2 rounded-md border cursor-pointer hover:border-white border-background"
                            style={{ background: theme.background, color: theme.primary }}
                            onClick={() => handleThemeChange(theme.name)}
                            key={index}>
                                {theme.displayName}
                            </div>
                        )
                    })
                }
        </div>
    )
}

export default DrawerComponent