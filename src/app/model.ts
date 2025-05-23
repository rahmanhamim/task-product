export interface IProductCategory {
  slug: string;
  name: string;
  url: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMeta;
  images: string[];
  thumbnail: string;
}

export interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ICartItem extends IProduct {
  quantity?: number;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
