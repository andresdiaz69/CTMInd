# Table: VehiculoFacturasDetTercero

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkVehiculoFacturas | smallint | NO |
| PkFkVehiculoFacturasDet | smallint | NO |
| PkFkTerceros | int | NO |
| PkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkNumFactura | nvarchar | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkPlantillasCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| PorcentajeReparto | decimal | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| ImporteCoste | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NumDecimalesRedondeo | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
