# Table: ProformasVODet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkProformasVO | int | NO |
| PkProformasVODet_Iden | smallint | NO |
| FkPlantillasCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | NO |
| NumOrden | smallint | NO |
| CargoCliente | bit | NO |
| Porcentaje | decimal | YES |
| SignoConcepto | nvarchar | NO |
| Importe | decimal | YES |
| Descripcion | nvarchar | NO |
| FkImpuestos | nvarchar | YES |
| FkImpuestoTipos | nvarchar | YES |
| FormatoImpresion | tinyint | NO |
| CalculadoPorcentaje | bit | NO |
| NumDecimalesRedondeo | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
