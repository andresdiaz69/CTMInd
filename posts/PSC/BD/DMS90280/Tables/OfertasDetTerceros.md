# Table: OfertasDetTerceros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkOfertasDet | smallint | NO |
| PkFkTerceros_Oferta | int | NO |
| FkPlantillaCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| FechaFactura | datetime | NO |
| PorcentajeReparto | decimal | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NumDecimalesRedondeo | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
