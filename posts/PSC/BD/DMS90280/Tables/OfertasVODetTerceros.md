# Table: OfertasVODetTerceros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkOfertasVODet | smallint | NO |
| PkFkTerceros_Oferta | int | NO |
| FkPlantillaCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| FechaFactura | datetime | NO |
| PorcentajeReparto | decimal | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| NumDecimalesRedondeo | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
