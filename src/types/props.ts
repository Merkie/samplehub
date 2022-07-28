/*
    --- Prop Types ---
    This file contains all the types needed to initialize/interface with component props.
*/

import { Accessor, Setter } from "solid-js";
import { Page } from './specifc';

export interface ILimitContainerProps {
    selectedPage: Accessor<Page>;
    setSelectedPage: Setter<Page>;
}

export interface IFillContainerProps {
    selectedPage: Accessor<Page>;
}