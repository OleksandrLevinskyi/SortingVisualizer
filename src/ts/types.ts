import {ISortStrategy} from "./algos/ISortStrategy";

export enum TEXT_CAPTION {
    PRESENT = 'true',
    NONE = 'false',
}

export type Descriptions = {
    [key: string]: string
}

export type SortStrategies = {
    [key: string]: ISortStrategy
}

export enum MODE_IMAGE {
    SUN = "/images/controls/sun.png",
    MOON = "/images/controls/moon.png",
}

export enum INFO_ICON_IMAGE {
    LIGHT = "/images/controls/info-light.png",
    DARK = "/images/controls/info-dark.png",
}

export enum MODE {
    SUN = 'SUN',
    MOON = 'MOON',
}

export enum INFO_ICON {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}