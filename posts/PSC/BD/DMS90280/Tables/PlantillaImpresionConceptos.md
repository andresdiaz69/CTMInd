# Table: PlantillaImpresionConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkPlantillasImpresion | nvarchar | NO |
| PkFkPlantillasCalculo | nvarchar | NO |
| FkConceptosOperacion | nvarchar | YES |
| PkPlantillaImpresionConceptos_Iden | smallint | NO |
| Concepto | nvarchar | NO |
| Descripcion | nvarchar | NO |
| NumOrden | smallint | NO |
| SignoConcepto | nvarchar | NO |
| FormatoImpresion | tinyint | NO |
| NumDecimalesRedondeo | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Font | nvarchar | YES |
| FechaMod | datetime | NO |
| ImprimirSiempre | bit | NO |
