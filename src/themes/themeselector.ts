import { abfTheme } from "./abf";

export function themeSelector(themeName: string) {
    switch (themeName) {
        case "abf":
            return abfTheme;

        default:
            return abfTheme;
    }
}
