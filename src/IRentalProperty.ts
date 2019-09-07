export default interface IRentalProperty {
  Id?: number;
  MemberId?: number;
  /**
   * @description {0: "apartment", 1: "house"}
   */
  RentalType?: number;
  State?: number;
  MonthlyFee?: number;
  StreetName?: string;
  AvailableFrom?: Date;
  AvailableTo?: Date;
  CreateDate?: Date;
  LivingSpace?: number;
  NumberOfRooms?: number;
  County?: string;
  Municipality?: string;
  District?: string;
  DistrictUrl?: string;
  ImageFileName?: string;
  Description?: string;
  Area?: number;
  DescriptionTruncated?: string;
  AvailableFromFormated?: string;
  Url?: string;
  ImageUrl?: string;
  OtherSpace?: number;
}
