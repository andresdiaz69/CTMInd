# Table: VehiculoFacturasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkVehiculoFacturas | smallint | NO |
| PkVehiculoFacturasDet_Iden | smallint | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkPlantillasCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| NumOrden | smallint | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| FkModulos | nvarchar | YES |
| ImporteCoste | decimal | YES |
| Descripcion | nvarchar | NO |
| CargoCliente | bit | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FormatoImpresion | tinyint | NO |
| CalculadoPorcentaje | bit | YES |
| NumDecimalesRedondeo | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
