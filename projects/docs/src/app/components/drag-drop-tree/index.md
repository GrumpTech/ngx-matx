A tree whose nodes can be reordered and moved between levels with drag and drop, built on the Angular CDK. The component only reports where a node was dropped. It does not change your data, so you apply the move yourself.

## Demo

Drag and drop nodes in the basic text example:

{{ NgDocActions.demo("DragDropTreeTextDemo") }}

Customize node content with a header template:

{{ NgDocActions.demo("DragDropTreeDataDemo") }}

## Usage

Import `MatxDragDropTree` and handle its `dropped` output to update your node
arrays. The tree reports the source and target arrays but does not mutate them;
use the Angular CDK helpers to apply the move:

```ts
import { moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { DroppedEvent } from "@grumptech/ngx-matx/drag-drop-tree";

function handleDropped<T>(event: DroppedEvent<T>): void {
  if (event.currentArray === event.targetArray) {
    moveItemInArray(event.currentArray, event.currentIndex, event.targetIndex);
  } else {
    transferArrayItem(event.currentArray, event.targetArray, event.currentIndex, event.targetIndex);
  }
}
```

For custom node content, provide an `ng-template` named `headerTemplate` and
use `let-item="item"` to access the node, including its `text` and
`childNodes` properties. Generic node data is optional.

## API |

### Inputs

| Input     | Type                               | Default       | Description                                      |
| --------- | ---------------------------------- | ------------- | ------------------------------------------------ |
| `nodes`   | `DragDropNode<T>[]`                | `[]`          | The root nodes. Nested nodes go in `childNodes`. |
| `trackBy` | `TrackByFunction<DragDropNode<T>>` | node identity | Tracking function used when rendering nodes.     |

### Nodes

| Property     | Type                | Description                                  |
| ------------ | ------------------- | -------------------------------------------- |
| `text`       | `string`            | Label of the node (when no type is given)    |
| `data`       | `T`                 | Your own data (when using `DragDropNode<T>`) |
| `childNodes` | `DragDropNode<T>[]` | Optional children of the node                |

### Outputs

| Output    | Type              | Description                                     |
| --------- | ----------------- | ----------------------------------------------- |
| `dropped` | `DroppedEvent<T>` | Emits when a node is dropped in a new position. |

### DroppedEvent

| Property        | Type                           | Description                                      |
| --------------- | ------------------------------ | ------------------------------------------------ |
| `currentParent` | `DragDropNode<T> \| undefined` | Parent of the dragged node (`undefined` at root) |
| `currentArray`  | `DragDropNode<T>[]`            | The array the node was in                        |
| `currentIndex`  | `number`                       | The node's index in `currentArray`               |
| `targetParent`  | `DragDropNode<T> \| undefined` | Parent of the drop target (`undefined` at root)  |
| `targetArray`   | `DragDropNode<T>[]`            | The array the node is dropped into               |
| `targetIndex`   | `number`                       | The index to insert at in `targetArray`          |

The event does not fire when a node is dropped at its own position or into one of its own descendants. When moving within the same array, `targetIndex` is already adjusted for the removal, so pass it straight to `moveItemInArray`.
