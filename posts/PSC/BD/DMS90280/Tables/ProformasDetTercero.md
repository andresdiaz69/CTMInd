# Table: ProformasDetTercero

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkProformas | int | NO |
| PkFkProformasDet | smallint | NO |
| PkFkTerceros_Proforma | int | NO |
| PkAñoProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkNumProforma | nvarchar | NO |
| FkPlantillaCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| Porcentaje | decimal | YES |
| PorcentajeReparto | decimal | NO |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| NumDecimalesRedondeo | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
