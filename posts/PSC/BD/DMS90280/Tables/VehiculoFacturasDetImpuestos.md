# Table: VehiculoFacturasDetImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkVehiculoFacturas | smallint | NO |
| PkFkVehiculoFacturasDet | smallint | NO |
| PkFkConceptosOperacion_Impuesto | nvarchar | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkPlantillasCalculo | nvarchar | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| ImporteCoste | decimal | YES |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| CalculadoPorcentaje | bit | NO |
| NumDecimalesRedondeo | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
