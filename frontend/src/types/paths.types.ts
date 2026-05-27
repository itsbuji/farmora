export type PathItem = {
  pathname: string;
  link?: string;
  children?: PathItem[];
};

export type Paths = PathItem[];
