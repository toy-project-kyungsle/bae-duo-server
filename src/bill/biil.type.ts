export interface priceInfoType {
  userId: number;
  userName: string;
  totalPrice: number;
  hasPaid: boolean;
}

export interface billType {
  id: number;
  fundingId: number;
  totalPrice: number;
  bankName: string;
  bankAccount: string;
  deliveryFee: number;
  priceInfo: priceInfoType[];
  createdAt: Date;
}
