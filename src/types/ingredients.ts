export type TIingredient = {
  readonly _id: string;
  readonly type: "bun" | "main" | "sauce";
  readonly name: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly __v: number;
};

export type TIingredientWithItem = TIingredient & {
  item?: TIingredient;
  readonly id: string;
};

export type TIingredientConstructor = Pick<
  TIingredientWithItem,
  "name" | "price" | "image" | "item" | "id"
>;

export type TIingredientOrderConstructor = TIingredientConstructor & {
  readonly type: "bun" | "main" | "sauce";
  readonly index: number;
  handleClose: () => void;
};

export type TOrders = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients?: any;
};
