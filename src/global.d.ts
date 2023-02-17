// Global type declarations

declare namespace React {
  interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement | null;
  }
  
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: string | number | null;
  }
  
  interface ReactNode {
    // Allow any react node types
  }
  
  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => any);
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  
  interface Element extends React.ReactElement<any, any> {}
  
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  
  interface ElementAttributesProperty {
    props: {};
  }
  
  interface ElementChildrenAttribute {
    children: {};
  }
}

// Module declarations for CSS files
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Allow any property access on objects
declare global {
  interface Object {
    [key: string]: any;
  }
} 