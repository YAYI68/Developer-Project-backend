interface ClassContructor {
    new (...args: any[]): {};
}
export declare function Serialize(dto: ClassContructor): MethodDecorator & ClassDecorator;
export {};
