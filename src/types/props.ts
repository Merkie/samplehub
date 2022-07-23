import { Accessor, Setter } from "solid-js";
import { Page } from './specifc';

export interface ILimitContainerProps {
    selectedPage: Accessor<Page>;
    setSelectedPage: Setter<Page>;
}

export interface IFillContainerProps {
    selectedPage: Accessor<Page>;
}