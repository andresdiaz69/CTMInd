# Table: AsientoDesglosesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkAsientoDesglosesIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| ImporteDebe | decimal | YES |
| ImporteHaber | decimal | YES |
| FkCentros_Desglose | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkTarifas | tinyint | YES |
| FkFechaContable | nvarchar | YES |
| FkNumAsiento | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DebeHaber | nvarchar | YES |
| Cuenta | nvarchar | YES |
| FkEntidades | nvarchar | YES |
| FkCtaBancarias | smallint | YES |
| FkTerceros | int | YES |
