import { portfolioData } from "../data/portfolio";
import { Portfolio } from "../types/portfolio";

class Settings {
    private static instance: Settings;

    private userData: Portfolio = portfolioData["Aaroophan"];
    private Location: string = "";
    private Theme: any = null;

    private constructor() { }

    public static getInstance(): Settings {
        if (!Settings.instance) {
            Settings.instance = new Settings();
        }
        return Settings.instance;
    }

    setLocation(Location: string): any {
        this.Location = Location;
    }

    getLocation(): string {
        return this.Location;
    }

    setUserData(userKey: string): void {
        if (portfolioData[userKey as keyof typeof portfolioData]) {
            this.userData = portfolioData[userKey as keyof typeof portfolioData];
        } else {
            console.error(`User "${userKey}" not found.`);
            this.userData = portfolioData["Aaroophan"]; // Fallback to default
        }
    }

    getUserData(): Portfolio {
        return this.userData;
    }

    setTheme(Theme: any): void {
        this.Theme = Theme;
    }

    getTheme(): any {
        return this.Theme;
    }
}

const Setting = Settings.getInstance();
export default Setting;
