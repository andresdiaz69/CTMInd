# Table: PeriodificacionesTiposDesglose

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFKPeriodificacionesTipos | smallint | NO |
| PkPeriodificacionesTiposDesglose_Iden | smallint | NO |
| Porcentaje | decimal | YES |
| FkCentros_Desglose | smallint | YES |
| FkDepartamentos_Desglose | nvarchar | YES |
| FkSecciones_Desglose | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkTarifas | tinyint | YES |
| FkVentaCanales | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCompraCanales | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
