import IPropertyInformation from "./IPropertyInformation";
import ISpecification from "./ISpecification";
export default interface IPropertyDetails {
  propertyInformation?: IPropertyInformation;
  specifikation?: ISpecification;
  thePropertyAlsoHasAccessTo?: string[];
  publicTransport?: string;
}
