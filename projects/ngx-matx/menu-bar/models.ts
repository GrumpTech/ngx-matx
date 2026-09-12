export type MenuBarItem<T = undefined> = {
  text: string;
  children: MenuItem<T>[];
};

export type MenuItem<T = undefined> = {
  text: string;
  icon?: string;
  shortcuts?: Shortcut[];
  children?: MenuItem<T>[];
} & (T extends undefined ? unknown : { data: T });

export type Shortcut = {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  keyCode: string;
  disabled?: boolean;
  hideMenuText?: boolean;
};
