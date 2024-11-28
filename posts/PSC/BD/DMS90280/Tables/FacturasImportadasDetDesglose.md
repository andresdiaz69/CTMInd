# Table: FacturasImportadasDetDesglose

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkFacturasImportadas | int | NO |
| PkFacturasImportadasDetDesglose_Iden | smallint | NO |
| Porcentaje | decimal | NO |
| Importe | decimal | YES |
| FkCentros_Desglose | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkTarifas | tinyint | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
