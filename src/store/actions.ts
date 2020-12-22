import { DECREMENT, INCREMENT } from "./action-types";

export const decrement = () => ({
    type: DECREMENT,
});

export const increment = () => ({
    type: INCREMENT,
});