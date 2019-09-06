import IMarker from "./IMarker";
import IRentalProperty from "./IRentalProperty";
import { Collection, IEntity } from "fireorm";
import IPropertyDetails from "./IPropertyDetails";

@Collection()
export default class RentalProperty
  implements IRentalProperty, IMarker, IEntity, IPropertyDetails {
  numberOfToilets?: number | undefined;
  buildingYearOfHouse?: number;
  furnishing?: string;
  id: string;
  RentalObjectId?: number;
  Latitude?: number;
  Longitude?: number;
  Id?: number;
  MemberId?: number;

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
  propertyType?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  deposit?: number;
  rentalPeriod?: string;
  floor?: number;
  additional?: { [key: string]: string };
  importedAt?: Date;
}
