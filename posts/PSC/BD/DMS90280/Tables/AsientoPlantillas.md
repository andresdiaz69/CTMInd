# Table: AsientoPlantillas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkPlantillas | nvarchar | NO |
| PkAsientoPlantillas_Iden | smallint | NO |
| FkContCtas | nvarchar | NO |
| FkDebeHaber | nvarchar | NO |
| BI | bit | NO |
| BE | bit | NO |
| BNS | bit | NO |
| Coste | bit | NO |
| FkOperacionTipos | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkTerceros | int | YES |
| FkCtaBancarias | smallint | YES |
| FechaMod | datetime | NO |
| FkEntidades | nvarchar | YES |
| FkConceptosBancarios | nvarchar | YES |
| PermiteMultiplicar | bit | NO |
| Referencia | nvarchar | YES |
| FkAsientosDetTipos | tinyint | YES |
| FkContCtas_Consolidacion | nvarchar | YES |
| PlantillasCodExternoDet | nvarchar | YES |
| CodServicioExterno | nvarchar | YES |
| Estado | nvarchar | YES |
