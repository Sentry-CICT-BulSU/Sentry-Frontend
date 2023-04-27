// This defines an interface called `MenuItem`
export interface MenuItem {
    group: string;
    separator?: boolean;
    selected?: boolean;
    active?: boolean;
    type?: string;
    items: Array<SubMenuItem>;
}

export interface SubMenuItem {
    icon?: string;
    label?: string;
    route?: string | null;
    expanded?: boolean;
    active?: boolean;
    children?: Array<SubMenuItem>;
}

// The code defines two interfaces: MenuItem and SubMenuItem. MenuItem represents a menu item that contains a group,
// optional separator, selected and active status, and an array of SubMenuItems. SubMenuItem represents a sub-menu item
// that contains optional icon, label, route, expanded and active status, and an optional array of SubMenuItems for nested menus.
// These interfaces provide a structure for defining and working with menus in an application.
