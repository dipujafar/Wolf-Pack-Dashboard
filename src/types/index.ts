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
  rank: number;
  fcmToken?: string;
  myAchievements: TAchievement[];
  _count: {
    notifications: number;
  };
};

export type TMetaCount = {
  totalActiveUsers: number;
  totalUser: number;
  totalCloser: number;
  totalClient: number;
  totalRevenue: number;
  totalDealClosed: number;
  totalCommissionPaid: number;
  totalRevenueWithPaidCommission: number;
};

export interface TCloser {
  id: string;
  clientId: string;
  userId: string;
  proposition: string;
  dealDate: string;
  status: string;
  amount: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  client: TClient;
  closerDocuments: CloserDocument[];
  user: User;
}

export interface TClient {
  id: string;
  name: string;
  offer: string;
  userId: string;
  targetAudience: string;
  contact: string;
  location: string;
  revenueTarget: number;
  commissionRate: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  closer?: TCloser;
}

export interface CloserDocument {
  id: string;
  closerId: string;
  document: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  about: string;
  registeredId: string;
}

//export type TBadges = {
//  currentBadge: TBadge | null;
//  upComingBadge: TBadge | null;
//  progressToNext: number;
//  data: TBadge[];
//};

//export type TBadge = {
//  id: string;
//  name: string;
//  dealCount: number;
//  description: string;
//  icon: string;
//  iconPath: string;
//  createdAt: string;
//  updatedAt: string;
//};

//export type TLeague = {
//  id: string;
//  name: string;
//  dealAmount: number;
//  description: string;
//  createdAt: string;
//  updatedAt: string;
//};

export type TSettings = {
  id: string;
  privacy: string;
  terms: string;
  about: string;
};

export type TNotification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  data: any;
  link: null | string;
  isRead: false;
  createdAt: string;
  updatedAt: string;
};

export type TAchievement = {
  id: string;
  userId: string;
  achievementId: string;
  createdAt: string;
  updatedAt: string;
  achievement: {
    id: string;
    name: string;
    salesCount: number;
    dealCount: number;
    revenue: number;
    createdAt: string;
    updatedAt: string;
  };
};

export interface TPrize {
  id: string;
  name: string;
  month: number;
  year: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  entries: Entry[];
}

export type TSinglePrizeData = {
  id: string;
  name: string;
  month: number;
  year: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  entries: Entry[];

  topUsers: {
    id: string;
    name: string;
    profilePicture: string;
    salesCount: number;
    dealCount: number;
    dealClosedCount: number;
  }[];
};

export interface Entry {
  id: string;
  rank: number;
  name: string;
  icon: string;
  prizeId: string;
  createdAt: string;
  updatedAt: string;
}

export type TPromotion = {
  id: string;
  title: string;
  emails: string[];
  datetime: string;
  message: string;
  isTrigger: boolean;
  createdAt: string;
  updatedAt: string;
};
