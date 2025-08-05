export type TInstrumentsData = {
  name: string;
  image: string;
};

export type TProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  sales: number;
  imageUrl: string;
};

export type TActivityItem = {
  id: string;
  type: "order" | "shipped" | "product" | "favorited" | "rated" | "discount" | "inquiry";
  activity: string;
  order_id?: string;
  product?: string;
  time_ago: string;
  details: string;
  color: string;
  icon: string;
};

import { JwtPayload } from "jwt-decode";

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: TMeta;
};
export type TUserRole = "ADMIN" | "USER";

export type TTokenUser = { email: string; role: TUserRole; id: string } & JwtPayload;
export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  isDelete: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  loginCount: number;
  about: null | string;
  dealCount: number;
  salesCount: number;
  monthlyTarget: number;
  dealClosedCount: number;
  league: null | any;
  commission: number;
  monthlyTargetPercentage: number;
  avgDealAmount: number;
};
