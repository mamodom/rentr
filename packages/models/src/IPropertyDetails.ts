export default interface IPropertyDetails {
  propertyType?: string;
  numberOfBedrooms?: string;
  numberOfBathrooms?: string;
  numberOfToilets?: string;
  deposit?: string;
  rentalPeriod?: string;
  floor?: string;
  additional?: { [key: string]: string };
}
