import IMarker from "./IMarker";
import IRentalProperty from "./IRentalProperty";
import { Collection, IEntity } from "fireorm";
import IPropertyDetails from "./IPropertyDetails";

@Collection()
export default class RentalProperty
  implements IRentalProperty, IMarker, IEntity, IPropertyDetails {
  id: string;
  RentalObjectId?: number;
  Latitude?: number;
  Longitude?: number;
  Id?: number;
  MemberId?: number;
  OldDbObjectId?: number;
  RentalType?: number;
  State?: number;
  MonthlyFee?: number;
  StreetName?: string;
  AvailableFrom?: string;
  AvailableTo?: string;
  CreateDate?: string;
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
  propertyType?: string;
  numberOfBedrooms?: string;
  numberOfBathrooms?: string;
  deposit?: string;
  rentalPeriod?: string;
  floor?: string;
  additional?: { [key: string]: string };
  importedAt?: Date;
}
