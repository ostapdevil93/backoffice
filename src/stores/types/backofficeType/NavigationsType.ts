export interface SubMenu {
    text: string;
    slug: string;
    path?: string;
    parentPath?: string;
    subMenu?: [];
}

export interface NavItem {
    title: string;
    icon: string;
    path: string;
    subMenu?: SubMenu[];
}

export interface Navigations {
    navItems: NavItem[];
}
