export default interface IPropertyDetails {
  propertyType?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  numberOfToilets?: number;
  deposit?: number;
  rentalPeriod?: string;
  floor?: number;
  buildingYearOfHouse?: number;
  furnishing?: string;
  additional?: { [key: string]: string };
}
