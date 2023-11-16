import * as IconSet from "@radix-ui/react-icons";

export type IconName = keyof typeof IconSet;

export interface IconProps {
    name: IconName;
    size?: number;
}

export const Icon = ({ name, size = 16 }: IconProps) => {
    const IconComponent = IconSet[name];
    if (!IconComponent) {
        console.warn(`Icon not found, used `, name);
        return null;
    }
    return <IconComponent width={size} height={size} />;
}