import IMarker from "./IMarker";
import IRentalProperty from "./IRentalProperty";
import { Collection, IEntity } from "fireorm";
import IPropertyDetails from "./IPropertyDetails";
import ISpecification from "./ISpecification";
import IPropertyInformation from "./IPropertyInformation";

@Collection()
export default class RentalProperty
  implements IRentalProperty, IMarker, IPropertyDetails, IEntity {
  propertyInformation?: IPropertyInformation;
  specifikation?: ISpecification;
  thePropertyAlsoHasAccessTo?: string[];
  publicTransport?: string;
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
  id: string;
  importedAt?: Date;
}
