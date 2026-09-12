export interface Tab<T> {
  filename: string;
  data: T;
  modificationState: ModificationState;
}

export enum ModificationState {
  New,
  Unmodified,
  Modified,
  Unknown,
}
