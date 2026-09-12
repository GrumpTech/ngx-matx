export type DragDropNode<T = undefined> = {
  text?: string;
  childNodes?: DragDropNode<T>[];
} & (T extends undefined ? unknown : { data: T });

export type DroppedEvent<T = undefined> = {
  currentParent?: DragDropNode<T>;
  currentArray: DragDropNode<T>[];
  currentIndex: number;
  targetParent?: DragDropNode<T>;
  targetArray: DragDropNode<T>[];
  targetIndex: number;
};
