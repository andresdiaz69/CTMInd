# Table: EmpresaCentroImpuestosDesdeHasta

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkImpuestos | nvarchar | NO |
| PkFechaECIDesde | datetime | NO |
| FechaHasta | datetime | YES |
| Porc | decimal | YES |
| Importe | decimal | YES |
| FkContCtas_Emitidas | nvarchar | YES |
| FkContCtas_Recibidas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ClavePercepcion_SAP | nvarchar | YES |
| SubClavePercepcion_SAP | nvarchar | YES |
| CodSoportado_SAP | nvarchar | YES |
| CodRepercutido_SAP | nvarchar | YES |
| FechaMod | datetime | NO |
| FkContCtas_Emitidas_Abono | nvarchar | YES |
| FkContCtas_Recibidas_Abono | nvarchar | YES |
